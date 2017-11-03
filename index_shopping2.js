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
    renderAllListItems(STORE);

  }); 
}

//add item to the STORE array
function handleAddItem(item){
  STORE.push({name: item, checked: false});
}

//call renderListItems 
function renderAllListItems(arrStore) {
  //console.log(arrStore);
  
  const liArray = arrStore.map(function(item, itemIndex){
    return renderListItem(item);
  })

  const liArrayToString = liArray.join("");

  $('.shopping-list').html(liArrayToString);
}

function renderListItem(item){
  let checked = item.completed === true ? 'shopping-item__checked' : "";
 
  return `
  <li>
    <span class="shopping-item ${checked}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
       <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

function main() {
  renderAllListItems(STORE);
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
