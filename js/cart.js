function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalDiv.innerHTML = '';
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = cart.map((item, idx) => {
    const itemTotal = parseFloat(item.price) * item.quantity;
    total += itemTotal;
    return `
      <div class="row align-items-center mb-3 border-bottom pb-2">
        <div class="col-2">
          <img src="${item.image}" class="img-fluid" style="max-width:60px;">
        </div>
        <div class="col-4">${item.title}</div>
        <div class="col-2">$${item.price}</div>
        <div class="col-2">
          <div class="input-group input-group-sm">
            <button class="btn btn-outline-secondary btn-qty" data-idx="${idx}" data-action="decrement">-</button>
            <input type="text" class="form-control text-center" value="${item.quantity}" style="max-width:40px;" readonly>
            <button class="btn btn-outline-secondary btn-qty" data-idx="${idx}" data-action="increment">+</button>
          </div>
        </div>
        <div class="col-2">
          <button class="btn btn-danger btn-sm remove-item" data-idx="${idx}">&times;</button>
        </div>
      </div>
    `;
  }).join('');

  cartTotalDiv.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;

  // Remove item handler
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      const removedItem = cart[idx];
      // Push to dataLayer for ecommerce remove_from_cart event
      window.dataLayer = window.dataLayer || [];
      console.log('remove_from_cart payload', removedItem);
      window.dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
          items: [{
            item_id: removedItem.id,
            item_name: removedItem.title,
            price: parseFloat(removedItem.price),
            item_brand: 'Furni',
            item_category: removedItem.category || '',
            item_variant: removedItem.variant || '',
            quantity: removedItem.quantity,
            item_image: removedItem.image
          }]
        }
      });
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });

  // Quantity change handlers
  document.querySelectorAll('.btn-qty').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      const action = this.getAttribute('data-action');
      if (action === 'increment') {
        cart[idx].quantity += 1;
      } else if (action === 'decrement' && cart[idx].quantity > 1) {
        cart[idx].quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

// Checkout button (clear cart and redirect)
document.addEventListener('DOMContentLoaded', function() {
  renderCart();
  document.getElementById('checkout-btn').addEventListener('click', function() {
    // Save cart to lastCart for thankyou page
    const cart = localStorage.getItem('cart');
    if (cart) {
      localStorage.setItem('lastCart', cart);
    }
      window.location.href = 'checkout.html';
  });
});
