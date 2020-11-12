function showHideButtons() {
    hideErrorMessage();
    let links = document.getElementsByClassName("function-link");
    for(item of links){
        let currentDisplay = window.getComputedStyle(item, null).getPropertyValue("display");
        if(currentDisplay == "none"){
            item.style.display = "block";
            $("#dropdown-links").css("display", "block");
            hideFunctionForms();
        } else{
            item.style.display = "none";
            $("#dropdown-links").css("display", "none");
        }
    }
    toggleCheckParagraphDisplay();
}

window.onclick = function(event) {
    if (!event.target.matches('#dropdown_button')) {
        let links = document.getElementsByClassName("function-link");
        $("#dropdown-links").css("display", "none");
        for(item of links){
            item.style.display = "none";
        }
    }
    toggleCheckParagraphDisplay();
}

function toggleCheckParagraphDisplay(){
    let check = 1;
    let forms = $(".function-form-container");
    let links = document.getElementsByClassName("function-link");
    if(window.getComputedStyle(links[0], null).getPropertyValue("display") == "block"){
        $("#playground-description").css("display", "none");
        check = 0;
    }
    for(item of forms){
        if(window.getComputedStyle(item, null).getPropertyValue("display") == "block"){
            $("#playground-description").css("display", "none");
            check = 0;
        }
    }
    if(check == 1){
        $("#playground-description").css("display", "block");
        $("#playground-description").css("opacity", "1");
        $("#playground-description").css("animation", "none");
    }
}

function hideFunctionForms(){
    $(".function-form-container").css("display", "none");
}

function displayName(){
    $("#display_name_container").css("display", "block");
}

function displayHammingNumber(){
    $("#display_hamming_number_container").css("display", "block");
}

function displayPasswordSimulation(){
    $("#display_password_simulation_container").css("display", "block");
}

function displayListCreator(){
    $("#display_list_creator_container").css("display", "block");
}

function displayCylinderSurfaceArea(){
    $("#display_cylinder_surface_area_container").css("display", "block");
}

function numberInTextBox(input){
    if(!(isNaN(input))){
        $(".submit-button").css("display", "none");
        $("#error-check-message").css("display", "block")
    }
}

function validateNameInput(){
    let firstName = $("#fname").val();
    let lastName = $("#lname").val();

    if(checkStringIsAllLetters(firstName) && checkStringIsAllLetters(lastName)){
        $("#error-name-validation").css("display", "none");
        return true;
    }
    $("#error-name-validation").css("display", "block");
    return false;
}

function checkStringIsAllLetters(string){
    // checking if just spaces
    if(!(/^[a-zA-Z]+$/.test(string))){
        return false;
    }
    return true;
}

function validateListCreatorInput(){
    let username = $("#firstChar").val();
    let password = $("#secondChar").val();

    if(username.length != 1 || password.length != 1){
        $("#error-list-creator-validation").css("display", "block");
        return false;
    }
    $("#error-list-creator-validation").css("display", "none");
    return true;
}

function hideErrorMessage(){
    $(".error-popup").css("display", "none");
}

function clearInputsOnClick(){
    $("input").val("");
    $("input[type=submit]").val("Submit");
}