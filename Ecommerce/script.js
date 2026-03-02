const products = [
    {
        id: 1,
        name: "Laptop",
        price: 45000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
        id: 2,
        name: "Headphones",
        price: 2000,
        image: "https://images.unsplash.com/photo-1518441902111-a8b8cdd9e3a2"
    },
    {
        id: 3,
        name: "Smartphone",
        price: 25000,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
        id: 4,
        name: "Watch",
        price: 3000,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");

function displayProducts(items) {
    productList.innerHTML = "";
    items.forEach(product => {
        productList.innerHTML += `
        <div class="product">
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>`;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.innerText = cart.length;

    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("total");
    cartItems.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        sum += item.price;
        cartItems.innerHTML += `
        <li>
            ${item.name} - ₹${item.price}
            <button onclick="removeItem(${index})">❌</button>
        </li>`;
    });

    total.innerText = sum;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

document.querySelector(".cart-icon").addEventListener("click", () => {
    cartModal.classList.add("active");
});

function closeCart() {
    cartModal.classList.remove("active");
}

/* SEARCH FILTER */
document.getElementById("search").addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

/* IMAGE SLIDER */
const images = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1512499617640-c2f999098c01"
];

let index = 0;
setInterval(() => {
    index = (index + 1) % images.length;
    document.getElementById("slider").src = images[index];
}, 3000);

displayProducts(products);
updateCart();