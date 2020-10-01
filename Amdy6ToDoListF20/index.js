// https://stackoverflow.com/questions/10004723/html5-input-type-range-show-range-value
function updateTextInput(val) {
    $('#range-input').html(val);
}

// accomidating for browser imcompatibility
// https://stackoverflow.com/questions/35682138/html5-date-picker-doesnt-show-on-safari
var datefield = document.createElement("input")

datefield.setAttribute("type", "date")

if (datefield.type!="date"){ //if browser doesn't support input type="date", load files for jQuery UI Date Picker
    document.write('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />\n')
    document.write('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"><\/script>\n') 
}        
if (datefield.type != "date"){ //if browser doesn't support input type="date", initialize date picker widget:
    $(document).ready(function() {
        $('#date-input').datepicker();
    }); 
}

// if date is past today throw error

function checkDate(){
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
    let dateControl = document.querySelector('input[type="date"]');
    dateNumbers = dateControl.value.split("/");
    for(let i = 0; i < dateNumbers.length; i++){
        dateNumbers[i] = Number(dateNumbers[i]);
    }
    let today = new Date();
    let dd = Number(String(today.getDate()).padStart(2, '0'));
    let mm = Number(String(today.getMonth() + 1).padStart(2, '0')); 
    let yyyy = Number(today.getFullYear());

    let error = 0;
    if(yyyy > dateNumbers[2]){
        error = 1;
    }
    if(yyyy === dateNumbers[2] && mm > Number(dateNumbers[0])){
        error = 1;
    }
    if(yyyy === dateNumbers[2] && mm === dateNumbers[0] && dd > dateNumbers[1]){
        error = 1;
    }
    
    if(error === 1){
        alert("The date must be in the future");
        document.querySelector('input[type="date"]').value = `${mm}/${dd}/${yyyy}`;
    } 

    // today = yyyy+'-'+mm+'-'+dd;
    // document.getElementById("date-input").setAttribute("min", today);
}

function setMinDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
    if(mm<10){
        mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("date-input").setAttribute("min", today);
    console.log("adff")
}
setMinDate();

function clearInput(){
    console.log("fired");
    $("#title-input").value = "";
}
