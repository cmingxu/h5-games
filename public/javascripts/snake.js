(function(window, $) {

  var Snake = Snake || {};
  Snake.running = false;
  Snake.tick_interval = 500;
  Snake.snake = {
    directions: ["L", "R", "U", "D"],
    current_direction: "R",
    body: null,
    reset: function (canvas) {
      Snake.snake.current_direction = Snake.snake.directions[Math.floor(Math.random(Snake.snake.directions.length))];
      switch (Snake.snake.current_direction) {
        case "L":
          y = Math.floor(Math.random(canvas._h_pix) * canvas._h_pix);
          Snake.snake.body = [
            {x: canvas._w_pix - 1, y: y},
            {x: canvas._w_pix,     y: y},
            {x: canvas._w_pix + 1, y: y},
            {x: canvas._w_pix + 2, y: y},
            {x: canvas._w_pix + 3, y: y},
            {x: canvas._w_pix + 4, y: y},
            {x: canvas._w_pix + 5, y: y},
            {x: canvas._w_pix + 6, y: y}
          ];
          break;
        case "R":
          y = Math.floor(Math.random(canvas._h_pix) * canvas._h_pix);
          Snake.snake.body = [
            {x: 0, y: y},
            {x:-1, y: y},
            {x:-2, y: y},
            {x:-3, y: y},
            {x:-4, y: y},
            {x:-5, y: y},
            {x:-6, y: y},
            {x:-7, y: y}
          ];
          break;
        case "U":
          x = Math.floor(Math.random(canvas._w_pix) * canvas._w_pix);
          Snake.snake.body = [
            {x: x, y: canvas._h_pix - 1},
            {x: x, y: canvas._h_pix},
            {x: x, y: canvas._h_pix + 1},
            {x: x, y: canvas._h_pix + 2},
            {x: x, y: canvas._h_pix + 3},
            {x: x, y: canvas._h_pix + 4},
            {x: x, y: canvas._h_pix + 5},
            {x: x, y: canvas._h_pix + 6}
          ];
          break;
        case "D":
          x = Math.floor(Math.random(canvas._w_pix) * canvas._w_pix);
          Snake.snake.body = [
            {x: x, y:  0},
            {x: x, y: -1},
            {x: x, y: -2},
            {x: x, y: -3},
            {x: x, y: -4},
            {x: x, y: -5},
            {x: x, y: -6},
            {x: x, y: -7}
          ];
          break;
        default:
      }
    },
    move: function () {
      switch (Snake.snake.current_direction) {
        case "D":
          break;
        default:
      }
    }
  };
  Snake.food  = {
    x: 0,
    y: 0,
    reset: function (canvas) {
      Snake.food.x = Math.floor(Math.random(canvas._w_pix) * canvas._w_pix);
      Snake.food.y = Math.floor(Math.random(canvas._h_pix) * canvas._h_pix);
    }
  };
  Snake.canvas = {
    //size of each dot is 4X4
    pix: 10,
    snake_length: 8
  };

  Snake.init = function (canvas) {
    Snake.log.debug("Initing canvas");
    canvas_dom = Snake.canvas._canvas = $(canvas);
    Snake.canvas.ctx = Snake.canvas._canvas[0].getContext('2d');
    Snake.canvas._w = canvas_dom.width();
    Snake.canvas._h = canvas_dom.height();
    Snake.canvas._w_pix = Math.round(Snake.canvas._w / Snake.canvas.pix);
    Snake.canvas._h_pix = Math.round(Snake.canvas._h / Snake.canvas.pix);
  }

  Snake.start = function () {
    Snake.food.reset(Snake.canvas);
    Snake.snake.reset(Snake.canvas);
    setInterval(Snake.game_loop, Snake.tick_interval);
  }

  Snake.pause = function () {
    Snake.running = false;
  }

  Snake.resume = function () {
    Snake.running = true;
  }

  Snake.game_loop = function () {
    Snake.snake.move();
    Snake.draw_canvas();
  }

  Snake.draw_canvas = function () {
    //console.log(Snake.food);
    //console.log(Snake.snake);
    //console.log(Snake.canvas);
    Snake.canvas.ctx.fillStyle = "white";
    Snake.canvas.ctx.fillRect(0, 0, Snake.canvas._w, Snake.canvas._h);
    //Snake.paint_cell(Snake.food.x, Snake.food.y);
    for (var l = 0; l < Snake.snake.body.length; l ++) {
      x = Snake.snake.body[l].x;
      y = Snake.snake.body[l].y;
      Snake.paint_cell(x, y);
    }
  }

  Snake.paint_cell = function (x, y) {
    console.log(x + " " + y);
    //Snake.canvas.ctx.fillStyle = "blue";
    console.log(x * Snake.canvas.pix + " " + y * Snake.canvas.pix);
    Snake.canvas.ctx.fillStyle = "blue";
    Snake.canvas.ctx.fillRect(x * Snake.canvas.pix, y * Snake.canvas.pix, 20, 60);
  }


  Snake.log = { 
    debug: function (content) {
      console.log(content);
    },
    error: function (content) {
      console.log(content);
    }
  }

  $(window).keydown(function(e){
    if(Snake.running){
      var key = e.which;
      //We will add another clause to prevent reverse gear
      if(key == "37" && Snake.snake.current_direction != "R") Snake.snake.current_direction = "L";
      else if(key == "38" && Snake.snake.current_direction != "D") Snake.snake.current_direction = "U";
      else if(key == "39" && Snake.snake.current_direction != "L") Snake.snake.current_direction = "R";
      else if(key == "40" && Snake.snake.current_direction != "U") Snake.snake.current_direction = "D";
      Snake.log(Snake.snake.current_direction);
    }
    //The snake is now keyboard controllable
  });


  Snake.init("#game_canvas");
  Snake.start();
})(window, $);

