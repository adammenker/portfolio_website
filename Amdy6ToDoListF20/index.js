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
}
setMinDate();

function clearInput(){
    $("#title-input").val("");
    $("#type-input").val("type");
    $("#priority-input").val("3");
    $("#range-input").html(3);
    $("#date-input").val("");
}

// *********

let i = 1;
function addItemToList(){
    var ul = document.getElementById("to-do-list");
    var li = document.createElement("li");
    $(li).attr("id", `item-${i}`);
    li.className = "to-do-item";
    var div = document.createElement("div");

    var title = document.createElement("h6");
    var type = document.createElement("h6");
    var priority = document.createElement("h6");
    var date = document.createElement("h6");

    var titleVal = $("#title-input").val();
    if(titleVal === ""){
        alert("Please fill in a title");
        return;
    }
    var typeVal = $("#type-input").val();
    if(typeVal === null){
        alert("Please fill in a type");
        return;
    }
    var priorityVal = $("#priority-input").val();
    if(priorityVal === null){
        alert("Please fill in a priority");
        return;
    }
    var dateVal = $("#date-input").val();
    if(dateVal === ""){
        alert("Please fill in a date");
        return;
    }

    $(title).html(titleVal);
    div.appendChild(title);

    $(type).html(typeVal);
    div.appendChild(type);

    if(priorityVal === "0"){
        priorityVal = "low"
    } else if(priorityVal === "1"){
        priorityVal = "  *"
    } else if(priorityVal === "2"){
        priorityVal = "  **"
    } else if(priorityVal === "3"){
        priorityVal = " ***"
    } else if(priorityVal === "4"){
        priorityVal = " ****"
    } else if(priorityVal === "5"){
        priorityVal = "*****"
    }

    $(priority).html(priorityVal);
    div.appendChild(priority);

    $(date).html(dateVal);
    div.appendChild(date);

    var actionSpan = document.createElement("span");
    $(actionSpan).attr("class", "material-icons");
    $(actionSpan).attr("id", `item-span-close-${i}`);
    $(actionSpan).attr("onclick", "deleteItem(this.id)");
    $(actionSpan).html("close");
    div.appendChild(actionSpan);
    
    li.appendChild(div);
    ul.appendChild(li);
    clearInput();
    i++;
}

function deleteItem(id){
    let parentDivItem = document.getElementById(id).parentElement;
    parentDivItem.remove();
}

let mode = "light";
function switchColorFormat(){
    if(mode === "light"){
        mode = "dark";
        toggleDark();

    } else if(mode === "dark"){
        mode = "light";
        toggleLight();
    }
}

function toggleLight(){
    document.body.style.backgroundColor = "rgb(235, 233, 228)";
    document.body.style.color = "rgb(13, 18, 22)";
    document.getElementById("to-do-list-div").style.backgroundColor = "white";
    document.getElementById("projects-link").style.color = "rgb(60, 204, 72)";
    document.getElementById("toggle-color-format").style.backgroundColor = "rgb(13, 18, 22)";
    document.getElementById("toggle-color-format").style.color = "rgb(235, 233, 228)";
    // document.getElementsByClassName("material-icons")[0].style.color = "rgb(13, 18, 22)";
}
toggleLight();

function toggleDark(){
    document.getElementById("toggle-color-format").style.backgroundColor = "rgb(235, 233, 228)";
    document.body.style.color = "rgb(235, 233, 228)";
    document.getElementById("toggle-color-format").style.color = "rgb(13, 18, 22)";
    document.body.style.backgroundColor = "rgb(13, 18, 22)";
    document.getElementById("to-do-list-div").style.backgroundColor = "rgb(32, 36, 54)";
    document.getElementById("projects-link").style.color = "rgb(214, 106, 73)";
    // document.getElementsByClassName("material-icons")[0].style.color = "rgb(235, 233, 228)";
}

// https://www.w3schools.com/jsref/met_win_prompt.asp
function changeHeader(){
    var title = prompt("Enter a Custom Title", "Enter Your Title");

    if (title != null && title != "Enter Your Title") {
        document.getElementById("display-title").innerHTML = title;
    }
}

