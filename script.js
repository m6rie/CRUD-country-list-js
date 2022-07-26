// INSTALL SQL
// let mysql = require('mysql');

let selectedRow = null;
let countries; // will contain fetched data
const countriesList = document.getElementById("countries");
const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const dialingCode = document.getElementById("dialing-code");
const population = document.getElementById("population");
const language = document.getElementById("language");
const currency = document.getElementById("currency");
const region = document.getElementById("region");
const flag = document.querySelector("#flag img");
const submitButton = document.getElementById("submit-button")

countryName.addEventListener("change", function(e) {
  console.log(e.target.value);
  displayCountryInfo(e.target.value)
});

fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => initialize(data))
  .catch(error => console.log("Error", error));


function initialize(countriesData) {
  countries = countriesData.sort()
  let options = "";
  countries.forEach(country => options += `<option value="${country.name.common}">${country.name.common}</option>`);
  countryName.innerHTML = options;

  displayCountryInfo();
  console.log((countries[1].idd.root))
  console.log(countries[1].cca3)
}

function displayCountryInfo(countryByName) {
  const countryData = countries.find(country => country.name.common === countryByName);
  flag.src = countryData.flags.png
  flag.alt = `Flag of ${countryData.name.common}`
  capital.innerHTML = countryData.capital
  dialingCode.innerHTML = countryData.idd.root + countryData.idd.suffixes
  population.innerHTML = countryData.population.toLocaleString("en-US")
  language.innerHTML = (JSON.stringify(countryData.languages)).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').replaceAll(':', ': ').replaceAll(',', ', ')
  currency.innerHTML = (JSON.stringify(countryData.currencies)).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').replaceAll(':', ': ').replaceAll(',', ', ')
  region.innerHTML = countryData.region
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

  // try {
  //   if(localStorage.getItem("countryList") === null) {
  //     localStorage.setItem("countryList", JSON.stringify(array));
  //   } else {
  //     let storage = JSON.parse(localStorage.getItem("countryList"));
  //     storage.push(formData);
  //     // storage.push(array)
  //     localStorage.setItem("countryList", JSON.stringify(storage));
  //     console.log(storage);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
// }

submitButton.addEventListener("click", function(e) {
  console.log("clicked")
  insertNewRecord()
})

// retrieve the data
// function readNotFormData() {
  // const notFormData = {};
  // notFormData["order"] = document.getElementById("order").innerHTML;
  // notFormData["countryName"] = document.getElementById("countryName").value;
  // console.log(document.getElementById("countryName").value)
  // notFormData["flag"] = document.getElementById("flag").innerHTML;
  // notFormData["capital"] = document.getElementById("capital").innerHTML;
  // console.log(document.getElementById("capital").innerHTML)
  // notFormData["dialingCode"] = document.getElementById("dialing-code").innerHTML;
  // notFormData["population"] = document.getElementById("population").innerHTML;
  // notFormData["language"] = document.getElementById("language").innerHTML;
  // notFormData["currency"] = document.getElementById("currency").innerHTML;
  // notFormData["region"] = document.getElementById("region").innerHTML;
  // return notFormData;
// }

// Insert the data
function insertNewRecord(data) {
  const reg = new RegExp('[a-z]{3}')
  const reg2 = /[A-Z]{3}\D/
  const table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow(table.length);
  // const cell1 = newRow.insertCell(0);
        // cell1.innerHTML = data.order;
  const cell1 = newRow.insertCell(0);
        cell1.innerHTML = document.getElementById("countryName").value;
  const cell2 = newRow.insertCell(1);
        cell2.innerHTML = document.getElementById("flag").innerHTML;
  const cell3 = newRow.insertCell(2);
        cell3.innerHTML = document.getElementById("capital").innerHTML;
        console.log(document.getElementById("capital").innerHTML)
  const cell4 = newRow.insertCell(3);
        cell4.innerHTML = document.getElementById("dialing-code").innerHTML;
  const cell5 = newRow.insertCell(4);
        cell5.innerHTML = document.getElementById("population").innerHTML;
  const cell6 = newRow.insertCell(5);
        cell6.innerHTML = document.getElementById("language").innerHTML;
  const cell7 = newRow.insertCell(6);
        cell7.innerHTML = document.getElementById("currency").innerHTML;
  const cell8 = newRow.insertCell(7);
        cell8.innerHTML = document.getElementById("region").innerHTML;
  const cell9 = newRow.insertCell(8);
        cell9.innerHTML = `<button onClick="onDelete(this)"><i class="fa-solid fa-trash-can"></i></button>`;
        // cell9.innerHTML = `<button onClick="onEdit(this)"><i class="fa-solid fa-pen"></i></button> <button onClick="onDelete(this)"><i class="fa-solid fa-trash-can"></i></button>`;
}

// Edit the data
// function onEdit(td) {
//   selectedRow = td.parentElement.parentElement;
//   document.getElementById("order").value = selectedRow.cells[0].innerHTML;
//   document.getElementById("countryName").value = selectedRow.cells[1].innerHTML;
//   document.getElementById("flag").value = selectedRow.cells[2].innerHTML;
//   document.getElementById("capital").value = selectedRow.cells[3].innerHTML;
//   document.getElementById("dialing-code").value = selectedRow.cells[4].innerHTML;
//   document.getElementById("population").value = selectedRow.cells[5].innerHTML;
//   document.getElementById("language").value = selectedRow.cells[6].innerHTML;
//   document.getElementById("currency").value = selectedRow.cells[7].innerHTML;
//   document.getElementById("region").value = selectedRow.cells[8].innerHTML;
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
// }

// Delete the date
function onDelete(td) {
  if(confirm("Do you want to delete the record?")) {
    row = td.parentElement.parentElement;
    document.getElementById("storeList").deleteRow(row.rowIndex);
  }
  resetForm();
}

// Reset the data
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
}
