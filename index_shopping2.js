'use strict';

const STORE = [
  {name: 'apples', checked: true},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

//********START Build *single item, then all items, then display in webpage */
function renderListItem(item){
  let checked = item.completed === true ? 'shopping-item__checked' : '';
 
  return `
  <li>
    <span class="shopping-item ${checked}">${item.name}</span>
    <form class="edit-shopping-item-form hidden">
      <label for="shopping-list-edit">Edit item</label>
      <input type="text" name="shopping-list-edit" class="js-shopping-list-edit" placeholder="enter new name">
      <button type="submit">save changes</button>
    </form>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
       <span class="button-label">delete</span>
      </button>
      <button class="shopping-item-edit">
        <span class="button-label">edit</span>
      </button>
    </div>
    
  </li>`;
}

function renderAllListItems(arrStore) {
  const liArray = arrStore.map(function(item, itemIndex){
    return renderListItem(item);
  });
  const liArrayToString = liArray.join('');
  $('.shopping-list').html(liArrayToString);
}
//********END Build *single item, then all items, then display in webpage */




//********START Get Submitted Item *get item from user and add to array */
//add item to the STORE array
function handleAddItem(item){
  STORE.push({name: item, checked: false});
}

function handleItemSubmit(){
  $('#js-shopping-list-form').on('submit', function(event){
    event.preventDefault();
    const entryItem = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    handleAddItem(entryItem); 
    renderAllListItems(STORE);

  }); 
}
//********END Get Submitted Item *get item from user and add to array */





//********START For Checked Items *show strikethrough when checked; hide checked items when checkbox clicked */
function handleCheckedItem() {
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  });
}

function hideCheckedItems(){
  $('.hide-checked-items').on('click', function(){
    $('.shopping-item__checked').closest('li').toggle('li');
  })
}
//********END For Checked Items *show strikethrough when checked; hide checked items when checkbox clicked */





//********START For Deleted Items *remove it when button is clicked */
function handleDeletedItem() {
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    $(this).closest('li').remove('li');
  });
}
//********END For Deleted Items *remove it when button is clicked */





//********START For Item Search *display items that match typed search criteria */
function handleSearchFilter(){
  $('.js-shopping-list-search').on('keyup', function(event){
    const searchTerm = $('.js-shopping-list-search').val();
    const filteredArr = STORE.filter(function(item){
      return item.name.indexOf(searchTerm) !== -1;
    });
    renderAllListItems(filteredArr);
  });
}
//********START For Item Search *display items that match typed search criteria */






//********START For Editing Items * */
function updateArray(shoppingItems, oldText, newText){
  shoppingItems.forEach(function(item){
    if(item.name === oldText){
      item.name = newText;
    }
  });
  renderAllListItems(STORE);
}


function handleItemEdit(){
  $('.shopping-list').on('click', '.shopping-item-edit', function(event){
    $(this).closest('li').find('.edit-shopping-item-form').toggleClass('hidden');
    const oldText = ($(this).closest('li').find('span').first().text());
    $('.js-shopping-list-edit').val(oldText);

    $('.edit-shopping-item-form').on('submit', function(e){
      e.preventDefault();
      const newText = ($(this).find('.js-shopping-list-edit').val());
      $(this).closest('li').find('.edit-shopping-item-form').toggleClass('hidden');
      updateArray(STORE, oldText, newText);
    });  
  });
}
//********END For Editing Items * */



function main() {
  renderAllListItems(STORE);
  handleItemSubmit();
  handleCheckedItem();
  handleDeletedItem();
  hideCheckedItems();
  handleSearchFilter();
  handleItemEdit();
}

$(main);