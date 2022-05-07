let myLeads = [];
const inputEl = document.getElementById("input-el"); // const is also used to intialize a variable
const inputBtn = document.getElementById("input-btn"); // const is different because you cannot reassign a variable
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear(); //clearing out local storage in application in inspect source
  myLeads = []; // emptying the leads
  renderLeads(); // now the myleads are empty so render will print nothing
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value); // .value helps in inputting the value from that input-el id by user
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads();
});

function renderLeads() {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
      <li>
          <a target = '_blank' href ='${myLeads[i]}'>
              ${myLeads[i]}
          </a>  
      </li> `; // template string to make it look like html code in easy terms
    // inner.HTML helps to use html tags in javascript instead of text.Content
  }
  ulEl.innerHTML = listItems; // it is DOM manipulation
}
