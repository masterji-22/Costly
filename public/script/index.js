// header
let header = $("header");
$(window).on("scroll", () => {
  header.toggleClass("shadow", $(window).scrollTop() > 0);
});

const products = [
  {
    id: 1,
    title: "Men's Casual Shirt",
    price: 899,
    image:
      "https://spykar.com/cdn/shop/files/Q6OXsPY8F-8905566097841_1.webp?v=1735904969",
  },
  {
    id: 2,
    title: "Women's Printed Kurti",
    price: 1299,
    image:
      "https://i.pinimg.com/736x/61/93/56/619356fb2228ae19f4c2e82533e1ad09.jpg",
  },
  {
    id: 3,
    title: "Unisex Perfume Set",
    price: 2499,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/3/TY/TP/BB/124561807/perfume-bottle-3d-model-.jpg",
  },
  {
    id: 4,
    title: "Kids' Cartoon Backpack",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71nqIm8ttcL._AC_UY1000_.jpg",
  },
  {
    id: 5,
    title: "Men's Formal Shirt",
    price: 1199,
    image:
      "https://www.jiomart.com/images/product/original/rvdxoohzfj/pagboys-men-s-formal-shirt-slim-fit-spread-collar-shirt-regular-casual-wear-shirts-sky-blue-s-product-images-rvdxoohzfj-0-202303260302.jpg?im=Resize=(500,630)",
  },
  {
    id: 6,
    title: "Women's Silk Saree",
    price: 2999,
    image:
      "https://img1.exportersindia.com/product_images/bc-full/2024/1/1026943/women-butter-silk-saree-1705300461-7249588.jpg",
  },
  {
    id: 7,
    title: "Women's Flat Sandals",
    price: 999,
    image:
      "https://sreeleathers.com/cdn/shop/products/106809_250_2.jpg?v=1626850987",
  },
  {
    id: 8,
    title: "Kids' Printed Shorts",
    price: 399,
    image:
      "https://cdn12.nnnow.com/web-images/large/styles/ZYZCHWD5ZBM/1691147382950/2.JPG",
  },
  {
    id: 9,
    title: "Men's Formal Shoes",
    price: 2999,
    image: "https://hitz.co.in/cdn/shop/products/7754BLACKA.jpg?v=1734023360",
  },
  {
    id: 10,
    title: "Men's Slim Fit Jeans",
    price: 1299,
    image:
      "https://peplosjeans.in/cdn/shop/files/2_da39391c-d9a6-4b48-924d-ee7693b49b16.png?v=1709638498&width=1080",
  },

  {
    id: 11,
    title: "Women's Casual T-Shirt",
    price: 699,
    image: "https://spykar.com/cdn/shop/products/ikYOHKyDOI-4.jpg?v=1735049987",
  },

  {
    id: 12,
    title: "Men's Sports Sando",
    price: 599,
    image: "https://m.media-amazon.com/images/I/91YRlVVWlIL._AC_UY1100_.jpg",
  },
  {
    id: 13,
    title: "Women's High-Heel Sandals",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61YkVeHaF7L.jpg",
  },
  {
    id: 14,
    title: "Kids' Denim Shorts",
    price: 499,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3MdJ7rk7majqBtjpEhgaJ-PiLJkq4trB8g&s",
  },
  {
    id: 15,
    title: "Men's Casual Shoes",
    price: 1999,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/q/o/q/-original-imahf3jys9ekefec.jpeg?q=90&crop=false",
  },
  {
    id: 16,
    title: "Women's Pleated Skirt",
    price: 899,
    image:
      "https://www.jiomart.com/images/product/original/rvtyz5lil5/klart-women-s-pleated-skirt-skater-skirt-tennis-skirt-cycling-skirts-with-shorts-underneath-product-images-rvtyz5lil5-5-202207311729.jpg?im=Resize=(1000,1000)",
  },
  {
    id: 17,
    title: "Kids' School Backpack",
    price: 999,
    image:
      "https://genietravel.com/cdn/shop/products/KITTY15SBPIN-2.jpg?v=1673412329",
  },
  {
    id: 18,
    title: "Women's Evening Dress",
    price: 1999,
    image:
      "https://images-cdn.ubuy.co.in/6538dd75bd129b445366b40b-fqa-long-black-evening-gowns-for-women.jpg",
  },
  {
    id: 19,
    title: "Women's Sling Bag",
    price: 1299,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkSZQtPT4a7fklhqUjXQQgAY66gEHSXD7Tw&s",
  },
  {
    id: 20,
    title: "Men's Distressed Jeans",
    price: 1499,
    image: "https://freakins.com/cdn/shop/files/DSC01151-Edit.jpg?v=1705931580",
  },
  {
    id: 21,
    title: "Kids' Sports Shoes",
    price: 1499,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20220422/fyCp/6261ad82aeb26921af3a225f/-473Wx593H-410261824-bluerush-MODEL.jpg",
  },
  {
    id: 22,
    title: "Women's Maxi Dress",
    price: 1899,
    image:
      "https://sassafras.in/cdn/shop/products/SFDRSS10603-1.jpg?v=1735899779",
  },
  {
    id: 23,
    title: "Kids' Graphic T-Shirt",
    price: 599,
    image:
      "https://cdn.shopify.com/s/files/1/0583/4820/8201/files/1_1_5a5b564b-c43b-4ccb-afcb-b811fface716.jpg?v=1735821061&width=324",
  },
  {
    id: 24,
    title: "Men's Leather Shoes",
    price: 2499,
    image:
      "https://teakwoodleathers.com/cdn/shop/products/T_SH_PH_04_CA_1_1080x.jpg?v=1661597996",
  },
  {
    id: 25,
    title: "Kids' Sneakers",
    price: 1299,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/kids-shoe/q/1/8/3-jordan-abvoverseas-original-imaggebfhj9uzxvp.jpeg?q=90&crop=false",
  },
  {
    id: 26,
    title: "Men's Sando",
    price: 499,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/kzrbiq80/vest/t/d/q/l-yellow-black-strip-l-mercyguru-new-white-sando-original-imagbzhbp4gfaeyb.jpeg?q=90&crop=false",
  },
  {
    id: 27,
    title: "Women's Cotton Saree",
    price: 1499,
    image:
      "https://www.aevum.in/cdn/shop/files/20437-5.jpg?v=1721994316&width=600",
  },
  {
    id: 28,
    title: "Women's Graphic T-Shirt",
    price: 799,
    image:
      "https://www.thelabelbar.com/_next/image?url=https%3A%2F%2Fthelabelbar.s3.ap-south-1.amazonaws.com%2Fupload-dir%2FTLBTLB02035.jpg&w=1080&q=100",
  },
  {
    id: 29,
    title: "Men's Polo T-Shirt",
    price: 999,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/t-shirt/a/a/n/l-udtshs0381-u-s-polo-assn-original-imagpuyrc8j6qpsp.jpeg?q=20&crop=false",
  },
  {
    id: 30,
    title: "Kids' Party Skirt",
    price: 699,
    image:
      "https://www.faye.in/cdn/shop/products/FayeMagentaSatinSkirt_SBC3_1080x1440.jpg?v=1647438836",
  },
  {
    id: 31,
    title: "Women's A-Line Skirt",
    price: 999,
    image:
      "https://allyfashion.com/cdn/shop/files/ss0486-84c_white_1.jpg?v=1728458839",
  },
  {
    id: 32,
    title: "Women's Tote Handbag",
    price: 1899,
    image: "https://ecoright.com/cdn/shop/files/9_1.jpg?v=1735282632",
  },
  {
    id: 33,
    title: "Kids' Pleated Skirt",
    price: 599,
    image:
      "https://images-cdn.ubuy.co.in/63d30e916c671371c201fce5-kids-teens-plaid-pleated-skirt-little.jpg",
  },
  {
    id: 34,
    title: "Women's Anarkali Kurti",
    price: 1599,
    image:
      "https://images.jdmagicbox.com/quickquotes/images_main/women-anarkali-kurti-2010113210-3pcwajuv.jpg",
  },
  {
    id: 35,
    title: "Men's Striped Polo T-Shirt",
    price: 1099,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/kmkxbww0/t-shirt/l/i/u/l-men-grey-tarzo-original-imagfgbrnwebckjs.jpeg?q=90&crop=false",
  },
  {
    id: 36,
    title: "Men's Sports Shoes",
    price: 2999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqX4fOjHtIV_w_MtZrmi-yQ2AXPIgaMrbMQ&s",
  },
  {
    id: 37,
    title: "Men's Printed T-Shirt",
    price: 699,
    image:
      "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/productimage/2019/10/16/e603a3ee-439c-4dee-884a-d7a41a6048ae1571174354294-1.jpg",
  },
  {
    id: 38,
    title: "Women's Designer Handbag",
    price: 3499,
    image: "https://m.media-amazon.com/images/I/818qVxmAeYL._AC_UY1000_.jpg",
  },
  {
    id: 39,
    title: "Men's Solid T-Shirt",
    price: 799,
    image: "https://images.meesho.com/images/products/309438196/irqix_512.webp",
  },
  {
    id: 40,
    title: "Kids' Cotton T-Shirt",
    price: 499,
    image:
      "https://tbhai.com/cdn/shop/products/CaptainAmericaThemeCustomNameT-ShirtforKids.jpg?v=1633367132",
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
