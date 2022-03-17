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
  const trToBeRemoved = target.parentElement.parentElement;
  const parentToChange = trToBeRemoved.parentElement;
  parentToChange.removeChild(trToBeRemoved);
}

/*The currentTarget event property
 returns the element whose event listeners 
 triggered the event, in this case: <button>.
 This now the variable called target.

 tr to be removed is the grand-parent of <button>.
 first parent is td. grand-parent is tr.
 This now the variable called trToBeRemoved.

 To remove the grand-parent tr we can access its parent
 and then use removeChild(trToBeRemoved)
 This is now the variable trParentToChange.
 
 tbody doesn't work, instead of thr trParentToChange
 without having a class or ID. 
 1) tbody id to be added on the html
 2) the following to be added to the scrip:
      tbody = document.getElementById("tbody");
      body.removeChild(trToBeRemoved);
 */

// ITERATION 5

function createProduct() {
  const userProductInputTag = document.querySelector('.create-product input[type="text"]');
  //selects class "create-product" + input tag type text
  
  const userPriceInputTag = document.querySelector('.create-product input[type="number"]');
  //selects class "create-product" + input tag number
  
  const newProductName = userProductInputTag.value;
  const newProductPrice = Number(userPriceInputTag.value);
  //transforms user input in the actual product name and price
  /*could be actualName and actualPrice again and it 
  wouldnt conflict with the constants declared
  above because of their local/functional scope */
  
  const newProduct = document.createElement('tr');
  //creates a new EMPTY
  
  newProduct.classList.add('product');
  //adds a class to this new tr, same class as the other products
  
  newProduct.innerHTML = `
    <td class="name">
      <span>${newProductName}</span>
    </td>
    <td class="price">$<span>${newProductPrice}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;
  //adds this whole html text into the newly created product
  
  const productRemoveButtonElement = newProduct.querySelector('button');
  //selects first button inside the newly created tr
  
  productRemoveButtonElement.addEventListener('click', removeProduct);
  /* sets an eventListener that callsback
   the removeProduct function on this 
   newly created product 
   when the remove button is clicked */

  const wholeTableBody = document.querySelector('#cart tbody');
  //id "cart" + tbody to exclude 1st row
  
  wholeTableBody.appendChild(newProduct);
  //adds newly created product to the end of the table body
  
  userProductInputTag.value = '';
  userPriceInputTag.value = 0;
  /* whilst on the input tags themselves, 
  this will reset the price to 0 and
  clean the text input tag to display 
  the placeholder message again */
}

window.addEventListener('load', () => {
  const calculateButton = document.getElementById('calculate');
  /*defines calculateButton as a variable
    and gets its value using the method getElementById.
    
    ==
    document.getElementsByClassName(`btn-success`)*/

  calculateButton.addEventListener('click', calculateAll);
  /*when one "clicks" on the calculatePriceBtn
  the function calculateAll is calledback*/

  const removeButtons = document.querySelectorAll('.btn-remove');
  /*
  returns node list with all remove buttons
  document.getElementsByClassName returns array like object as well
  
    const removeButtonsArray = [...removeButtons];
    removeButtonsArray.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      removeProduct();
    });
  
    || 
  
    if (removeButtons){
      for (let i=0; i<removeButtonsArray.length;i++){
      removeButtons.addEventListener('click', removeProduct);
      }
    }

  The above methods dont work. Some browsers 
  iterate through node lists with forEach.
  Mine doesnt. @google:
  How to iterate through node lists?*/
  
  for (const removeBut of removeButtons)
    removeBut.addEventListener('click', removeProduct);
    //if "clicked", callsback the function removeProduct
 
  const createButton = document.getElementById('create');
  //IDs are unique and there is only one create button, then:
  if (createButton)
    createButton.addEventListener('click', createProduct);
    //if "clicked", callsback the function createProduct
});
