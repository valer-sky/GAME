const game = {
  canvas: null,
  ctx: null,
  board: null,
  width: 0,
  height: 0,
  score: 0,
  dimensions: {
    max: {
      width: 640,
      height: 360
    },
    min: {
      width: 300,
      height: 300,
    }
  },
  sprites: {
    background: null,
    cell: null,
    head: null,
    body: null,
    food: null,
    bomb: null
  },
  start() {
    this.init();

    this.preload(() => {
      this.run();
    });
  },
  init() {
    this.canvas = document.getElementById('mycanvas');
    this.ctx = this.canvas.getContext('2d');
    this.initDimensions();
    this.setTextFont();
  },
  setTextFont() {
    this.ctx.font = '20px Cactus';
    this.ctx.fillStyle = '#304251';
  },
  initDimensions() {
    const data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight
    };

    if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
      this.fitWidth(data);
    } else {
      this.fitHeight(data)
    }

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },
  fitWidth(data) {
    this.height = Math.round(data.maxWidth * data.realHeight / data.realWidth);
    this.height = Math.min(this.height, data.maxHeight);
    this.height = Math.max(this.height, data.minHeight);
    this.width = Math.round(data.realWidth * this.height / data.realHeight);
    this.canvas.style.height = '100%';
  },
  fitHeight(data) {
    this.width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
    this.width = Math.min(this.width, data.maxWidth);
    this.width = Math.max(this.width, data.minWidth);
    this.height = Math.round(this.width * data.realHeight / data.realWidth);
    this.canvas.style.height = '100%';
  },
  preload(callback) {
    let loaded = 0;
    const required = Object.keys(this.sprites).length;

    const onAssetLoad = () => {
      ++loaded;
      console.log( loaded);
      if (loaded >= required) {
        callback();
      }
    };

    this.preloadSprites(onAssetLoad);
  },
  preloadSprites(onAssetLoadCallback) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = 'img/' + key + '.png';
      this.sprites[key].addEventListener('load', onAssetLoadCallback);
    }
  },
  run() {
    console.log('запуск игры');
    this.create();

    this.gameInterval = setInterval(() => {
      this.update();
    }, 500);

    this.bombInerval  = setInterval(() => {
      if(this.snake.moving) {
        this.board.createBomb();
      }
    }, 3000);
  },
  create() {
    // создаём элементы - работа с данными
    this.board.create();
    this.snake.create();
    this.board.createFood();
    this.board.createBomb();

    // установить игровые события
    window.addEventListener('keydown', (event) => {
      this.snake.start(event.keyCode);
    });
  },
  update() {
    // перемещение элементов
    this.snake.move();
    // отрисовка нового кадра
    this.render();
  },
  render() {
    // обновление canvas
    // - background
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.sprites.background, 0, 0);
      this.board.render();
      this.snake.render();
      this.ctx.fillText('Score: ' + this.score, 30, 30);
    });
  },
  stop() {
    var audio = new Audio('sounds/bomb.mp3');
    audio.play();
    clearInterval(this.gameInterval);
    clearInterval(this.bombInerval);
    // alert('Game over');

  },

onSnakeEat() {
  var audio = new Audio('sounds/food.mp3');
  audio.play();
  ++this.score;
  this.board.createFood();
},
};

// function () {} --- () => {}
window.addEventListener('load', () => {
  game.start();
});


