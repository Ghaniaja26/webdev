// Get all the buttons for quantity change and add to cart
const minusButtons = document.querySelectorAll('.kurang');
const plusButtons = document.querySelectorAll('.tambah');
const quantityInputs = document.querySelectorAll('.form-control.text-center');
const addToCartButtons = document.querySelectorAll('.btn-success');

// Add event listeners to the buttons
minusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    updateQuantity(index, -1);
    calculateTotalPrice();
  });
});

plusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    updateQuantity(index, 1);
    calculateTotalPrice();
  });
});

addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    addToCart(index);
    calculateTotalPrice();
  });
});

function updateQuantity(index, change) {
  const currentQuantity = parseInt(quantityInputs[index].textContent);
  const newQuantity = currentQuantity + change;

  if (newQuantity >= 0) {
    quantityInputs[index].textContent = newQuantity;
  }
}

function addToCart(index) {
  const itemName = document.querySelectorAll('.barang h1')[index].textContent;
  const itemPrice = document.querySelectorAll('.barang p')[index].textContent;
  const itemQuantity = parseInt(quantityInputs[index].textContent);

  if (itemQuantity > 0){
    const parsedPrice = parseInt(itemPrice.replace('Rp ', '').replace('.', '').replace('.', ''));
    const totalItemPrice = parsedPrice * itemQuantity;

    const itemImageSrc = document.querySelectorAll('.barang img')[index].src;

    // Create a new cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <p><strong>${itemName}</strong></p>
        <p>${itemPrice} x ${itemQuantity} </p>
        <img src="${itemImageSrc}" alt="${itemName}" class="cart-item-image">
        <p><strong>Rp.${formatPrice(totalItemPrice)}</strong></p>
        <hr>
    `;

    // Append the cart item to the cart section
    const cartSection = document.querySelector('.keranjang');
    const cartItems = document.querySelectorAll('.cart-item');
    cartSection.insertBefore(cartItem, cartItems[0]);
    quantityInputs[index].textContent = '0';
  }

}

function calculateTotalPrice() {
  const cartItems = document.querySelectorAll('.cart-item');
  let totalPrice = 0;
  let pajak = 0;
  let keseluruhan = 0;

  cartItems.forEach((item) => {
    const itemPriceString = item.querySelector('p:nth-child(2)').textContent;
    const itemQuantity = parseInt(item.querySelector('p:nth-child(2)').textContent.split('x')[1].trim());
    const itemPrice = parseInt(itemPriceString.replace('Rp ', '').replace('.', '').replace('.', ''));
    
    totalPrice += itemPrice * itemQuantity;
    pajak = 0.11 * totalPrice;
    keseluruhan = totalPrice + pajak;
  });

  // Update the total price in the cart section
  const totalElement = document.querySelector('.total-price');
  const Jumlahpajak = document.querySelector('.pajak');
  const totKeseluruhan = document.querySelector('.keseluruhan');
  totalElement.textContent = `Total Pembelian: Rp ${formatPrice(totalPrice)}`;
  Jumlahpajak.textContent = `Pajak 11%: Rp ${formatPrice(pajak)}`;
  totKeseluruhan.textContent = `Total Bayar: Rp ${formatPrice(keseluruhan)}`;
}

function formatPrice(price) {
  return price.toLocaleString('id-ID');
}
