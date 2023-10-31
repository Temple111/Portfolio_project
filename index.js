

myLeads = []

const saveEl = document.getElementById("save-btn")
const ulEl = document.getElementById("ul")
const inptEl = document.getElementById("input")
const savetabEl = document.getElementById("savetab-btn")
const deletebtnEl = document.getElementById("delete-btn")
let fromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if (fromLocalStorage) {
    myLeads = fromLocalStorage
    displayLeads(myLeads)
}


function displayLeads(leads) {
    let mylist = ''
    for (let i=0;i<leads.length;i++) {
        mylist += `<li>
        <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = mylist

}


saveEl.addEventListener('click', function() {
    let textbox = inptEl.value
    myLeads.push(textbox)
    inptEl.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    displayLeads(myLeads)

})
