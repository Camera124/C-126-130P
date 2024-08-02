peter_pan = "";
harry_potter = "";
rightWristX = 0;
leftWristX = 0;
leftWrist_score = 0;
rightWrist_score = 0;

statu_1 = false;
statu_2 = false;

function preload(){
    harry_potter = loadSound("music.mp3");
    peter_pan = loadSound("music2.mp3");
    
}
function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(390, 150);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet is Initialized!')
}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX + " rightWristX = " + rightWristX);

        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;
        console.log(leftWrist_score);
        console.log(rightWrist_score);
        
    }
}
function draw(){
    image(video, 0, 0, 500, 400);
    fill(255,0,0);
    stroke(255,0,0);

    statu_1 = harry_potter.isPlaying();
    if(leftWrist_score > 0.2){
        circle(leftWristX,leftWristY,15);
        peter_pan.stop();

        if(!statu_1){
            harry_potter.play();
            document.getElementById("song").innerHTML = "Harry Potter - Playing";
        }
    }

    statu_2 = peter_pan.isPlaying();
    if(rightWrist_score > 0.2){
        circle(rightWristX,rightWristY,15);
        harry_potter.stop();

        if(!statu_2){
            peter_pan.play();
            document.getElementById("song").innerHTML = "Peter Pan - Playing";
        }
    }
}