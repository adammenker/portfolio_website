// variables:
let end = 0;

let sols;

let roverData;
let rovers;
let roversText = [];
let descriptions;
let descriptionsText = [];
let launchDates
let launchDatesText = [];
let activeRover;
let roverIndex;

let APIData;
let photosManifest;

let photosManifestArray = [];
let opportunityPhotosManifest;
let curiosityPhotosManifest;
let spirityPhotosManifest;
let activePhotosManifest;

let solData;
let cameras = [];
let activeCamera;
let solPhotos = [];
let currentPhoto = 0;

// functions:

function queryAPI(){
    sols = $("#sols").val();
    activeCamera = $("#cameras option:selected").text();
    currentPhoto = 0;
    if(sols != "" && activeCamera != ""){
        updatePhoto(sols, activeCamera, currentPhoto, activeRover);
        updateDescription();
        $("#errorMessage").css("display", "none");
    } else{
        $("#errorMessage").css("display", "block");
    }
}

function getAPIData(){
    $("#query-button").attr("onclick", "");
    $.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=0FeEtyEysrKIAYvnxQEOZnHxrpf5e7f81WKtjwir`, 
        {},
        function(data){
            APIData = data;
            curiosityPhotosManifest = APIData.photo_manifest.photos;
            photosManifestArray.push(curiosityPhotosManifest);
            $("#query-button").attr("onclick", "queryAPI()");
        });

    $.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=0FeEtyEysrKIAYvnxQEOZnHxrpf5e7f81WKtjwir`, 
        {},
        function(data){
            APIData = data;
            opportunityPhotosManifest = APIData.photo_manifest.photos;
            photosManifestArray.push(opportunityPhotosManifest);
            
            $("#query-button").attr("onclick", "queryAPI()");
        });

    $.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=0FeEtyEysrKIAYvnxQEOZnHxrpf5e7f81WKtjwir`, 
        {},
        function(data){
            APIData = data;
            spirityPhotosManifest = APIData.photo_manifest.photos;
            photosManifestArray.push(spirityPhotosManifest);

            $("#query-button").attr("onclick", "queryAPI()");
        });
    
    
    makeInitialRequestToNASAAPI();
}

function getRoverData(){
    $("#loading-text").css("display", "block");
    $.get("https://www.professorwergeles.com/webService.php?content=data&format=xml", 
        {},
        function(data){
            roverData = data;
            rovers = roverData.getElementsByTagName('name');
            descriptions = roverData.getElementsByTagName('description');
            launchDates = roverData.getElementsByTagName('launch_date');

            for(let i = 0; i < rovers.length; i++){
                roversText.push(rovers[i].innerHTML);
                descriptionsText.push(descriptions[i].innerHTML);
                launchDatesText.push(launchDates[i].innerHTML);
            }
            setRoverOptions();
            setActiveRover();
            updateDescription();
            $("#loading-text").css("display", "none");
        });
}

function getSolData(sol){
    // reference: https://stackoverflow.com/questions/41461762/get-value-from-key-value-array
    var entry = photosManifestArray[roverIndex].find(function(e) { return e.sol == `${sol}`; });
    console.log(photosManifestArray[roverIndex]);
    if (entry) {
        solData = entry;
        cameras = solData.cameras;
    } else{
        alert("Sorry, there are no photos for that Sol with that rover");
        end = 1;
    }
}

function getNumberOfSols(){
    $.ajax({
        url:'',
        type:'get',
        data:$('#myForm').serialize(),
        success:function(){
            sols = $("#sols").val();
            if(!Number.isInteger(parseInt(sols))){
                end = 1;
                $('#camera-option1').text("");
                $('#cameras').prop('disabled', true);
            } else{
                end = 0;
                getSolData(sols);
                clearCameraOptions();
                setCameraOptions(cameras);
                $('#cameras').prop('disabled', false);
            }
        }
    });
}

function updatePhoto(sol, camera, photo, rover){
    $("#loading-text").css("display", "block");
    if(end === 1) return;
    $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=0FeEtyEysrKIAYvnxQEOZnHxrpf5e7f81WKtjwir`, 
        {},
        function(data){
            if(data){
                solPhotos = data.photos; 
                if(solPhotos[photo].img_src){
                    $("#rover-image").attr("src", solPhotos[photo].img_src);
                    $("#loading-text").css("display", "none");
                } else{
                    alert("Sorry, no data for you input try something else");
                }
            } else{
                alert("Sorry, no data for you input try something else");
            }
        });
    
}

function navArrowClicked(direction){
    $("#loading-text").css("display", "block");
    if(direction === 1){
        currentPhoto++;
        if(currentPhoto == solPhotos.length){
            currentPhoto = 0;
        }
        $("#rover-image").attr("src", solPhotos[currentPhoto].img_src);
    }else if(direction === -1){
        currentPhoto--;
        if(currentPhoto < 0){
            currentPhoto = solPhotos.length - 1;
        }
        $("#rover-image").attr("src", solPhotos[currentPhoto].img_src);
    }
    $("#loading-text").css("display", "none");
}

function setCameraOptions(cameraOptions){
    if(end === 1) return;

    let i;
    for(i = 0; i < cameraOptions.length; i++){
        $(`#camera-option${i + 1}`).text(cameraOptions[i]);
    }
    for(i; i < 7; i++){
        if(i === 0){
            end = 1;
            alert("sorry there are no cameras avalable for that sol, try a different one");
        }
        $(`#camera-option${i + 1}`).prop('disabled', true);
    }
}

function clearCameraOptions(){
    for(i = 0; i < 7; i++){
        $(`#camera-option${i + 1}`).text("");
        $(`#camera-option${i + 1}`).prop('disabled', false);
    }
}

function setRoverOptions(){
    if(end === 1){
        return;
    }
    for(i = 0; i < roversText.length; i++){
        $(`#rover-option${i + 1}`).text(roversText[i]);
    }
}

function setActiveRover(){
    activeRover = $("#rovers option:selected").text();
    roverIndex = roversText.indexOf(`${activeRover}`);
}

function updateDescription(){
    $("#description__rover-name").text(roversText[roverIndex]);
    $("#description__description-text").text(descriptionsText[roverIndex]);
    $("#description__launch-date").text(launchDatesText[roverIndex]);
}

function makeInitialRequestToNASAAPI(){
    updatePhoto(1000, "CHEMCAM", 0, "curiosity");
    
    $("#sols").val(1000);

}

$('#sols-form').submit(function(e){
    e.preventDefault();
});

function checkSolNumber(){
    if(!Number.isInteger(parseInt(sols))){
        alert("You must input a valid number.");
        $("#sols").val("");
    }else if(sols != 8){
        alert("There are no images for this sol, please choose a different number");
        $("#sols").val("");
    }
}
