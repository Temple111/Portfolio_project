let myLeads = [];

const saveEl = document.getElementById("save");
const savetabEl = document.getElementById("savetab");
const deleteEl = document.getElementById("deleteall");
const ulEl = document.getElementById("ul");
const inputEl = document.getElementById('input');

let fromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (fromLocalStorage) {
    myLeads = fromLocalStorage;
    display(myLeads);
}

function display(leads) {
    let list = '';
    leads.forEach((lead, i) => {
        list += `<li>
            <a href='${lead}' target='_blank'>${lead}</a>
            <button id="deleteItem${i}" class="deleteButton">
                Delete
            </button>
        </li>`;
    });
    ulEl.innerHTML = list;
    attachDeleteButtonListeners();
}

function attachDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function() {
            deleteItem(i);
        });
    }
}

saveEl.addEventListener('click', function() {
    const textbox = inputEl.value;
    myLeads.push(textbox);
    inputEl.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    display(myLeads);
});

savetabEl.addEventListener('click', function() {
    if (typeof browser !== 'undefined' && typeof browser.tabs !== 'undefined') {
        browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
            let mytabs = tabs[0].url;
            myLeads.push(mytabs);
            localStorage.setItem('myLeads', JSON.stringify(myLeads));
            display(myLeads);
        }).catch(function(error) {
            console.error(error);
        });
    } else if (typeof chrome !== 'undefined' && typeof chrome.tabs !== 'undefined') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let mytabs = tabs[0].url;
            myLeads.push(mytabs);
            localStorage.setItem('myLeads', JSON.stringify(myLeads));
            display(myLeads);
        });
    } else {
        console.error('Both browser.tabs and chrome.tabs are not available.');
    }
});


function deleteItem(index) {
    myLeads.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    display(myLeads);
}

deleteEl.addEventListener('click', function() {
    if (confirm("Are you sure you want to delete all items?")) {
        localStorage.clear();
        myLeads = [];
        display(myLeads);
    }
});

