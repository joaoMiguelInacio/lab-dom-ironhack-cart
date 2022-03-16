// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector(`.price span`); 
  const quantity = product.querySelector(".quantity input"); 
  const actualPrice = Number(price.innerHTML);
  const actualQuantity = Number(quantity.value);
  const actualSubtotal = actualPrice*actualQuantity; 
  const subtotal = product.querySelector(`.subtotal span`);
  subtotal.innerHTML = actualSubtotal;
  return actualSubtotal;
}

function calculateAll(callback){
  const productsNode =  document.querySelectorAll(".product");
  const productsInArray = [...productsNode];
  let sum = 0;
  for (let i = 0; i< productsInArray.length; i++ ){
    updateSubtotal (productsInArray[i]);
    const totalValue = document.querySelector(`#total-value span`);
    sum += updateSubtotal (productsInArray[i]);
    totalValue.innerHTML = sum;
  }
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  //... your code goes here
}

// ITERATION 5

function createProduct() {
  //... your code goes here
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
});
