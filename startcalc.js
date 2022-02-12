window.onload = alert(localStorage.getItem(material));
var materialStored = localStorage.getItem('material');

function startCalc() {
    interval = setInterval("calc()", 1);
}
function calc() {
    //for testing
    //materialStored = "aluminium";

    //temporary material value (materialStored will likely need to be array object)
    switch(materialStored){
        case "matte":  valueModifier = 1.15
        break;
        case "aluminium": valueModifier = 0.875
        break;
        case "wood": valueModifier = 1.025
        break;
    }
    one = document.SumForm.firstBox.value;
    two = document.SumForm.secondBox.value;
    document.SumForm.result.value = (one * two * valueModifier).toFixed(2);
}
function stopCalc() {
    clearInterval(interval);
}