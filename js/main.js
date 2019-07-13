$( document ).ready(function() {
  let button = $('#start-game');
  
  function startGame() {
    let gameBoard = $('#board');
    gameBoard.append(`<canvas id='my-canvas' width='800' height='600' style="border:1px solid #000000;"></canvas>`);
    const myCanvas = document.getElementById("my-canvas");
    const ctx = myCanvas.getContext("2d");
    
  }
  
  
  button.click( () => {
    startGame();
  });






});