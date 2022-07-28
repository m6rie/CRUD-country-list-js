// SQL or local storage
// let mysql = require('mysql');
// sort by categories
// update Notes
// drag and drop rows
// Regex Languages and Currencies

let selectedRow = null;
let countries; // will contain fetched data
const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const dialingCode = document.getElementById("dialing-code");
const population = document.getElementById("population");
const language = document.getElementById("language");
const currency = document.getElementById("currency");
const region = document.getElementById("region");
const flag = document.querySelector("#flag img");
const submitButton = document.getElementById("submit-button")
const tableHead = document.getElementById("table-head")
const note = document.getElementById("note")
let noteInput = document.createElement("input")

// EVENT LISTENERS
countryName.addEventListener("change", function(e) {
  console.log(e.target.value);
  displayCountryInfo(e.target.value)
  noteInput.value = ""
});

submitButton.addEventListener("click", function(e) {
  // createTable()
  insertNewRecord()
  function singleCall(fn) {
    let called = false
    return function() {
      if(!called) {
        // called = true
        // return fn()
        return createTable()
      }
      // return
    }
  }
  createTable = singleCall(createTable())
})

// API
fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => initialize(data))
  .catch(error => console.log("Error", error));

function initialize(countriesData) {
  countries = countriesData.sort()
  let options = `<option value="" disabled selected hidden>Select a country</option>`;
  countries.forEach(country => options += `<option value="${country.name.common}">${country.name.common}</option>`);
  countryName.innerHTML = options;
}

// CREATE TITLES FOR THE INFO CONTAINER
function createTitleForDisplayFunction() {
  const capitalTitle = document.getElementById("capital-title")
  const dialingCodeTitle = document.getElementById("dialing-code-title")
  const populationTitle = document.getElementById("population-title")
  const languageTitle = document.getElementById("language-title")
  const currencyTitle = document.getElementById("currency-title")
  const regionTitle = document.getElementById("region-title")
  const noteTitle = document.getElementById("note-title")

  capitalTitle.innerHTML = `Capital:`
  dialingCodeTitle.innerHTML = `Dialing Code:`
  populationTitle.innerHTML = `Population:`
  languageTitle.innerHTML = `Language:`
  currencyTitle.innerHTML = `Currency:`
  regionTitle.innerHTML = `Region:`
  noteTitle.innerHTML = `Note:`
  document.getElementById("note").appendChild(noteInput)
}

// FETCH DATA FROM THE API TO THE INFO CONTAINER
function displayCountryInfo(countryByName) {
  createTitleForDisplayFunction()
  const countryData = countries.find(country => country.name.common === countryByName);
  flag.src = countryData.flags.png
  flag.alt = `Flag of ${countryData.name.common}`
  capital.innerHTML = `${countryData.capital}`
  dialingCode.innerHTML = `${countryData.idd.root + countryData.idd.suffixes}`
  dialingCode.innerHTML = `${countryData.idd.root + countryData.idd.suffixes}`
  population.innerHTML = `${countryData.population.toLocaleString("en-US")}`
  language.innerHTML = `${(JSON.stringify(countryData.languages)).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').replaceAll(':', ': ').replaceAll(',', ', ')}`
  currency.innerHTML = `${(JSON.stringify(countryData.currencies)).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').replaceAll(':', ': ').replaceAll(',', ', ')}`
  region.innerHTML = `${countryData.region}`
}

// CREATE THE TABLE
function createTable() {
  const countryNameTable = document.createElement("th")
  const flagTable = document.createElement("th")
  const capitalTable = document.createElement("th")
  const dialingCodeTable = document.createElement("th")
  const populationTable = document.createElement("th")
  const languageTable = document.createElement("th")
  const currencyTable = document.createElement("th")
  const regionTable = document.createElement("th")
  const noteTable = document.createElement("th")

  countryNameTable.innerHTML = "Country Name"
  document.getElementById("table-head").appendChild(countryNameTable)
  flagTable.innerHTML = "Flag"
  document.getElementById("table-head").appendChild(flagTable)
  capitalTable.innerHTML = "Capital"
  document.getElementById("table-head").appendChild(capitalTable)
  dialingCodeTable.innerHTML = "Dialing Code"
  document.getElementById("table-head").appendChild(dialingCodeTable)
  populationTable.innerHTML = "Population"
  document.getElementById("table-head").appendChild(populationTable)
  languageTable.innerHTML = "Language"
  document.getElementById("table-head").appendChild(languageTable)
  currencyTable.innerHTML = "Currency"
  document.getElementById("table-head").appendChild(currencyTable)
  regionTable.innerHTML = "Region"
  document.getElementById("table-head").appendChild(regionTable)
  noteTable.innerHTML = "Notes"
  document.getElementById("table-head").appendChild(noteTable)
}

// INSERT THE DATA IN THE TABLE
function insertNewRecord(data) {
  const reg = new RegExp('[a-z]{3}')
  const reg2 = /[A-Z]{3}\D/
  const table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow(table.length);
  console.log(table)
  const cell1 = newRow.insertCell(0);
        cell1.innerHTML = document.getElementById("countryName").value;
  const cell2 = newRow.insertCell(1);
        cell2.innerHTML = document.getElementById("flag").innerHTML;
  const cell3 = newRow.insertCell(2);
        cell3.innerHTML = document.getElementById("capital").innerHTML;
        console.log(document.getElementById("capital").innerHTML)
  const cell4 = newRow.insertCell(3);
        cell4.innerHTML = document.getElementById("dialing-code").innerText;
  const cell5 = newRow.insertCell(4);
        cell5.innerHTML = document.getElementById("population").innerHTML;
  const cell6 = newRow.insertCell(5);
        cell6.innerHTML = document.getElementById("language").innerHTML;
  const cell7 = newRow.insertCell(6);
        cell7.innerHTML = document.getElementById("currency").innerHTML;
  const cell8 = newRow.insertCell(7);
        cell8.innerHTML = document.getElementById("region").innerHTML;
  const cell9 = newRow.insertCell(8);
        cell9.innerHTML = noteInput.value;
  const cell10 = newRow.insertCell(9);
        cell10.innerHTML = `<button onClick="onDelete(this)"><i class="fa-solid fa-trash-can"></i></button>`;
        // cell10.innerHTML = `<button onClick="onEdit(this)"><i class="fa-solid fa-pen"></i></button> <button onClick="onDelete(this)"><i class="fa-solid fa-trash-can"></i></button>`;
}

// DELETE THE DATA
function onDelete(td) {
  if(confirm("Do you want to delete the record?")) {
    row = td.parentElement.parentElement;
    document.getElementById("storeList").deleteRow(row.rowIndex);
  }
  resetForm();
}

// RESET THE DELETED ROW
function resetForm() {
  document.getElementById("order").value = "";
  document.getElementById("countryName").value = "";
  document.getElementById("flag").value = "";
  document.getElementById("capital").value = "";
  document.getElementById("dialing-code").value = "";
  document.getElementById("population").value = "";
  document.getElementById("language").value = "";
  document.getElementById("currency").value = "";
  document.getElementById("region").value = "";
  document.getElementById("note").value = "";
}

// function onFormSubmit(e) {
//   event.preventDefault();
//   const formData = readFormData();
//   if(selectedRow === null) {
//     insertNewRecord(formData);
//   } else {
//     updateRecord(formData);
//   }
//   resetForm();
// }

// Edit the data
// function onEdit(td) {
//   selectedRow = td.parentElement.parentElement;
  // document.getElementById("order").value = selectedRow.cells[0].innerHTML;
  // document.getElementById("countryName").value = selectedRow.cells[1].innerHTML;
  // document.getElementById("flag").value = selectedRow.cells[2].innerHTML;
  // document.getElementById("capital").value = selectedRow.cells[3].innerHTML;
  // document.getElementById("dialing-code").value = selectedRow.cells[4].innerHTML;
  // document.getElementById("population").value = selectedRow.cells[5].innerHTML;
  // document.getElementById("language").value = selectedRow.cells[6].innerHTML;
  // document.getElementById("currency").value = selectedRow.cells[7].innerHTML;
  // document.getElementById("region").value = selectedRow.cells[8].innerHTML;
//   document.getElementById("note").value = selectedRow.cells[9].innerHTML;
// }

// function updateRecord(formData) {
//   selectedRow.cells[0].innerHTML = formData.order;
//   selectedRow.cells[1].innerHTML = formData.countryName;
//   selectedRow.cells[2].innerHTML = formData.flag;
//   selectedRow.cells[3].innerHTML = formData.capital;
//   selectedRow.cells[4].innerHTML = formData.dialingCode;
//   selectedRow.cells[5].innerHTML = formData.population;
//   selectedRow.cells[6].innerHTML = formData.language;
//   selectedRow.cells[7].innerHTML = formData.currency;
//   selectedRow.cells[8].innerHTML = formData.region;
//   selectedRow.cells[9].innerHTML = formData.note;
//   console.log(formData.note)
//   console.log(note)
// }
