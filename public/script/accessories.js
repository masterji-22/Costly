let header = $("header");
$(window).on("scroll", () => {
  header.toggleClass("shadow", $(window).scrollTop() > 0);
});

// Products Array
const products = [
  {
    id: 7,
    title: "Women's Flat Sandals",
    price: 999,
    image:
      "https://sreeleathers.com/cdn/shop/products/106809_250_2.jpg?v=1626850987",
  },
  {
    id: 32,
    title: "Women's Tote Handbag",
    price: 1899,
    image: "https://ecoright.com/cdn/shop/files/9_1.jpg?v=1735282632",
  },
  {
    id: 3,
    title: "Unisex Perfume Set",
    price: 2499,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/3/TY/TP/BB/124561807/perfume-bottle-3d-model-.jpg",
  },
  {
    id: 9,
    title: "Men's Formal Shoes",
    price: 2999,
    image: "https://hitz.co.in/cdn/shop/products/7754BLACKA.jpg?v=1734023360",
  },
  {
    id: 15,
    title: "Men's Casual Shoes",
    price: 1999,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/q/o/q/-original-imahf3jys9ekefec.jpeg?q=90&crop=false",
  },
  {
    id: 19,
    title: "Women's Sling Bag",
    price: 1299,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkSZQtPT4a7fklhqUjXQQgAY66gEHSXD7Tw&s",
  },
  {
    id: 24,
    title: "Men's Leather Shoes",
    price: 2499,
    image:
      "https://teakwoodleathers.com/cdn/shop/products/T_SH_PH_04_CA_1_1080x.jpg?v=1661597996",
  },
  {
    id: 32,
    title: "Women's Designer Handbag",
    price: 3499,
    image: "https://m.media-amazon.com/images/I/818qVxmAeYL._AC_UY1000_.jpg",
  },
  {
    id: 13,
    title: "Women's High-Heel Sandals",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61YkVeHaF7L.jpg",
  },
  {
    id: 36,
    title: "Men's Sports Shoes",
    price: 2999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqX4fOjHtIV_w_MtZrmi-yQ2AXPIgaMrbMQ&s",
  },
  {
    id: 38,
    title: "Women's Designer Handbag",
    price: 3499,
    image: "https://m.media-amazon.com/images/I/818qVxmAeYL._AC_UY1000_.jpg",
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
