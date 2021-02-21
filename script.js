const SKY_ITMES_H_COUNT = 15;
const SKY_ROW_ITEMS_COUNT = 10;
const START_PLAYER_POSITION_X = 4;
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

function

drawAir();

movePlayerPostion(player.x);

document.addEventListener('keydown', event => {
  if (event.keyCode === 65) { // A
    movePostion(player.x - 1);
  } else if (event.keyCode === 68) { // D
    movePostion(player.x + 1);
  }
});

