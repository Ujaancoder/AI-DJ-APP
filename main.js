song="";
leftWristX=0;
leftWristY=0;
rightWristY=0;;
rightWristX=0;
scoreLeftWrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#0000FF");
    stroke("#FFFFFF");
    if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
   InNumberleftWristY=Number(leftWristY);
   remove_decimals=floor(InNumberleftWristY);
   volume=remove_decimals/500;
   document.getElementById("volume").innerHTML="volume="+volume;
   song.setVolume(volume);
    }
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('Model is loaded');
}
function gotPoses(results){
   if(results.length>0){
   console.log(results);
   scoreLeftWrist=results[0].pose.keypoints[9].score;
   console.log("score left wrist="+scoreLeftWrist);
   leftWristX=results[0].pose.leftWrist.x;
   leftWristY=results[0].pose.leftWrist.y;
   rightWristX=results[0].pose.rightWrist.x;
   rightWristY=results[0].pose.rightWrist.y;
   console.log("left wrist x="+leftWristX);
   console.log("left wrist y="+leftWristY);
   console.log("right wrist x="+rightWristX);
   console.log("right wrist y="+rightWristY);
   }
}