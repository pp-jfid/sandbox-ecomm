document.addEventListener('DOMContentLoaded', function() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.getElementById('order-summary-body');
  const tfoot = document.getElementById('order-summary-footer');
  let subtotal = 0;

  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3">Your cart is empty.</td></tr>';
    tfoot.innerHTML = '';
    // Optionally, disable the Place Order button
    document.querySelector('.btn.btn-black').disabled = true;
    return;
  }

  tbody.innerHTML = cart.map(item => {
    const itemTotal = (parseFloat(item.price) * item.quantity);
    subtotal += itemTotal;
    // Use a placeholder image if item.image is missing
    const imageSrc = item.image ? item.image : 'images/placeholder.png';
    return `
      <tr>
        <td>
          <img src="${imageSrc}" alt="${item.title}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;">
        </td>
        <td>${item.title} <strong class="mx-2">x</strong> ${item.quantity}</td>
        <td>$${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  tfoot.innerHTML = `
    <tr>
      <td class="text-black font-weight-bold" colspan="2"><strong>Cart Subtotal</strong></td>
      <td class="text-black">$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
      <td class="text-black font-weight-bold" colspan="2"><strong>Order Total</strong></td>
      <td class="text-black font-weight-bold"><strong>$${subtotal.toFixed(2)}</strong></td>
    </tr>
  `;

  // Place Order button: just redirect to thankyou.html
  document.querySelector('.btn.btn-black').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'thankyou.html';
  });
});
