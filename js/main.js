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

      // create new background, store in currentGame, and draw background
      let currentBackground = new Background();
      currentGame.background = currentBackground;
            
      // create new ball, store in currentGame, and draw ball
      let currentBall = new Ball();
      currentGame.ball = currentBall;
      const ballImg = new Image();
      ballImg.src = currentBall.img;
      let ballX = currentBall.x;
      let ballY = currentBall.y;
      let ballW = currentBall.width;
      let ballH = currentBall.height;

      // create targets 1 to 9, store them in currentGame, and draw targets

      function drawGameTargets(ctx) {
        let x;
        let y = 140;
        let target;
        for (let ti = 0; ti < 3; ti++) {
          x = 100;
          for (let tj = 0; tj < 3; tj++){
            target = new Target(x, y, 50, 50);
            currentGame.targets.push(target);
            target.drawTarget(ctx);
            x += 280;
          }
          y += 85;          
        }
      }

     
      
      
      
      // Start game

      
      function startGame(){
        ctx.clearRect(0, 0, 800, 600);
        currentBackground.drawBackground(ctx);
        drawThisBall();
        ballY --;
        
        // drawGameTargets(ctx);        
        
        if(ballY>225){
          requestAnimationFrame(() => startGame());           
      } else {
        cancelAnimationFrame(startGame);
      }   
        
        
        }
        
        

        function drawThisBall(){
          ctx.drawImage(ballImg, ballX, ballY, ballW, ballH);
        }

        document.onkeypress = function(e){
          if (e.keyCode === 32){
            startGame();
        }
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