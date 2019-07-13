$( document ).ready(function() {
  let button = $('#start-game');
  
  function startGame() {
    let gameBoard = $('#board');
    gameBoard.append(`<canvas id='my-canvas' width='800' height='600' style="border:1px solid #000000;"></canvas>`);
    const myCanvas = document.getElementById("my-canvas");
    const ctx = myCanvas.getContext("2d");
    // Create canvas, set height and width

    // Add goal background image
    let backgroundImg = new Image();
    backgroundImg.src = './img/background-goal.jpg';

    backgroundImg.onload = () => {
      ctx.drawImage(backgroundImg, 0, 0, 800, 600);
    };

    if (!button.hasClass('started')){
      button.addClass('started');
    };

    // Draw ball
    let ballImg = new Image();
    ballImg.src = './img/ball.png';

    ballImg.onload = () => {
      ctx.drawImage(ballImg, 340, 500, 80, 80);
    }

    // Draw targets
    let unselectedTarget = new Image();
    unselectedTarget.src = './img/target-unselected.png';

    unselectedTarget.onload = () => {
      ctx.drawImage(unselectedTarget, 0, 0, 980, 982);
    };


  }
  
  
  
  button.click( () => {
    if (button.hasClass('started')){
      console.log(`don't`);
    } else {
      startGame();
    }
  });






});