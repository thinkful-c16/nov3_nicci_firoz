'use strict';

const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

// adding newly entered item to shopping list
$(main);

function handleItemSubmit(){
  $('#js-shopping-list-form').on('submit', function(event){
    event.preventDefault();
    const entryItem = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    handleAddItem(entryItem); 
    console.log(newItemTemplate(STORE));

  }); 
}

function handleAddItem(item){
  STORE.push({name: item, checked: false});
}

function newItemTemplate(arrStore) {
  console.log("In new item");
  console.log(arrStore);
  
  const liArray = $(arrStore).map(function(){
    `
    <li>
      <span class="shopping-item">${arrStore.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
         <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;

  })

  return liArray;
}

function renderShoppingList(){
  
}

function main() {
  handleItemSubmit();
  handleCheckedItem();
  handleDeletedItem();
}

//marking items as checked/unchecked

function handleCheckedItem() {
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
    console.log(`hello`);
  });
}

//deleting items
function handleDeletedItem() {
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    $(this).closest('li').remove('li');
  });
}
