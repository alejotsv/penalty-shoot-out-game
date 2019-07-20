$( document ).ready(function() {
  let button = $('#start-game');
  let gameBoard = $('#board');
  gameBoard.append(`<canvas id='my-canvas' width='800' height='600' style="border:1px solid #000000;"></canvas>`);
  const myCanvas = document.getElementById("my-canvas");
  const ctx = myCanvas.getContext("2d");

  function startGame(){  
  // Set class to prevent further canvas to be created
    if (!button.hasClass('started')){
      button.addClass('started');      
    };    
  }
    
  button.click( () => {
    if (button.hasClass('started')){
      doNot();
    } else {
      startGame();
      drawBackground(ctx);
      drawBall(ctx,365,500);
      drawTargets(ctx);
      moveBall(ctx,365,225);   
    }
  });


    let testButton = $(`#second-js`);
    let currentGame;

    



    testButton.click( () => {

      // create new game
      currentGame = new Game();

      // create new background and store in currentGame
      let currentBackground = new Background();
      currentGame.background = currentBackground;
      const backgroundImg = new Image();
      backgroundImg.src = currentBackground.img;
            
      // create new ball, store in currentGame, and draw ball
      let currentBall = new Ball();
      currentGame.ball = currentBall;
      const ballImg = new Image();
      ballImg.src = currentBall.img;
      

      // create targets 1 to 9, store them in currentGame, and draw targets

      function createTargets() {
        let x;
        let y = 140;
        let target;
        for (let ti = 0; ti < 3; ti++) {
          x = 100;
          for (let tj = 0; tj < 3; tj++){
            target = new Target(x, y, 50, 50);
            currentGame.targets.push(target);            
            x += 280;
          }
          y += 85;          
        }
      }   
      
      createTargets();

      let currentTargets = currentGame.targets;
      
      // Set center target as selected
      let selectedTarget = 4;
      currentTargets[selectedTarget].active = true;
      
      
      
      // Start game

      // Function to draw background, ball, and targets
      function drawEverything() {
        backgroundImg.onload = () => {
          ctx.drawImage(backgroundImg, currentBackground.x, currentBackground.y, currentBackground.width, currentBackground.height);
        }
        ballImg.onload = () => {
          ctx.drawImage(ballImg, currentBall.x, currentBall.y, currentBall.width, currentBall.height);
        }

        currentTargets.forEach((target) => {
          let targetImg = new Image();
          if (target.active === false) {
            targetImg.src = target.imgU;
          } else {
            targetImg.src = target.imgS;
          }
          setTimeout (() => {            
            ctx.drawImage(targetImg, target.x, target.y, target.width, target.height);             
          },15);
        });
        
      }

      // Draw initial state of game
      drawEverything();      
      
      // Function to shoot the ball
      function shoot(){
        // Clear canvas, draw background and ball, and update ball Y, width, and height
        ctx.clearRect(0, 0, 800, 600);
        currentBackground.drawBackground(ctx);
        currentBall.drawBall(ctx);
        currentBall.y --;      
              
        
        if(currentBall.y>225){
          requestAnimationFrame(() => shoot());           
        } else {        
          cancelAnimationFrame(shoot);
          ctx.clearRect(0, 0, 800, 600);
          currentBall.y = 500;
          currentBackground.drawBackground(ctx);
          currentBall.drawBall(ctx);
          currentTargets.forEach((target) => {            
            setTimeout (() => {            
              target.drawTarget(ctx);
            },15);
          });
        }          
       }
        
        
      //  Look for selected target in the currentTargets array
      function findSelectedTarget() {
        for (let i = 0; i < currentTargets.length; i++){
         if (currentTargets[i].active === true){
           selectedTarget = i;
         }
        }         
        return selectedTarget;
      }

       
      // document.onkeypress = function(e){
      //   if (e.keyCode === 32){
      //     shoot();
      //   }
      // }

      document.onkeydown = function(e){
        switch(e.keyCode){
          // spacebar (shoot)
          case 32:
            shoot();
            break;

          // left
          case 37:
            if (selectedTarget !== 0 && selectedTarget !== 3 && selectedTarget !== 6){
             currentTargets[selectedTarget].active = false;
             selectedTarget--; 
            }
            break;

          // up
          case 38:
            if (selectedTarget > 2){
              currentTargets[selectedTarget].active = false;
              selectedTarget -= 3;
            }
            break;

          // right
          case 39:
             if (selectedTarget !== 2 && selectedTarget !== 5 && selectedTarget !== 8){
              currentTargets[selectedTarget].active = false;
              selectedTarget++; 
             }
             break;

          // down
          case 40:
            if (selectedTarget < 6){
              currentTargets[selectedTarget].active = false;
              selectedTarget += 3;              
            }
            break;
          }
          currentTargets[selectedTarget].active = true;
          ctx.clearRect(0, 0, 800, 600);
          currentBall.y = 500;
          currentBackground.drawBackground(ctx);
          currentBall.drawBall(ctx);
          currentTargets.forEach((target) => {            
            setTimeout (() => {            
              target.drawTarget(ctx);
            },20);
          });
        }

      
      
    

           
 
      



      
      // move ball test
      function moveThisBall(){
        let theTarget = currentGame.targets[4];
        
        currentBackground.drawBackground(ctx);
        currentBall.drawBall(ctx);
        theTarget.drawTarget(ctx);
        currentBall.y -= 5;
        currentBall.height -= 0.6;
        currentBall.width -= 0.6;
        if (currentBall.y === theTarget.y){
          cancelAnimationFrame(requestAnimationFrame(moveThisBall));
        } else {
          requestAnimationFrame(moveThisBall);              
        }
      }
      // moveThisBall();

      


    });




});