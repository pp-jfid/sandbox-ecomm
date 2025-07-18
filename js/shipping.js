  document.getElementById('place-order-btn').addEventListener('click', function() {
    localStorage.removeItem('cart');
    window.location.href = 'thankyou.html';
  });