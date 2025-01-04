// Products Array
const products = [
  {
    id: "K001",
    title: "Kids' Cotton T-Shirt",
    price: 499,
    image:
      "https://www.tantratshirts.com/wp-content/uploads/2024/10/t-shirt-mockup-of-a-boy-posing-in-a-studio-28119.png",
  },
  {
    id: "K002",
    title: "Kids' Printed Shorts",
    price: 399,
    image:
      "https://cdn12.nnnow.com/web-images/large/styles/ZYZCHWD5ZBM/1691147382950/2.JPG",
  },
  {
    id: 33,
    title: "Kids' Pleated Skirt",
    price: 599,
    image:
      "https://images-cdn.ubuy.co.in/63d30e916c671371c201fce5-kids-teens-plaid-pleated-skirt-little.jpg",
  },
  {
    id: "K004",
    title: "Kids' School Backpack",
    price: 999,
    image:
      "https://genietravel.com/cdn/shop/products/KITTY15SBPIN-2.jpg?v=1673412329",
  },
  {
    id: "K005",
    title: "Kids' Sneakers",
    price: 1299,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/kids-shoe/q/1/8/3-jordan-abvoverseas-original-imaggebfhj9uzxvp.jpeg?q=90&crop=false",
  },
  {
    id: "K006",
    title: "Kids' Graphic T-Shirt",
    price: 599,
    image:
      "https://cdn.shopify.com/s/files/1/0583/4820/8201/files/1_1_5a5b564b-c43b-4ccb-afcb-b811fface716.jpg?v=1735821061&width=324",
  },
  {
    id: "K007",
    title: "Kids' Denim Shorts",
    price: 499,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3MdJ7rk7majqBtjpEhgaJ-PiLJkq4trB8g&s",
  },
  {
    id: "K008",
    title: "Kids' Party Skirt",
    price: 699,
    image:
      "https://www.faye.in/cdn/shop/products/FayeMagentaSatinSkirt_SBC3_1080x1440.jpg?v=1647438836",
  },
  {
    id: "K009",
    title: "Kids' Cartoon Backpack",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71nqIm8ttcL._AC_UY1000_.jpg",
  },
  {
    id: "K010",
    title: "Kids' Sports Shoes",
    price: 1499,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20220422/fyCp/6261ad82aeb26921af3a225f/-473Wx593H-410261824-bluerush-MODEL.jpg",
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
