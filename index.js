import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://add-market-85f97-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shopping list")

const addButtonEl = document.getElementById("add-button")
const inputButtonEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, function(snapshot) {
    
    
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearInputButtonEl()
        clearShoppingListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }
    }else {
        shoppingListEl.innerHTML = "Không có gì cần mua"
    }
})

addButtonEl.addEventListener("click", function () {
    let inputValue = inputButtonEl.value;
    clearInputButtonEl(); // Clear the input field
    push(shoppingListInDB, inputValue); // Add the new item to the database
  });  

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputButtonEl() {
    inputButtonEl.value = ""
}
function appendItemToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    newEl.addEventListener("click", function(){
        let removeListEl = ref(database, `shopping list/${itemID}`)
        remove(removeListEl)
})


    shoppingListEl.append(newEl)

}