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
      currentBackground.drawBackground(ctx); 
      
      // create new ball, store in currentGame, and draw ball
      let currentBall = new Ball();
      currentGame.ball = currentBall;
      currentBall.drawBall(ctx);

      // create targets 1 to 9, store them in currentGame, and draw targets

      let target1 = new Target(100, 140, 50, 50);
      currentGame.targets.push(target1);
      target1.drawTarget(ctx);

      let target2 = new Target(380, 140, 50, 50);
      currentGame.targets.push(target2);
      target2.drawTarget(ctx);

      let target3 = new Target(660, 140, 50, 50);
      currentGame.targets.push(target3);
      target3.drawTarget(ctx);

      let target4 = new Target(100, 225, 50, 50);
      currentGame.targets.push(target4);
      target4.drawTarget(ctx);

      let target5 = new Target(380, 225, 50, 50);
      currentGame.targets.push(target5);
      target5.drawTarget(ctx);

      let target6 = new Target(660, 225, 50, 50);
      currentGame.targets.push(target6);
      target6.drawTarget(ctx);

      let target7 = new Target(100, 310, 50, 50);
      currentGame.targets.push(target7);
      target7.drawTarget(ctx);

      let target8 = new Target(380, 310, 50, 50);
      currentGame.targets.push(target8);
      target8.drawTarget(ctx);

      let target9 = new Target(660, 310, 50, 50);
      currentGame.targets.push(target9);
      target9.drawTarget(ctx);

      // move ball test
      function moveThisBall(){
        currentBackground.drawBackground(ctx);
        currentBall.drawBall(ctx);
        currentBall.y--;
        if (currentBall.y === 225){
          cancelAnimationFrame(requestAnimationFrame(moveThisBall));
        } else {
          requestAnimationFrame(moveThisBall);
      
        }
      }
      moveThisBall();
    });




});