// Create the Game class that includes: background img, ball, targets, and methods

class Game {
  constructor(){
    this.background = {}; // background object
    this.ball = {}; // ball object
    this.targets = []; // array of targets
    this.goalie = {}; // goalie object
    this.userScore = 0;
    this.aiScore = 0;
    this.userChances = 5;
    this.aiChances = 5;    
    this.win = false;
    this.lose = false;
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
    ctx.drawImage(backgroundImg, this.x, this.y, this.width, this.height);    
  }
}

class Ball {
  constructor() {
    this.x = 365;
    this.y = 500;
    this.width = 80;
    this.height = 80;
    this.img = './img/ball.png';
  }
  drawBall(ctx) {
    const ballImg = new Image();
    ballImg.src = this.img;
    ctx.drawImage(ballImg, this.x, this.y, this.width, this.height);    
  }
}

  class Target {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.imgS = './img/target-selected2.png';
      this.imgU = './img/target-unselected3.png';
      this.active = false;
    }
    drawTarget(ctx) {
      const targetImg = new Image();
      if (this.active === false){
        targetImg.src = this.imgU;
      } else {
        targetImg.src = this.imgS;
      }
      ctx.drawImage(targetImg, this.x, this.y, this.width, this.height);
    }
  }

  class Goalie {
    constructor() {
      this.x = 330;
      this.y = 200;
      this.width = 179;
      this.height = 205;
      this.img = './img/gk-idle.png';
      this.imgGoalLeft = './img/gk-goal-left.png';
      this.imgGoalRight = './img/gk-goal-right.png';
      this.imgGoalCenter = './img/gk-goal-center.png';
      this.imgSave0 = './img/gk-save-up-left.png';
      this.imgSave1 = './img/gk-save-up-center.png';
      this.imgSave2 = './img/gk-save-up-right.png';
      this.imgSave3 = './img/gk-save-middle-left.png';
      this.imgSave4 = './img/gk-save-center.png';
      this.imgSave5 = './img/gk-save-middle-right.png';
      this.imgSave6 = './img/gk-save-down-left.png';
      this.imgSave7 = './img/gk-save-down-center.png';
      this.imgSave8 = '../img/gk-save-down-right.png';
    }
    drawGoalie(ctx) {
      const goalieImg = new Image();
      goalieImg.src = this.img;
      ctx.drawImage(goalieImg, this.x, this.y, this.width, this.height);    
    }    
  }


