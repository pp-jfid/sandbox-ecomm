const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const template = fs.readFileSync('product-template.html', 'utf8');

// Ensure the /products directory exists
const productsDir = path.join(__dirname, '..', 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

products.forEach(product => {
  let html = template
    .replace(/{{id}}/g, product.id)
    .replace(/{{title}}/g, product.title)
    .replace(/{{image}}/g, product.image)
    .replace(/{{price}}/g, product.price)
    .replace(/{{slug}}/g, product.slug)
    .replace(/{{description}}/g, product.description || "")
    .replace(/{{category}}/g, product.category || "")
    .replace(/{{variant}}/g, product.variant || "");

  fs.writeFileSync(
    path.join(productsDir, `${product.slug}.html`),
    html,
    'utf8'
  );
  console.log(`Generated products/${product.slug}.html`);
});
