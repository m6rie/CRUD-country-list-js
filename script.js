const selectedRow = null;

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
