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

      // create win and lose variables
      let win = currentGame.win;
      let lose = currentGame.lose;

      // target player and AI score HTML
      let playerScore = $('#player-score');
      let machineScore = $('#machine-score');

      // create variable to store user and ai scores
      let userScore = currentGame.userScore;
      let aiScore = currentGame.aiScore;

      // create variable to store shoot-out chances left (starting with 5)
      let userChances = currentGame.userChances;
      let aiChances = currentGame.aiChances;

      // create variable to store if game is over
      let gameOver = false;

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

      // create new goalie, store in currentGame, and draw goalie
      let currentGoalie = new Goalie();
      currentGame.goalie = currentGoalie;
      let goalieImg = new Image();
      goalieImg.src = currentGoalie.img;
      

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

        setTimeout (() => {            
          ctx.drawImage(goalieImg, currentGoalie.x, currentGoalie.y, currentGoalie.width, currentGoalie.height);             
        },15);        
      }

      // draw initial state of game
      drawEverything();

      // function to check if game is over and who won after user shoots
      function gameStatusUser() {
        // check status after last user shot
        if (userChances === 0){
          if (userScore > aiScore && userScore - aiScore > aiChances){
            win = true;
            gameOver = true;
          } else if (aiScore > userScore){
             lose = true;
             gameOver = true;
           } 
        }

        // check status after any other shot
        if (userChances > 0){
          // code during the first 4 shootouts
          if (userScore > aiScore && userScore - aiScore > aiChances){
            win = true;
            gameOver = true;
          } else if (aiScore > userScore && aiScore - userScore > userChances){
            lose = true;
            gameOver = true;
          }        
        }
        return gameOver;
      }

      // function to check if game is over and who won after AI shoots
      function gameStatusAI() {
        // check status after last AI shot
        if (aiChances === 0){
          if (userScore > aiScore){
            win = true;
            gameOver = true;
          } else if (aiScore > userScore){
             lose = true;
             gameOver = true;
           } else {
             userChances++;
             aiChances++;
             setTimeout (() => {            
              ;playerScore.html(``);
             },1500);
             setTimeout (() => {            
              ;machineScore.html(``);
             },1500);
             gameOver = false;
           }
        }

        // check status after any other shot
        if (aiChances > 0){
          // code during the first 4 shootouts
          if (userScore > aiScore && userScore - aiScore > aiChances){
            win = true;
            gameOver = true;
          } else if (aiScore > userScore && aiScore - userScore > userChances){
            lose = true;
            gameOver = true;
          }
        }
        return gameOver;
      }

      // function to continue playing while game is not over
      function continuePlaying() {
        ctx.clearRect(0, 0, 800, 600);
        currentBall.x = 365;
        currentBall.y = 500;
        currentBall.width = 80;
        currentBall.height = 80;
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
        currentGoalie.x = 330;
        currentGoalie.y = 200;
        currentGoalie.img = './img/gk-idle.png';
        setTimeout (() => {            
          currentGoalie.drawGoalie(ctx);
        },15);
      }
      
       // function to send goalie to a random target
      function goalieTarget() {
        let goaliePosition = Math.floor(Math.random() * 9);
        return goaliePosition;
        }

      // function to generate AI goal or miss
      function aiShoot(){
        aiChances--;
        let scores = false;
        let goal = Math.floor(Math.random() * 9);
        if (goal < 7) {
          scores = true;
        }
        return scores;
      }  
      

      // function to shoot the ball when the goalie stops the ball
      function shootStopped(){
        if (gameOver === false){
          // Clear canvas, draw background and ball, and update ball Y, width, and height
          ctx.clearRect(0, 0, 800, 600);
          currentBackground.drawBackground(ctx);
          currentBall.drawBall(ctx);
          currentGoalie.drawGoalie(ctx);       

          switch (selectedTarget){
            case 0:
              currentBall.x -= 8;
              currentBall.y -= 10;
              currentBall.width -= 0.8;
              currentBall.height -= 0.8;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 1:
              currentBall.y -= 10;
              currentBall.width -= 0.8;
              currentBall.height -= 0.8;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 2:
              currentBall.x += 8;
              currentBall.y -= 10;
              currentBall.width -= 0.8;
              currentBall.height -= 0.8;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 3:
              currentBall.x -= 11;
              currentBall.y -= 11;
              currentBall.width -= 0.9;
              currentBall.height -= 0.9;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              currentGoalie.img = './img/gk-save-middle-left.png';
              break;
            case 4:
              currentBall.y -= 11;
              currentBall.width -= 0.9;
              currentBall.height -= 0.9;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 5:
              currentBall.x += 11;
              currentBall.y -= 11;
              currentBall.width -= 0.9;
              currentBall.height -= 0.9;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 6:
              currentBall.x -= 14;
              currentBall.y -= 10;
              currentBall.width -= 1;
              currentBall.height -= 1;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 7:
              currentBall.y -= 10;
              currentBall.width -= 1;
              currentBall.height -= 1;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 8:
              currentBall.x += 14;
              currentBall.y -= 10;
              currentBall.width -= 1;
              currentBall.height -= 1;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
          }        
          
          
          if(currentBall.y > currentTargets[selectedTarget].y){
            if (currentBall.y > currentTargets[selectedTarget].y - 100){
              
            }
            requestAnimationFrame(() => shootStopped());              
          } else {           
            // use up one chance to shoot
            userChances--;

            // Notify that shoot was stopped and add red X to score
            alert('Stopped!');            
            playerScore.append(`<li><img src="./img/red-x.png" height='30px' width='30px' alt="missed"></li>`);

            cancelAnimationFrame(shootStopped);                          

            // check if game is over after Player shoots
            gameStatusUser();
            if (gameOver === true) {
              // Check winner
              if (win === true) {
                alert('Congratulations! You won!');
              } else {
                alert('The Mean Machine does it again! You lose!');
              }
            } else {
              // determine if the AI scores
              let aiGoal = aiShoot();
              if (aiGoal === true){
                machineScore.append(`<li><img src="./img/green-circle.png" height='30px' width='30px' alt="goal"></li>`);
                aiScore ++;              
              } else {
                machineScore.append(`<li><img src="./img/red-x.png" height='30px' width='30px' alt="missed"></li>`);
              }
            }

            // check if game is over after AI shoots      
            gameStatusAI();
            if (gameOver === false) {
              continuePlaying();
            } else {
              if (win === true) {
                alert('Congratulations! You won!');
              } else {
                alert('The Mean Machine does it again! You lose!');
              }
            }
          }                
        }
       }
      //  end function to shoot ball when the goalie stops the ball



      // function to shoot the ball when it is a goal
      function shootGoal(){
        if (gameOver === false){
          // Clear canvas, draw background and ball, and update ball Y, width, and height
          ctx.clearRect(0, 0, 800, 600);
          currentBackground.drawBackground(ctx);
          currentBall.drawBall(ctx);
          currentGoalie.drawGoalie(ctx);

          switch (selectedTarget){
            case 0:
              currentBall.x -= 8;
              currentBall.y -= 10;
              currentBall.width -= 1.2;
              currentBall.height -= 1.2;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 1:
              currentBall.y -= 10;
              currentBall.width -= 1.2;
              currentBall.height -= 1.2;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 2:
              currentBall.x += 8;
              currentBall.y -= 10;
              currentBall.width -= 1.2;
              currentBall.height -= 1.2;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 3:
              currentBall.x -= 11;
              currentBall.y -= 11;
              currentBall.width -= 1.5;
              currentBall.height -= 1.5;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 4:
              currentBall.y -= 11;
              currentBall.width -= 1.5;
              currentBall.height -= 1.5;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 5:
              currentBall.x += 11;
              currentBall.y -= 11;
              currentBall.width -= 1.5;
              currentBall.height -= 1.5;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 6:
              currentBall.x -= 14;
              currentBall.y -= 10;
              currentBall.width -= 1.6;
              currentBall.height -= 1.6;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 7:
              currentBall.y -= 10;
              currentBall.width -= 1.6;
              currentBall.height -= 1.6;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
            case 8:
              currentBall.x += 14;
              currentBall.y -= 10;
              currentBall.width -= 1.6;
              currentBall.height -= 1.6;
              currentGoalie.x = currentTargets[selectedTarget].x;
              currentGoalie.y = currentTargets[selectedTarget].y;
              break;
          }        
          
          
          if(currentBall.y > currentTargets[selectedTarget].y-20){
            requestAnimationFrame(() => shootGoal());                   
          } else {                    

            // use up one chance to shoot
            userChances--;

            
            alert('Goaaaaaaaaaaaaaaaal!');
            playerScore.append(`<li><img src="./img/green-circle.png" height='30px' width='30px' alt="goal"></li>`);            
            userScore ++;                    

            cancelAnimationFrame(shootGoal);

            // check if game is over after Player shoots
            gameStatusUser();
            if (gameOver === true) {
              // Check winner
              if (win === true) {
                alert('Congratulations! You won!');
              } else {
                alert('The Mean Machine does it again! You lose!');
              }
            } else {
              // determine if the AI scores
              let aiGoal = aiShoot();
              if (aiGoal === true){
                machineScore.append(`<li><img src="./img/green-circle.png" height='30px' width='30px' alt="goal"></li>`);
                aiScore ++;              
              } else {
                machineScore.append(`<li><img src="./img/red-x.png" height='30px' width='30px' alt="missed"></li>`);
              }
            }

            // check if game is over after AI shoots      
            gameStatusAI();
            if (gameOver === false) {
              continuePlaying();
            } else {
              if (win === true) {
                alert('Congratulations! You won!');
              } else {
                alert('The Mean Machine does it again! You lose!');
              }
            }
          }                
        }
       }

      //  end function to shoot ball when it is a goal


        
        
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
          // spacebar (shoot stopped or shoot goal)
          case 32:

            let goaliePosition = goalieTarget();
            if (goaliePosition === selectedTarget){          
              shootStopped();                         
            } else {
              shootGoal()            
            }            
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
          setTimeout (() => {            
            currentGoalie.drawGoalie(ctx);
          },20);
          currentTargets.forEach((target) => {            
            setTimeout (() => {            
              target.drawTarget(ctx);
            },20);
          });
        }
      
    

           
 
      



      


      


    }
  });

    
   

    



   



});



// this.score = './img/green-circle.png';
// this.miss = './img/red-x.png'