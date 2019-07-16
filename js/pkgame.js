// Create the Game class that includes: background img, ball, targets, and methods

class Game {
  constructor(){
    this.background = {}; // background object
    this.ball = {}; // ball object
    this.targets = []; // array of targets
    this.goalkeeper = {}; // goalkeeper object
    this.userScore = 0;
    this.aiScore = 0;
  }
}

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 800;
    this.height = 600;
    this.img = './img/background-goal.jpg';
  }
  drawBackground(ctx) {
    const backgroundImg = new Image();
    backgroundImg.src = this.img;     
    backgroundImg.onload = () => {   
      ctx.drawImage(backgroundImg, this.x, this.y, this.width, this.height);
    }
  }
}