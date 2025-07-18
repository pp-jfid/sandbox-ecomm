document.getElementById('add-to-cart-btn').addEventListener('click', function() {
  // Get product data from data attributes on the button or from the DOM
  const btn = this;
  const id = btn.getAttribute('data-id');
  const title = btn.getAttribute('data-title');
  const price = btn.getAttribute('data-price');
  const image = btn.getAttribute('data-image');
  const category = btn.getAttribute('data-category');
  const variant = btn.getAttribute('data-variant');
  const slug = btn.getAttribute('data-slug');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Use id for uniqueness
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title, price, image, category, variant, slug, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Feedback
  const feedback = document.getElementById('cart-feedback');
  if (feedback) {
    feedback.style.display = 'block';
    setTimeout(() => { feedback.style.display = 'none'; }, 1200);
  }
});
