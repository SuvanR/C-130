sound = " ";

scoreleftwrist = 0;
scorerightwrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    sound = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet is Intialized");
}

function gotPoses(results){
    if(results.length > 0){
    console.log(results);
    scoreleftwrist = results[0].pose.keypoints[9].score;
    scorerightwrist = results[0].pose.keypoints[10].score;
    console.log("score leftwrist = "+scoreleftwrist+"score rightwrist = "+scorerightwrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left Wrist X = "+leftWristX+"left wrist y = "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWrsitY = results[0].pose.rightWrist.y+10;
    console.log("right wrist x = "+rightWristX+"right wrist y = "+rightWristY);
    }
}


function draw() {
    image(video, 0, 0, 600, 500);

    fill('#DC143C');
    stroke('#DC143C');

    if(scorerightwrist > 0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            sound.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            sound.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            sound.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            sound.rate(2);
        }
        else if(rightWristY >400){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            sound.rate(2.5)
        }
    }
    
    if(scoreleftwrist > 0.2){
    circle(leftWristX,leftWristY,20);
    InleftwristY = Number(leftWristY);
    remove_decimals = floor(leftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = "+volume;
    sound.setVolume(volume);
    }
}

function play() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}

