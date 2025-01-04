// Products Array
const products = [
  {
    id: 2,
    title: "Women's Printed Kurti",
    price: 1299,
    image:
      "https://i.pinimg.com/736x/61/93/56/619356fb2228ae19f4c2e82533e1ad09.jpg",
  },
  {
    id: 6,
    title: "Women's Silk Saree",
    price: 2999,
    image:
      "https://img1.exportersindia.com/product_images/bc-full/2024/1/1026943/women-butter-silk-saree-1705300461-7249588.jpg",
  },

  {
    id: 16,
    title: "Women's Pleated Skirt",
    price: 899,
    image:
      "https://www.jiomart.com/images/product/original/rvtyz5lil5/klart-women-s-pleated-skirt-skater-skirt-tennis-skirt-cycling-skirts-with-shorts-underneath-product-images-rvtyz5lil5-5-202207311729.jpg?im=Resize=(1000,1000)",
  },
  {
    id: 18,
    title: "Women's Evening Dress",
    price: 1999,
    image:
      "https://images-cdn.ubuy.co.in/6538dd75bd129b445366b40b-fqa-long-black-evening-gowns-for-women.jpg",
  },
  {
    id: 22,
    title: "Women's Maxi Dress",
    price: 1899,
    image:
      "https://sassafras.in/cdn/shop/products/SFDRSS10603-1.jpg?v=1735899779",
  },
  {
    id: 28,
    title: "Women's Graphic T-Shirt",
    price: 799,
    image:
      "https://www.thelabelbar.com/_next/image?url=https%3A%2F%2Fthelabelbar.s3.ap-south-1.amazonaws.com%2Fupload-dir%2FTLBTLB02035.jpg&w=1080&q=100",
  },
  {
    id: 31,
    title: "Women's A-Line Skirt",
    price: 999,
    image:
      "https://allyfashion.com/cdn/shop/files/ss0486-84c_white_1.jpg?v=1728458839",
  },

  {
    id: 34,
    title: "Women's Anarkali Kurti",
    price: 1599,
    image:
      "https://images.jdmagicbox.com/quickquotes/images_main/women-anarkali-kurti-2010113210-3pcwajuv.jpg",
  },

  {
    id: 11,
    title: "Women's Casual T-Shirt",
    price: 699,
    image: "https://spykar.com/cdn/shop/products/ikYOHKyDOI-4.jpg?v=1735049987",
  },
  {
    id: 27,
    title: "Women's Cotton Saree",
    price: 1499,
    image:
      "https://www.aevum.in/cdn/shop/files/20437-5.jpg?v=1721994316&width=600",
  },
];

// DOM Elements
const $productList = $("#productList");
const $cartItemsElement = $("#cartItems");
const $cartTotalElement = $("#cartTotal");
const $cartIcon = $("#cart-icon");

// Store cart items in local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render products
function renderProducts() {
  const productHTML = products
    .map(
      (product) => `
          <div class="product" data-id="${product.id}">
            <img src="${product.image}" alt="${
        product.title
      }" class="product-img">
            <div class="product-info">
              <h2 class="product-title">${product.title}</h2>
              <p class="product-price">₹${product.price.toFixed(2)}</p>
              <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
            </div>
          </div>
        `
    )
    .join("");
  $productList.html(productHTML);

  // Add event listeners to each "Add to cart" button
  $(".add-to-cart").on("click", addToCart);
}

// event listener to show modal

$(document).on("click", ".product", function () {
  const productId = $(this).data("id");
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Show the clicked product's details in the modal
    $("#modalImage").attr("src", product.image);
    $("#modalTitle").text(product.title);
    $("#modalPrice").text(`₹${product.price.toFixed(2)}`);

    // Fetch recommendations for the clicked product (using its image URL)
    getRecommendations(product.image);

    // Show modal
    $("#productModal").fadeIn();
  }
});

// Event listener to close modal
$("#closeModal").on("click", function () {
  $("#productModal").fadeOut();
});

// Add item to cart
function addToCart(event) {
  const productID = parseInt($(event.target).data("id"));
  const product = products.find((product) => product.id === productID);

  if (product) {
    const existingItem = cart.find((item) => item.id === productID);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    $(event.target).text("Added");
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotal();
    updateCartIcon(); // Ensure cart icon is updated after adding
  }
}

// Remove item from cart
function removeFromCart(event) {
  const productID = parseInt($(event.target).data("id"));
  cart = cart.filter((item) => item.id !== productID);
  saveToLocalStorage();
  renderCartItems();
  calculateCartTotal();
  updateCartIcon(); // Ensure cart icon is updated after removal
}

// Change item quantity
function changeQuantity(event) {
  const productID = parseInt($(event.target).data("id"));
  const quantity = parseInt($(event.target).val());

  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveToLocalStorage();
      calculateCartTotal();
      updateCartIcon();
    }
  }
}

// Save cart to localStorage
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render cart items
function renderCartItems() {
  if (cart.length === 0) {
    $cartItemsElement.html("<p>Your cart is empty</p>");
    return;
  }

  const cartItemsHTML = cart
    .map(
      (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>
              <input
                class="cart-item-quantity"
                type="number"
                min="1"
                value="${item.quantity}"
                data-id="${item.id}"
              />
            </div>
            <h2 class="cart-item-price">₹${item.price.toFixed(2)}</h2>
            <button class="remove-from-cart" data-id="${
              item.id
            }">Remove</button>
          </div>
        `
    )
    .join("");
  $cartItemsElement.html(cartItemsHTML);

  // Reattach event listeners to remove buttons
  $(".remove-from-cart").on("click", removeFromCart);

  // Reattach event listeners to quantity inputs
  $(".cart-item-quantity").on("change", changeQuantity);
}

// Calculate total
function calculateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $cartTotalElement.text(`Total: ₹${total.toFixed(2)}`);
}

// Update cart icon
function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Set data-quantity to 0 if the cart is empty, otherwise set it to the total quantity
  $cartIcon.attr("data-quantity", totalQuantity === 0 ? 0 : totalQuantity);
}

// Initial render and icon update
if (window.location.pathname.includes("cart.html")) {
  renderCartItems();
  calculateCartTotal();
} else {
  renderProducts();
}

// Event listeners for storage change
$(window).on("storage", updateCartIcon);

// Initial render of products and cart items
updateCartIcon(); // Initial cart icon update on page load
$("#productModal").hide();

// Function to upload the image URL and get recommendations
function getRecommendations(imageUrl) {
  fetch("http://localhost:5000/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uploadedFileUrl: imageUrl,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (
        Array.isArray(data.recommendedProducts) &&
        data.recommendedProducts.length > 0
      ) {
        showRecommendedProducts(data.recommendedProducts);
      } else {
        $("#recommendedProducts").html("<p>No recommendations available.</p>");
      }
    })
    .catch((error) => {
      console.error("Error fetching recommendations:", error);
    });
}

// Function to show recommended products in the modal
function showRecommendedProducts(recommendedFiles) {
  let recommendedHTML = "";

  recommendedFiles.forEach((file) => {
    recommendedHTML += `
        <div class="recommended-product">
          <img src="/${file}" alt="Recommended Product" class="recommended-img" />
        </div>
      `;
  });

  // Inject recommended products HTML into the modal or a container
  $("#recommendedProducts").html(recommendedHTML);
}
