status = "";
object_ti = "";
objects = [];


function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
   

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
    if(results=object_ti){
        utterThis=new SpeechSynthesisUtterance(object_ti+"Detected");
        synth.speak(utterThis);
    }

}
 
function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected : " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " ", + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            utterThis=new SpeechSynthesisUtterance();
            synth.speak(utterThis);
        }

    }
}


function start() {
    objectDetector = ml5.objectDetector('cocoSsd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_ti = document.getElementById("input1");
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
}