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

/*function display(leadsarr) {
    let list = '';
    leadsarr.forEach((lead, i) => {
        //lead = leadsarr[i]
        list += `<li>
            <a href='${lead}' target='_blank'>${lead}</a>
            <button id="${i}deleteItem" class="deleteButton">
                Delete
            </button>
        </li>`;
    });
    ulEl.innerHTML = list;
    attachDeleteButtonListeners();
}
*/
/* the above function is the same as the one below*/

function display(leads) {
    let list = '';
    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        list += `<li>
            <a href="${lead}" target="_blank">${lead}</a>
            <button class="deletebtn">Delete</button>
        </li>`;
    }
    ulEl.innerHTML = list;
    attachDeleteButtonListeners();
}


function attachDeleteButtonListeners() {
    const deletebtnEl = document.getElementsByClassName('deletebtn');
    for (let i = 0; i < deletebtnEl.length; i++) {
        deletebtnEl[i].addEventListener('click', function() {
            deleteItem(i);
        });
    }
}

function deleteItem(index) {
    myLeads.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    display(myLeads);
}


saveEl.addEventListener('click', function() {
    const textbox = inputEl.value; 
    if (textbox) {
        myLeads.push(textbox);
        inputEl.value = '';
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        display(myLeads);
    } else {
        alert("Please enter a valid input!");
    }
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




deleteEl.addEventListener('click', function() {
    if (confirm("Are you sure you want to delete all items?")) {
        localStorage.clear();
        myLeads = [];
        display(myLeads);
    }
});
