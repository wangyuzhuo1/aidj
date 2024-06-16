 scoreleftwrist = 0
 scorerightwrist = 0
 song="";
LeftwristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    Posenet = ml5.poseNet(video, modelloaded)
    Posenet.on('pose', gotPoses)
}

function modelloaded() {
console.log("Model has been loaded successfully.")
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("#FF0000")
    stroke("#FF0000")

    if(scoreleftwrist > 0.2){
    circle(LeftwristX, LeftWristY, 20)
    innumberleftwristy = Number(LeftWristY)
    remove_decimals = floor(innumberleftwristy)
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume=" + volume;
    song.setVolume(volume)
    }

    fill("#FF0000")
    stroke("#FF0000")
    circle(RightWristX, RightWristY, 20)

    if(scorerightwrist > 0.2){
        
        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5)
        }
        else if(RightWristY > 100 && RightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1.0x";
            song.rate(1)
        }
        else if(RightWristY > 200 && RightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5)
        }
        else if(RightWristY > 300 && RightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2.0x";
            song.rate(2)
        }
        else if(RightWristY > 400 && RightWristY <=500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5)
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = " + scorerightwrist + "Score Left Wrist = " + scoreleftwrist)

        LeftwristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("LeftwristX " + LeftwristX + "LeftwristY" + LeftWristY )

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightwristX" + RightWristX + "RightwristY" + RightWristY)
    }
}