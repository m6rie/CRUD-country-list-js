const selectedRow = null;
let countries; // will contain fetched data
const countriesList = document.getElementById("countries");
const capital = document.getElementById("capital");
const dialingCode = document.getElementById("dialing-code");
const population = document.getElementById("population");
const language = document.getElementById("language");
const currency = document.getElementById("currency");
const region = document.getElementById("region");
// const flag = document.getElementById("flag-container");
const flag = document.querySelector("#flag-container img"); //.alt =`Flag of ${countriesData.name}`;

// console.log(window.name = "foo");
// console.log(1);
// fetch("https://restcountries.com/v3.1/all")
//   .then(function(response) {
//     console.log(response);
//     // console.log(2);
//     return response.json();
//   })
//   .then(function(data){
//     // console.log(3);
//     console.log(data);
//     // return resp.json(); resp is not defined
//     initialize(data);
//   })
//   // console.log(4);
//   .catch(function(error){
//     // alert("Error: " + error);
//     console.log("Error", + error)
//   });

// EVENT LISTENER
countriesList.addEventListener("change", function(e) {
  console.log(e.target.value);
  displayCountryInfo(e.target.value)
});

// countriesList.addEventListener("change", e => displayCountryInfo(e.target.value));

// countriesList.addEventListener("change", newCountrySelect);
// function newCountrySelect(e) {
//   displayCountryInfo(e.target.value);
// }


fetch("https://restcountries.com/v3.1/all")
  // .then((response) => {return response.json();} )
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => initialize(data))
  .catch(error => console.log("Error", error));

function initialize(countriesData) {
  countries = countriesData.sort()
  let options = "";
  // for(let i = 0; i < countries.length; i++) {
  //   options += `<option value="${countries[i].cca3}">${countries[i].name.common} (${countries[i].idd.root}${countries[i].idd.suffixes})</option>`;
  //   capital.innerHTML = `${countries[i].capital}`
  // }
  countries.forEach(country => options += `<option value="${country.cca3}">${country.name.common} (${country.idd.root}${country.idd.suffixes})</option>`);
  countriesList.innerHTML = options;
  // document.getElementById("countries").innerHTML = options;

  displayCountryInfo("AFG");
  // console.log('data: ' + options)
  console.log((countries[1].idd.root))
  console.log(countries[1].cca3)
}

function displayCountryInfo(countryByCca3) {
  const countryData = countries.find(country => country.cca3 === countryByCca3);
  console.log(countryData)
  flag.src = countryData.flags.png
  flag.alt = `Flag of ${countryData.name.common}`
  capital.innerHTML = countryData.capital
  dialingCode.innerHTML = countryData.idd.root + countryData.idd.suffixes
  population.innerHTML = countryData.population.toLocaleString("en-US")
  // language.innerHTML = countryData.languages
  language.innerHTML = (JSON.stringify(countryData.languages)).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').replaceAll(':', ': ').replaceAll(',', ', ')
  // currency.innerHTML = countryData.currencies.map(c => `${c.name} ${c.symbol}`)
  currency.innerHTML = (JSON.stringify(countryData.currencies)).replaceAll('"', '').replaceAll('{', '').replaceAll('}', '').replaceAll(':', ': ').replaceAll(',', ', ')
  region.innerHTML = countryData.region
  // for(let key in currency) {
  //   console.log(currency[key.length -1])
  // }
  console.log(JSON.stringify(countries[1].currencies))
    console.log((JSON.stringify(countries[1].languages)).replaceAll('"', '').replace('{', '').replace('}', '').replace(':', ' : '))

  console.log(countries[1].languages)
  // flag.innerHTML = `<img src="${countryData.flags.png}" alt="">`

}

function onFormSubmit(e) {
  event.preventDefault();
  const formData = readFormData();
  if(selectedRow === null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}

// retrieve the data
function readFormData() {
  const formData = {};
  formData["order"] = document.getElementById("order").value;
  formData["countryName"] = document.getElementById("countryName").value;
  formData["alphaCode"] = document.getElementById("alphaCode").value;
  formData["phoneCode"] = document.getElementById("phoneCode").value;
  formData["continent"] = document.getElementById("continent").value;
  return formData;
}

// Insert the data
function insertNewRecord(data) {
  const table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow(table.length);
  const cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.order;
  const cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.countryName;
  const cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.alphaCode;
  const cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.phoneCode;
  const cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.continent;
  const cell6 = newRow.insertCell(5);
        cell6.innerHTML = `<button onClick="onEdit(this)"><i class="fa-solid fa-pen"></i></button> <button onClick="onDelete(this)"><i class="fa-solid fa-trash-can"></i></button>`;
}

// Edit the data
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("order").value = selectedRow.cells[0].innerHTML;
  document.getElementById("countryName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("alphaCode").value = selectedRow.cells[0].innerHTML;
  document.getElementById("phoneCode").value = selectedRow.cells[0].innerHTML;
  document.getElementById("continent").value = selectedRow.cells[0].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.order;
  selectedRow.cells[1].innerHTML = formData.countryName;
  selectedRow.cells[2].innerHTML = formData.alphaCode;
  selectedRow.cells[3].innerHTML = formData.phoneCode;
  selectedRow.cells[4].innerHTML = formData.continent;
}

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
  document.getElementById("alphaCode").value = "";
  document.getElementById("phoneCode").value = "";
  document.getElementById("continent").value = "";
}
