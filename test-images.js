// Test image accessibility
const imagePaths = [
  '/images/sabra.jpg',
  '/images/claude.jpg', 
  '/images/abouba.jpg',
  '/images/bibiane.jpg',
  '/images/mohamed.jpg',
  '/images/ishimwe.jpg',
  '/images/lydia.jpg'
];

console.log('Testing image accessibility...');

imagePaths.forEach(path => {
  const img = new Image();
  img.onload = () => console.log(`✅ ${path} - loaded successfully`);
  img.onerror = () => console.log(`❌ ${path} - failed to load`);
  img.src = path;
});
