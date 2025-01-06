import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Disable GPU
os.environ["TF_FORCE_GPU_ALLOW_GROWTH"] = "false"  # Prevent GPU memory allocation

import sys
import pickle
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPooling2D
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import json
from PIL import Image
import tensorflow as tf

# Load feature data and model only once to avoid reloading on each request
if not hasattr(sys.modules[__name__], "model"):
    # Load the feature data and filenames
    feature_list = np.array(pickle.load(open('embeddings.pkl', 'rb')))
    filenames = pickle.load(open('filenames.pkl', 'rb'))  # Image file paths

    # Initialize ResNet50 model
    model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    model.trainable = False
    model = tf.keras.Sequential([model, GlobalMaxPooling2D()])
    sys.modules[__name__].model = model  # Save model to avoid reloading

# Function to load the image from the local file
def load_image_from_file(file_path):
    try:
        img = Image.open(file_path)
        return img
    except Exception as e:
        print(f"Error loading image from file {file_path}: {e}")
        raise

# Function for feature extraction
def feature_extraction(img, model):
    img = img.resize((224, 224))  # Resize image to 224x224 for ResNet50
    img_array = np.array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    return normalized_result

# Function to recommend similar products
def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)
    distances, indices = neighbors.kneighbors([features])
    return indices

# Main function to process the image
def process_image(image_path):
    try:
        img = load_image_from_file(image_path)  # Load image from the provided path

        # Extract features from the image
        features = feature_extraction(img, model)

        # Get recommended product indices
        indices = recommend(features, feature_list)

        # Prepare the list of recommended products' filenames (excluding the uploaded image)
        recommended_files = [filenames[i] for i in indices[0][1:]]  # Exclude the first item (uploaded image)

        # Return recommended products as JSON
        return json.dumps(recommended_files)

    except Exception as e:
        print(f"Error processing the image: {e}")
        return json.dumps({"error": str(e)})

# Main entry for script execution (used by the backend)
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: Image path argument is missing.")
        sys.exit(1)
    
    image_path = sys.argv[1]  # Image path is passed as a command-line argument
    recommended_files = process_image(image_path)
    print(recommended_files)
