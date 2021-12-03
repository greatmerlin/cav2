import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GameElements.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.gameWidth = document.documentElement.clientWidth;
    this.gameHeight = document.documentElement.clientHeight;

    //TODO: save score to states and move them between components?
    this.player1Score = 0;
    this.player2Score = 0;

    //TODO: save and display the winner
    this.winner = "";

    this.isGameOver = false;
    this.monkey = false; //ai :)
    this.Width = this.gameWidth;
    this.Height = this.gameHeight;
    this.fps = 60;
    this.paddleWidth = this.Height > 800 ? 200 : 100;
    this.ballY = this.Height / 2;
    this.ballX = this.Width / 2;
    this.ballRadius = 6;
    this.ballSpeedY = 0;

    //TODO: change the value below to select a difficulty
    this.ballSpeedX = this.Height / props.difficulty;

    this.paddle1Y = this.Height / 2 - this.paddleWidth / 2;
    this.paddle2Y = this.Height / 2 - this.paddleWidth / 2;
    this.paddleSpeed = this.Height > 800 ? 9 : 6;

    console.log(props.difficulty);

  }
  componentDidMount() {
    this.btnRight.style.display = "none";
    this.butt2.style.display = "none";
    this.update();
  }

  reset = () => {
    this.ballY = this.Height / 2;
    this.ballX = this.Width / 2;
    this.ballSpeedX = -this.ballSpeedX;
    this.ballSpeedY = 0;
  };
  // draw everything on screen
  drawAll = (ctx) => {
    // screen
    ctx.fillStyle = "#661177";
    ctx.fillRect(0, 0, this.Width, this.Height);
    // middle dashed line
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([10]);
    ctx.beginPath();
    ctx.moveTo(this.Width / 2, 0);
    ctx.lineTo(this.Width / 2, this.Height);
    ctx.stroke();
    // score
    ctx.font = "30px Orbitron";
    ctx.fillStyle = "#888";
    ctx.fillText(this.player1Score, this.Width / 2 / 2, 100);
    ctx.fillText(this.player2Score, (this.Width / 2) * 1.5, 100);
    // 2 rects
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, this.paddle1Y, 10, this.paddleWidth);
    ctx.fillRect(this.Width - 10, this.paddle2Y, 10, this.paddleWidth);
    // ball
    ctx.beginPath();
    ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
    ctx.fill();
  };
  // move stuff begore drawing again
  moveAll = (keys) => {
    // ball movement
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;

    // horizontal
    if (this.ballX > this.Width || this.ballX < 0) {
      // right side collision
      if (
        this.ballX > this.Width / 2 &&
        this.ballY >= this.paddle2Y &&
        this.ballY <= this.paddle2Y + this.paddleWidth
      ) {
        this.ballSpeedX = -this.ballSpeedX;
        let deltaY = this.ballY - (this.paddle2Y + this.paddleWidth / 2);
        this.ballSpeedY = deltaY * 0.2;
      } else if (
        this.ballX < this.Width / 2 &&
        this.ballY >= this.paddle1Y &&
        this.ballY <= this.paddle1Y + this.paddleWidth
      ) {
        this.ballSpeedX = -this.ballSpeedX;
        let deltaY = this.ballY - (this.paddle1Y + this.paddleWidth / 2);
        this.ballSpeedY = deltaY * 0.2;
      } else {
        if (this.ballX < this.Width / 2) {
          this.player2Score++;
          if (this.player2Score === 11) {
            this.winner = "PLAYER2";
            this.isGameOver = true;
          }
        } else {
          this.player1Score++;
          if (this.player1Score === 11) {
            this.winner = "PLAYER1";
            this.isGameOver = true;
          }
        }
        this.reset();
      }
    } // vertical
    if (this.ballY > this.Height || this.ballY < 0) {
      this.ballSpeedY = -this.ballSpeedY;
    }
    // ai paddle movement, limits at canvas boundaries to make it more efficient
    if (!this.monkey) {
      if (
        this.ballY > this.paddle2Y + this.paddleWidth / 3 &&
        this.paddle2Y + this.paddleWidth < this.Height
      ) {
        this.paddle2Y += this.paddleSpeed;
      } else if (
        this.ballY < this.paddle2Y + this.paddleWidth / 3 &&
        this.paddle2Y > 0
      ) {
        this.paddle2Y -= this.paddleSpeed;
      }
    } else {
      if (
        keys.isPressed(40) &&
        this.paddle2Y + this.paddleWidth < this.Height
      ) {
        // DOWN
        this.paddle2Y += this.paddleSpeed;
      } else if (keys.isPressed(38) && this.paddle2Y > 0) {
        // UP
        this.paddle2Y -= this.paddleSpeed;
      }
    }
    // player1 paddle movement thanks to
    // http://blog.mailson.org/2013/02/simple-pong-game-using-html5-and-canvas
    // same limits as ai for efficiency
    if (keys.isPressed(83) && this.paddle1Y + this.paddleWidth < this.Height) {
      // DOWN
      this.paddle1Y += this.paddleSpeed;
    } else if (keys.isPressed(87) && this.paddle1Y > 0) {
      // UP
      this.paddle1Y -= this.paddleSpeed;
    }
  };
  // draw default if changing game type, else save last draw
  GameOver = (ctx) => {
    this.ballSpeedY = 0;
    this.paddle1Y = this.Height / 2 - this.paddleWidth / 2;
    this.paddle2Y = this.Height / 2 - this.paddleWidth / 2;
    this.player1Score = 0;
    this.player2Score = 0;
    ctx.textAlign = "center";
    if (this.winner !== "") {
      ctx.fillStyle = "#888";
      ctx.font = "36px Orbitron";
      ctx.fillText(this.winner + " WON!", this.Width / 2, 150);
    } else {
      this.ballY = this.Height / 2;
      this.ballX = this.Width / 2;
      this.drawAll(ctx);
      this.isGameOver = true;
    }
    ctx.font = "14px Roboto Mono";
    ctx.fillText("Click anywhere to start a new game.", this.Width / 2, 200);
    document.addEventListener("mousedown", () => {
      this.isGameOver = false;
      this.winner = "";
    });
  };

  update() {
    const ctx = this.canvas.getContext("2d");
    function KeyListener() {
      this.pressedKeys = [];
      this.keydown = (e) => {
        this.pressedKeys[e.keyCode] = true;
      };
      this.keyup = (e) => {
        this.pressedKeys[e.keyCode] = false;
      };
      document.addEventListener("keydown", this.keydown.bind(this));
      document.addEventListener("keyup", this.keyup.bind(this));
    }
    KeyListener.prototype.isPressed = function (key) {
      return this.pressedKeys[key] ? true : false;
    };
    KeyListener.prototype.addKeyPressListener = function (keyCode, callback) {
      document.addEventListener("keypress", (e) => {
        if (e.keyCode === keyCode) callback(e);
      });
    };
    const keys = new KeyListener();

    // trigger 2 this.monkeys
    this.butt1.addEventListener("click", () => {
      this.ballY = this.Height / 2;
      this.ballX = this.Width / 2;
      this.GameOver(ctx);
      this.monkey = true;
      this.butt1.style.display = "none";
      this.butt2.style.display = "initial";
      this.btnRight.style.display = "initial";
    });
    // trigger AI
    this.butt2.addEventListener("click", () => {
      this.GameOver(ctx);
      this.monkey = false;
      this.butt2.style.display = "none";
      this.butt1.style.display = "initial";
      this.btnRight.style.display = "none";
    });
    // to block automatic start
    this.GameOver(ctx);
    // default 60fps
    setInterval(() => {
      if (this.isGameOver === false) {
        this.moveAll(keys);
        this.drawAll(ctx);
      } else {
        this.GameOver(ctx);
      }
    }, 1000 / this.fps);
  }

  render() {
    return (
      <div>
        <canvas
          ref={(canvas) => {
            this.canvas = canvas;
          }}
          width={this.gameWidth}
          height={this.gameHeight}
          id="gameCanvas"
        />
        <div className="buttons buttonLeft">W</div>
        <div className="buttons buttonLeft" id="buttonS">
          S
        </div>
        <div
          ref={(element) => {
            this.btnRight = element;
          }}
          className="buttons buttonRight"
          id="buttonUp"
        >
          Up
        </div>
        <div
          ref={(element) => {
            this.btnRight = element;
          }}
          className="buttons buttonRight"
        >
          Down
        </div>
        <button
          ref={(butt1) => {
            this.butt1 = butt1;
          }}
          className="buttons"
          id="butt1"
        >
          vs Computer
        </button>
        <button
          ref={(butt2) => {
            this.butt2 = butt2;
          }}
          className="buttons"
          id="butt2"
        >
          2 Players
        </button>
        
        <Link to="/" ><button className="buttons" id="buttMenu">Back to Main Menu</button></Link>
      </div>
    );
  }
}

export default Game;
