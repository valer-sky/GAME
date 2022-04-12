game.board = {
  game: game,
  size: 15,
  cells: [],
  create() {
    this.createCells();
  },
  createCells() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
    console.log('cells', this.cells);
  },
  createCell(row, col) {
    const cellSize = this.game.sprites.cell.width + 1;
    const offsetX = (this.game.width - cellSize * this.size) / 2;
    const offsetY = (this.game.height - cellSize * this.size) / 2;
    return {
      row: row,
      col: col,
      x: offsetX + cellSize * col,
      y: offsetY + cellSize * row,
    };
  },
  createFood() {
    this.createCellObject('food');
  },
  getRandomAvailableCell() {
    const pool = this.cells.filter((cell) => {
      return !cell.type && !this.game.snake.hasCell(cell);
    });

    const index = this.random(0, pool.length - 1);

    return pool[index];
  },
  createBomb(){
    this.createCellObject('bomb');
  },
  createCellObject(type) {
    let cell = this.cells.find((cell) => {
      return cell.type === type;
    });

    if (cell) {
      cell.type = null;
    }

    cell = this.getRandomAvailableCell();

    cell.type = type;

    console.log('aaaaaaaaaaaaaaaaaaaaa',cell);
   },

  
  isBombCell(cell) {
    return cell.type === 'bomb';
  },

  isFoodCell(cell) {
    return cell.type === 'food';
  },



  getCell(row, col){
    return this.cells.find((cell) => {
      return cell.row === row && cell.col === col;
    });
  },
  random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
      if (cell.type) {
        this.game.ctx.drawImage(this.game.sprites[cell.type], cell.x, cell.y);
      }
    });
  }
};
