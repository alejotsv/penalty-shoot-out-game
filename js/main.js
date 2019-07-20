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
      // create new game
      let currentGame = new Game();

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
      
       // Function to send goalie to a random target
       function goalieTarget() {
         let goaliePosition = Math.floor(Math.random() * 9);
         return goaliePosition;
        }
      
      // Function to shoot the ball
      function shoot(){

        // Clear canvas, draw background and ball, and update ball Y, width, and height
        ctx.clearRect(0, 0, 800, 600);
        currentBackground.drawBackground(ctx);
        currentBall.drawBall(ctx);

        switch (selectedTarget){
          case 0:
            currentBall.x -= 8;
            currentBall.y -= 10;
            break;
          case 1:
            currentBall.y -= 10;
            break;
          case 2:
            currentBall.x += 8;
            currentBall.y -= 10;
            break;
          case 3:
            currentBall.x -= 11;
            currentBall.y -= 11;
            break;
          case 4:
            currentBall.y -= 11;
            break;
          case 5:
            currentBall.x += 11;
            currentBall.y -= 11;
            break;
          case 6:
            currentBall.x -= 14;
            currentBall.y -= 10;
            break;
          case 7:
            currentBall.y -= 10;
            break;
          case 8:
            currentBall.x += 14;
            currentBall.y -= 10;
            break;
        }
        
        
        if(currentBall.y > currentTargets[selectedTarget].y){
          requestAnimationFrame(() => shoot());           
        } else if (currentBall.y === currentTargets[selectedTarget].y) {
          let goaliePosition = goalieTarget();
          console.log(`Goalie is at ${goaliePosition} || Target is ${selectedTarget}`);
          if (goaliePosition === selectedTarget){            
            console.log('Stopped!');
          } else {
            console.log('Goaaaaaaaaaaaaaaaal');
          }

        } else {
            console.log(currentBall.y);    
            cancelAnimationFrame(shoot);
            ctx.clearRect(0, 0, 800, 600);
            currentBall.x = 365;
            currentBall.y = 500;
            currentBackground.drawBackground(ctx);
            currentBall.drawBall(ctx);
            currentTargets[selectedTarget].active = false;
            selectedTarget = 4;
            currentTargets[selectedTarget].active = true;
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
      
    

           
 
      



      


      


    }
  });

    
   

    



   



});