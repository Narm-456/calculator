document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Persist cart in localStorage

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartContainer = document.getElementById('cart');
  const totalPriceElement = document.getElementById('total-price');

  // Function to update cart display (for cart.html)
  const updateCartDisplay = () => {
      if (!cartContainer) return;  // Ensure this runs only on cart.html

      cartContainer.innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
          total += item.price;

          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;">
              <span>${item.name} - $${item.price.toFixed(2)}</span>
              <button class="remove-from-cart" data-index="${index}">Remove</button>
          `;

          cartContainer.appendChild(cartItem);
      });

      totalPriceElement.textContent =` Total: $${total.toFixed(2)}`;
  };

  // Add to cart functionality (for index.html)
  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const product = button.parentElement;
          const productName = product.querySelector('h3').textContent;
          const productPrice = parseFloat(product.querySelector('p').textContent.split('$')[1]);
          const productImage = product.querySelector('img').src;  // Get product image

          const productDetails = {
              name: productName,
              price: productPrice,
              image: productImage  // Add image to product details
          };

          cart.push(productDetails);
          localStorage.setItem('cart', JSON.stringify(cart));  // Store in localStorage
          alert(`${productName} has been added to your cart.`);
      });
  });

  // Remove from cart functionality (for cart.html)
  if (cartContainer) {
      cartContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('remove-from-cart')) {
              const itemIndex = e.target.getAttribute('data-index');
              cart.splice(itemIndex, 1);
              localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
              updateCartDisplay();
          }
      });

      updateCartDisplay();  // Initial call to display cart items on cart.html
  }
});