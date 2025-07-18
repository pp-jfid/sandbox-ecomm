function createProductHTML(product) {
  // Link to the product's unique page using its slug
  return `
    <div class="col-12 col-md-4 col-lg-3 mb-5">
      <a class="product-item" href="products/${product.slug}.html"
         data-id="${product.id}"
         data-title="${product.title}"
         data-price="${product.price}"
         data-image="${product.image}"
         data-category="${product.category}"
         data-variant="${product.variant}"
         data-slug="${product.slug}">
        <img src="../images/${product.image}" class="img-fluid product-thumbnail">
        <h3 class="product-title">${product.title}</h3>
        <strong class="product-price">$${product.price}</strong>
        <span class="icon-cross">
          <img src="images/cross.svg" class="img-fluid">
        </span>
      </a>
    </div>
  `;
}

fetch('data/products.json')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(createProductHTML).join('');
    // Attach cart logic as above
    document.querySelectorAll('.icon-cross').forEach(function (icon) {
      icon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const productItem = icon.closest('.product-item');
        const id = productItem.getAttribute('data-id');
        const title = productItem.getAttribute('data-title');
        const price = productItem.getAttribute('data-price');
        const image = productItem.getAttribute('data-image');
        const category = productItem.getAttribute('data-category');
        const variant = productItem.getAttribute('data-variant');
        const slug = productItem.getAttribute('data-slug');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Use id for uniqueness
        const existing = cart.find(item => item.id === id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ id, title, price, image, category, variant, slug, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        icon.classList.add('added');
        setTimeout(() => icon.classList.remove('added'), 500);

        // eCommerce data layer push for add_to_cart (optional, for analytics)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'add_to_cart',
          ecommerce: {
            items: [{
              item_id: id,
              item_name: title,
              price: parseFloat(price),
              item_brand: 'Furni',
              item_category: category,
              item_variant: variant,
              quantity: 1,
              item_image: image
            }]
          }
        });
      });
    });
  });
