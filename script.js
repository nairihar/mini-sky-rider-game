const SKY_ITMES_H_COUNT = 20;
const SKY_ROW_ITEMS_COUNT = 10;
const START_PLAYER_POSITION_X = 4; // 5
const PLAYER_POSITION_Y = SKY_ITMES_H_COUNT - 1;

function createAir() {
  const air = [];

  for (let i = 1; i <= SKY_ITMES_H_COUNT; i++) {
    air.push(new Array(SKY_ROW_ITEMS_COUNT).fill(0));
  }

  return air;
}

const airMatrix = createAir();

function createSkyItem() {
  const item = document.createElement('div');
  item.className = 'cloud';
  return item;
}

function drawAir() {
  const airElement = document.getElementById('air');


  airMatrix.forEach(row => {
    const rowItem = document.createElement('div');
    rowItem.className = 'row';
    
    row.forEach(() => {
      const skyItem = createSkyItem();
      rowItem.appendChild(skyItem);
    });

    airElement.appendChild(rowItem);
  });
}

const player = {
  x: START_PLAYER_POSITION_X
};

function movePlayerPostion(x) {
  if (x < 0 || x > SKY_ROW_ITEMS_COUNT - 1) {
    return;
  }

  const rowElement = document.getElementsByClassName('row')[PLAYER_POSITION_Y];
  
  airMatrix[PLAYER_POSITION_Y][player.x] = 0;
  const oldCloudElement = rowElement.children[player.x];
  oldCloudElement.classList.remove('player');

  player.x = x;
  airMatrix[PLAYER_POSITION_Y][x] = 1;
  const cloudElement = rowElement.children[player.x];
  cloudElement.classList.add('cloud');
  cloudElement.classList.add('player');
};


drawAir();

movePlayerPostion(player.x);

document.addEventListener('keydown', event => {
  if (event.keyCode === 65) { // A
    movePlayerPostion(player.x - 1);
  } else if (event.keyCode === 68) { // D
    movePlayerPostion(player.x + 1);
  }
});

const enemies = [

];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEnemy() {
  let type = Math.random() > 0.5 ? 2 : 3;
  let enemyX = getRandomInt(0, SKY_ROW_ITEMS_COUNT - 1);
  let enemyY = 0;
  
  const rowElements = document.getElementsByClassName('row')[enemyY].children;
  const cloudElement = rowElements[enemyX];
  cloudElement.classList.add(`enemy-${type}`);

  enemies.push({
    type,
    x: enemyX,
    y: enemyY
  });
}

function moveEnemy(enemy) {
  const rowElements = document.getElementsByClassName('row')[enemy.y].children;
  const cloudElement = rowElements[enemy.x];
  cloudElement.classList.remove(`enemy-${enemy.type}`);

  if (enemy.y == SKY_ITMES_H_COUNT - 2 && enemy.x == player.x) {
    alert('Game over');
  }

  if(enemy.y < SKY_ITMES_H_COUNT-1) {
    enemy.y += 1;

    const nextRowElements = document.getElementsByClassName('row')[enemy.y].children;
    const nextCloudElement = nextRowElements[enemy.x];
    nextCloudElement.classList.add(`enemy-${enemy.type}`);
  }
}


setInterval(function() {
  enemies.forEach(moveEnemy);

  createEnemy()
}, 800);