var my_new_step = "just trying to simplify the code by comments";//writting my new step
console.log(my_new_step);//printing my new step on console
objects = [];//defining array
var status = ""; //using status to check wether program is started
var obj_name //contains object name
function preload() {
} //no additional file

function setup() {
    canvas = createCanvas(400, 430);//createing canvas
    canvas.position(480, 350);//positioning canvas
    video = createCapture(VIDEO);//starting webcam
    video.size(480, 430);//setting video size
    video.hide();//hiding extra component
}

function draw() {
    image(video, 0, 0, 480, 430);//displaying wecam view
    if(status != "") { //checking status
        objectDetector.detect(video, gotResults); //starting detection, getting parameters
        for(i = 0; i < objects.length; i++) {//setting for loop for fetching parameters
            document.getElementById("status").innerHTML = "Status: Objects detected";//displaying text on webpage

            fill("#ff0000");//setting background color
            percent = floor(objects[i].confidence * 100);//converting confidence in to percentage
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);//printing label and confidence on canvas
            noFill();//removing fill
            stroke("#ff0000");//adding border color
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);//printting rectange on parameters of results
            
            if(objects[i].label = obj_name) { //checking wether detected obj is the reqired obj
                video.stop();//stopping video
                objectDetector.detect(gotResults);//turning model off (including cocossd)
                document.getElementById("finding_status").innerHTML = "Mentioned object is found";//displaying text on webpage
                utterance = new SpeechSynthesisUtterance("object mentioned found");//turnig on speech also setting specific words to speak
                speechSynthesis.speak(utterance);//speaking the text
            } else {
                document.getElementById("finding_status").innerHTML = "Mentioned is not found yet";//else, displaying text on webpage to make in notice that obj isn't found and detection is sill in progress
            }   
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);//starting model
    document.getElementById("status").innerHTML = "Status: Detecting objects";//displaying text on webpage
    obj_name = document.getElementById("obj_name").value;//fetching name written by user
}

function modalLoaded() {
    console.log("Modal Loaded Successfully");//loading model meassage
    status = true;//status set true and now will be checked at line 16
}

function gotResults (error, results) {
    if(error) {//checking for error
        console.log(error);//displaying error on console
    }
    console.log(results);//displaying results on console
    objects = results;//stroing values of results in objects so that it can be used out of gotResults function
}