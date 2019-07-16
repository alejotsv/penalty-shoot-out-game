function doNot(){
  console.log(`don't`);
}

// Add goal background image
function drawBackground(ctx){
  let backgroundImg = new Image();
  backgroundImg.src = './img/background-goal.jpg';

  // Create canvas, set height and width
  backgroundImg.onload = () => {
    ctx.drawImage(backgroundImg, 0, 0, 800, 600);
  };
}



// Draw the penalty kick court
function drawBall(ctx,x,y) { 

  // Draw ball
  let ballImg = new Image();
  ballImg.src = './img/ball.png';

  ballImg.onload = () => {
    ctx.drawImage(ballImg, x, y, 80, 80);
  }

}

function drawTargets(ctx){
  // Draw targets
  let unselectedTarget = new Image();
  unselectedTarget.src = './img/target-unselected3.png';

  let selectedTarget = new Image();
  selectedTarget.src = './img/target-selected2.png';
  
  unselectedTarget.onload = setTimeout(() => {
    // Top targets
    ctx.drawImage(unselectedTarget, 100, 140, 50, 50);
    ctx.drawImage(unselectedTarget, 380, 140, 50, 50);
    ctx.drawImage(unselectedTarget, 660, 140, 50, 50);

    // Middle targets
    ctx.drawImage(unselectedTarget, 100, 225, 50, 50);
    ctx.drawImage(selectedTarget, 380, 225, 50, 50);
    ctx.drawImage(unselectedTarget, 660, 225, 50, 50);

    // Bottom targets
    ctx.drawImage(unselectedTarget, 100, 310, 50, 50);
    ctx.drawImage(unselectedTarget, 380, 310, 50, 50);
    ctx.drawImage(unselectedTarget, 660, 310, 50, 50);
  }, 50);
   
}


// Function to move ball to the selected target
function moveBall(ctx,finalX,finalY){
  let ballX = 365;
  let ballY = 500;  

  setTimeout(() => {
  
  
  for (let i = ballY; i > finalY; i--) {
    ctx.clearRect(0, 0 , 800, 600);
    drawBackground(ctx);
    drawBall(ctx,ballX,i);
    }
    
  },1500);  
  
}