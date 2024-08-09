const statusDisplay = document.getElementById('gamestate');

// Puntos
let playerX_points = 0;
let playerO_points = 0;

const playerX_points_text = document.getElementById('PointsPlayerX');
const playerO_points_text = document.getElementById('PointsPlayerO');

//Juego
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""]; // Este array representa las celdas del juego

// Mensajes
const winningMessage = () => `El jugador ${currentPlayer} ha ganado`;
const drawMessage = () => 'Ha habido un empate';
const currentPlayerTurn = () => `Es el turno de ${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerTurn();

// Condiciones ganadoras
const winningConditions = [
  [0, 1, 2], // Primera fila
  [3, 4, 5], // Segunda fila
  [6, 7, 8], // Tercera fila
  [0, 3, 6], // Primera columna
  [1, 4, 7], // Segunda columna
  [2, 5, 8], // Tercera columna
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
]

// Función para validar resultados
function ResultValidation() {
  let rondaGanada = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      rondaGanada = true;
      break;
    }
  }

  if (rondaGanada) {
    statusDisplay.innerHTML = winningMessage();
    switch (currentPlayer) {
      case 'X':
        playerX_points += 1;
        playerX_points_text.innerText = playerX_points;
        break;
      case 'O':
        playerO_points += 1;
        playerO_points_text.innerText = playerO_points;
        break;
      default:
        break;
    }

    gameActive = false;
    return;
  }

  const rondaEmpate = !gameState.includes("");
  if (rondaEmpate) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  CambiarTurno();
}

function CeldaJugada(clickedCell, clickedCellIndex) {
  const ficha = document.createElement('div'); // Cambiado a 'img' en lugar de 'div'
  gameState[clickedCellIndex] = currentPlayer;

  if (currentPlayer === 'X' || currentPlayer === 'O') {
    ficha.classList.add(`jugador${currentPlayer}`, 'Ficha');
    clickedCell.appendChild(ficha);
  } else {
    alert('Error en la jugada por favor reinicia la página');
  }
}

function ClickEnCelda(clickCellEvent) {
  const clickedCell = clickCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== "" || clickedCell.children.length > 0 || !gameActive) {
    return;
  }

  CeldaJugada(clickedCell, clickedCellIndex);
  ResultValidation();
}

function CambiarTurno() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = currentPlayerTurn();
}

function ReiniciarJuego() {
  console.log('El juego se va a reiniciar');

  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = currentPlayerTurn();
  const fichas = document.querySelectorAll('.jugadorX.Ficha, .jugadorO.Ficha');

  // Recorre cada elemento y lo elimina del DOM
  fichas.forEach(ficha => {
    ficha.remove();
  });
  gameActive = true;

}
//Borra todo los valores
function ReiniciarTodo(){
  ReiniciarJuego();
  playerO_points = 0;
  playerX_points = 0;
  playerX_points_text.innerText = (playerX_points);
  playerO_points_text.innerText = (playerO_points);
}


// Le agregamos a todas las celdas el evento de click
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', ClickEnCelda));
document.querySelector('#RestartGame').addEventListener('click', ReiniciarJuego);
document.querySelector('#RestartPuntos').addEventListener('click', ReiniciarTodo);

