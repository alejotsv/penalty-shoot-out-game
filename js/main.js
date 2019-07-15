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

    // Draw ball
    let ballImg = new Image();
    ballImg.src = './img/ball.png';

    ballImg.onload = () => {
      ctx.drawImage(ballImg, 365, 500, 80, 80);
    }

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
    

    if (!button.hasClass('started')){
      button.addClass('started');
    };

  }
  
  
  
  button.click( () => {
    if (button.hasClass('started')){
      doNot();
    } else {
      startGame();
    }
  });






});