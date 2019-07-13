$( document ).ready(function() {
  let button = $('#startGame');
  
  function startGame() {
    let gameBoard = $('#board');
    gameBoard.append(`<canvas id='myCanvas' width='500' height='640' style="border:1px solid #000000;"></canvas>`);
    let canvas = $('#myCanvas');    
    let ctx = canvas.getContext("2d");
    
  }
  
  
  button.click( () => {
    startGame();
  });






});