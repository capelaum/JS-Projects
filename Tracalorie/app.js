// Storage Controller

// Item Controller
const ItemController = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure / State
  const data = {
    items: [
      // { id: 0, name: "Burguer King", calories: 1000 },
      // { id: 1, name: "Taco Bell", calories: 700 },
      // { id: 2, name: "Eggs", calories: 250 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;

      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);
      // Create new Item
      newItem = new Item(ID, name, calories);
      // Add to Items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id) {
      let found = null;

      // Loop throught items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function (name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function (id) {
      // Get IDs
      const ids = data.items.map(function (item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function () {
      let total = 0;

      data.items.forEach(function (item) {
        total += item.calories;
      });

      // Set total cal in data structure
      data.totalCalories = total;

      return data.totalCalories;
    },
    logData: function () {
      return data;
    },
  };
})();

//* UI Controller
const UIController = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  // Public methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil edit-item"></i>
        </a>
      </li>`;
      });

      // Insert list items to UI item list
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      // Show the List
      document.querySelector(UISelectors.itemList).style.display = "block";

      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="fa fa-pencil edit-item"></i>
      </a>`;

      // Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Nodelist into array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="fa fa-pencil edit-item"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemController.getCurrentItem().name;

      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemController.getCurrentItem().calories;
      UIController.showEditState();
    },
    clearItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Nodelist into Array
      listItems = Array.from(listItems);

      listItems.forEach(function (item) {
        item.remove();
      });
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function () {
      UIController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//* App Controller
const App = (function (ItemController, UIController) {
  // Load event listeners
  const loadEventListeners = function () {
    const UISelectors = UIController.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEdit);

    // Update Item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Delete Item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UIController.clearEditState);

    // Clear button event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI Controller
    const input = UIController.getItemInput();

    // Check for name and calories input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);

      // Add item to UI list
      UIController.addListItem(newItem);

      // Get Total Calories
      const totalCalories = ItemController.getTotalCalories();
      // Show total calories in UI
      UIController.showTotalCalories(totalCalories);

      // Clear Inputs
      UIController.clearInput();
    }

    e.preventDefault();
  };

  // Edit item click
  const itemEdit = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item if (item-0, item-1, ..., item-n)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArray = listId.split("-");
      // Get the actual ID
      const id = parseInt(listIdArray[1]);
      // Get item
      const itemToEdit = ItemController.getItemById(id);
      // Set current item
      ItemController.setCurrentItem(itemToEdit);
      // Add item to form
      UIController.addItemToForm();
    }

    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = UIController.getItemInput();

    // Update item
    const updatedItem = ItemController.updateItem(input.name, input.calories);

    // Update UI
    UIController.updateListItem(updatedItem);

    // Get Total Calories
    const totalCalories = ItemController.getTotalCalories();
    // Show total calories in UI
    UIController.showTotalCalories(totalCalories);

    UIController.clearEditState();

    e.preventDefault();
  };

  // Deelte button event
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemController.getCurrentItem();

    // Delete from data structure
    ItemController.deleteItem(currentItem.id);

    // Delete from UI
    UIController.deleteListItem(currentItem.id);

    // Get Total Calories
    const totalCalories = ItemController.getTotalCalories();
    // Show total calories in UI
    UIController.showTotalCalories(totalCalories);

    UIController.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = function () {
    // Delete all items from data structure
    ItemController.clearAllItems();

    // Get Total Calories
    const totalCalories = ItemController.getTotalCalories();
    // Show total calories in UI
    UIController.showTotalCalories(totalCalories);

    // Remove all from UI
    UIController.clearItems();

    UIController.clearEditState();

    // Hide UI
    UIController.hideList();
  };

  // Public methods
  return {
    init: function () {
      console.log("Initializinng App...");

      //  Clear edit state  set initial set
      UIController.clearEditState();

      // Fetch items from data structure
      const items = ItemController.getItems();

      // Check if items list is empty
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }

      // Get Total Calories
      const totalCalories = ItemController.getTotalCalories();

      // Show total calories in UI
      UIController.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemController, UIController);

// Initialize Append
App.init();
