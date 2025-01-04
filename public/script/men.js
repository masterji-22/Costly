// Products Array
const products = [
  // Men's Products
  {
    id: 1,
    title: "Men's Casual Shirt",
    price: 899,
    image:
      "https://spykar.com/cdn/shop/files/Q6OXsPY8F-8905566097841_1.webp?v=1735904969",
  },
  {
    id: 5,
    title: "Men's Formal Shirt",
    price: 1199,
    image:
      "https://www.jiomart.com/images/product/original/rvdxoohzfj/pagboys-men-s-formal-shirt-slim-fit-spread-collar-shirt-regular-casual-wear-shirts-sky-blue-s-product-images-rvdxoohzfj-0-202303260302.jpg?im=Resize=(500,630)",
  },
  {
    id: 10,
    title: "Men's Slim Fit Jeans",
    price: 1299,
    image:
      "https://peplosjeans.in/cdn/shop/files/2_da39391c-d9a6-4b48-924d-ee7693b49b16.png?v=1709638498&width=1080",
  },
  {
    id: 12,
    title: "Men's Sports Sando",
    price: 599,
    image: "https://m.media-amazon.com/images/I/91YRlVVWlIL._AC_UY1100_.jpg",
  },
  {
    id: 20,
    title: "Men's Distressed Jeans",
    price: 1499,
    image: "https://freakins.com/cdn/shop/files/DSC01151-Edit.jpg?v=1705931580",
  },
  {
    id: 26,
    title: "Men's Sando",
    price: 499,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/kzrbiq80/vest/t/d/q/l-yellow-black-strip-l-mercyguru-new-white-sando-original-imagbzhbp4gfaeyb.jpeg?q=90&crop=false",
  },
  {
    id: 29,
    title: "Men's Polo T-Shirt",
    price: 999,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/t-shirt/a/a/n/l-udtshs0381-u-s-polo-assn-original-imagpuyrc8j6qpsp.jpeg?q=20&crop=false",
  },
  {
    id: 35,
    title: "Men's Striped Polo T-Shirt",
    price: 1099,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/kmkxbww0/t-shirt/l/i/u/l-men-grey-tarzo-original-imagfgbrnwebckjs.jpeg?q=90&crop=false",
  },
  {
    id: 37,
    title: "Men's Printed T-Shirt",
    price: 699,
    image:
      "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/productimage/2019/10/16/e603a3ee-439c-4dee-884a-d7a41a6048ae1571174354294-1.jpg",
  },
  {
    id: 39,
    title: "Men's Solid T-Shirt",
    price: 799,
    image: "https://images.meesho.com/images/products/309438196/irqix_512.webp",
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
