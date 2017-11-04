'use strict';
/*global $*/

const STORE = [
  {name: 'apples', checked: true},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

$(main);
// adds newly entered item to shopping list
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
  const liArray = arrStore.map(function(item, itemIndex){
    return renderListItem(item);
  });
  const liArrayToString = liArray.join('');
  $('.shopping-list').html(liArrayToString);
}

function renderListItem(item){
  let checked = item.completed === true ? 'shopping-item__checked' : '';
 
  return `
  <li class>
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

//marking items as checked/unchecked

function handleCheckedItem() {
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
    
  });
}
//deleting items
function handleDeleteItemClicked() {
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    $(this).closest('li').remove('li');
  });

}
//hides/shows checked items
function hideCheckedItems(){
  $('.hide-checked-items').on('click', function(){
    $('.shopping-item__checked').closest('li').hide();
  });
  // $('.hide-checked-items').off('change', function(){
  //   $('shopping-item__checked').toggle('shopping-item__checked').show();
  //   console.log(`firing?`);
  // });
}
//filter items in list by search
function handleSearchFilter(){
  $('.js-shopping-list-search').on('keyup', function(event){
    const searchTerm = $('.js-shopping-list-search').val();
    const filteredArr = STORE.filter(function(item){
      return item.name.indexOf(searchTerm) !== -1;
    })
    renderAllListItems(filteredArr);
  })
}

function main() {
  renderAllListItems(STORE);
  handleItemSubmit();
  handleCheckedItem();
  handleDeleteItemClicked();
  hideCheckedItems();
  handleSearchFilter();
  hideCheckedItems();
}
