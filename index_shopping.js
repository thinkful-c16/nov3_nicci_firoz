'use strict';

// adding newly entered item to shopping list
$(document).ready(function() {
  $('#js-shopping-list-form').on('submit', function(event){
    event.preventDefault();
    const entryItem = $('.js-shopping-list-entry').val();
    const newItem = newItemTemplate(entryItem);
    //console.log(`${newItem}`);
    $('.shopping-list').append(newItem);
  });
});

function newItemTemplate(entry) {
  return `
  <li>
  <span class="shopping-item">${entry}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>
  `;
}
function main() {}

//marking items as checked/unchecked
function handleCheckedItem() {
  $('.shopping-list').on('click', 'shopping-item-toggle', function(event) {
    $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
    console.log(`hello`);
  });
}

handleCheckedItem();


//deleting items
