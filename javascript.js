let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (e) => {
        const productContainer = e.target.closest('.product');

        const product = {
            image: productContainer.querySelector('img').getAttribute('src'),
            name: productContainer.querySelector('h2').textContent,
            description: productContainer.querySelector('.description').textContent,
            price: productContainer.querySelector('.price').textContent,
        };
    
        addToCart(product);
    })
});