var materialStored = localStorage.getItem('material');

function setMaterial(selectedMaterial) {
  localStorage.setItem('material', selectedMaterial);
  materialStored = localStorage.getItem('material');
  window.location = "calculator.html";
  //For testing purposes
  //alert("set value as: " + materialStored);
  //console.log("set value as " + materialStored);
}


function getMaterial() {
  //For testing purposes
  //alert("material set as: " + materialStored);
  //console.log("material set as: " + materialStored); 

  document.getElementById("materialStored").innerHTML = materialStored;
}

function resetMaterial() {
  materialStored = null;
  localStorage.clear();
  localStorage.removeItem('material');
}

function displayMasterial() {
  let text = capitalize(materialStored) + " blinds";
  document.getElementById("displayMaterial").innerHTML = text;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
}
