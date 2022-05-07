song1="";
song2="";

song1_status="";
song2_status="";

score_leftWrist= 0 ;
score_rightWrist= 0 ;

leftwrist_x = 0;
leftwrist_y = 0;

rightwrist_x = 0;
rightwrist_y = 0;

function preload()
{
    song1= loadSound("music.mp3");
    song2= loadSound("herworld.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet= ml5.poseNet(video, modelLoaded)
    posenet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log("PoseNet is Initialized!");
}

function gotPoses(results){
    if (results.length > 0){
        
        console.log(results);
        score_rightWrist = results[0].pose.keypoints[9].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist : " + score_leftWrist + "Score of Right Wrist : " + score_rightWrist);

        leftwrist_x = results[0].pose.leftWrist.x;
        leftwrist_y = results[0].pose.leftWrist.y;

        rightwrist_x = results[0].pose.rightWrist.x;
        rightwrist_y = results[0].pose.rightWrist.y;

        console.log("LeftWrist X : " + leftwrist_x + "  LeftWrist Y : " + leftwrist_y + "RightWrist X : " + rightwrist_x + "  RightWrist Y : " + rightwrist_y )

    }
}

function draw() {
   image(video ,0,0,600,500);
   
   fill("red");
   stroke("red");
   song1_status = song1.isPlaying();
   song2_status = song2.isPlaying();

   if(score_leftWrist > 0.2){
       circle(leftwrist_x,leftwrist_y,20);
       song2.stop();

       if(song1_status == false){
           song1.play();
           document.getElementById("song").innerHTML = "Playing Harry Potter Theme Song";
       }
   }

   if(score_rightWrist > 0.2){
    circle(rightwrist_x,rightwrist_y,20);
    song1.stop();

    if(song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "Playing Her World Song";
    }
}

}

function play()
{
    song.play();
}