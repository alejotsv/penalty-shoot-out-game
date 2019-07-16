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
      
    });




});