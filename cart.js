// Retrieve the cart from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart products
function displayCart() {
    const cartContainer = document.getElementById('cart-container');

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    // Generate HTML for cart items
    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');

        productDiv.innerHTML = `
            <div class="image-div" >
                <img src="${item.image}" alt="image">
            </div>
            <div class="content-div">
                <h2>${item.name}</h2>
                <p class="description" >${item.description}</p>
                <p class="price" >${item.price}</p>
                <p class="quantity" >Quantity: ${item.quantity}</p>
            </div>
        `;

        cartContainer.appendChild(productDiv);
    });
}

// Display the cart when the page loads
displayCart();