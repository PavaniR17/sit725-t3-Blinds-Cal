window.onload = alert(localStorage.getItem(material));
var materialStored = localStorage.getItem('material');

function startCalc() {
    interval = setInterval("calc()", 1);
}
function calc() {

    switch(materialStored){
        case "A": valueModifier = 0.015573
        break;
        case "B": valueModifier = 0.016120
        break;
        case "C": valueModifier = 0.023224
        break;
    }
    one = document.SumForm.firstBox.value;
    two = document.SumForm.secondBox.value;
    document.SumForm.result.value = ((one * two * valueModifier)/100).toFixed(2);
}
function stopCalc() {
    clearInterval(interval);
}