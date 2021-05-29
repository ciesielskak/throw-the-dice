"use strict";
let firstFinalScore = 0;
let secondFinalScore = 0;
let firstCurrentScore = 0;
let secondCurrentScore = 0;

const firstPlayerFinalScore = document.getElementById("score--0");
const secondPlayerFinalScore = document.getElementById("score--1");
const firstPlayerCurrentScore = document.getElementById("current--0");
const secondPlayerCurrentScore = document.getElementById("current--1");
const playerActiveFinalScore = document.querySelector(".player--active .score");
const playerActiveCurrentScore = document.querySelector(
  ".player--active .current-score"
);
const players = document.querySelectorAll("section");
const diceImg = document.querySelector("img");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const btnNewGame = document.querySelector(".btn--new");

firstPlayerFinalScore.textContent = firstFinalScore;
secondPlayerFinalScore.textContent = secondFinalScore;
firstPlayerCurrentScore.textContent = firstCurrentScore;
secondPlayerCurrentScore.textContent = secondCurrentScore;

const chooseWinner = (score, index) => {
  if (score >= 10) {
    players[index].classList.add("player--winner");
    btnRoll.disabled = true;
    btnHold.disabled = true;
  }
};

const toggleClass = () => {
  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle("player--active");
  }
};
const switchPlayer = () => {
  if (players[0].classList.contains("player--active")) {
    firstFinalScore += firstCurrentScore;
    firstPlayerFinalScore.textContent = firstFinalScore;
    firstCurrentScore = 0;
    firstPlayerCurrentScore.textContent = firstCurrentScore;
    chooseWinner(firstFinalScore, 0);
  } else {
    secondFinalScore += secondCurrentScore;
    secondPlayerFinalScore.textContent = secondFinalScore;
    secondCurrentScore = 0;
    secondPlayerCurrentScore.textContent = secondCurrentScore;
    chooseWinner(secondFinalScore, 1);
  }
  toggleClass();
};
const rollDice = () => {
  let randomNumber = Math.trunc(Math.random() * 6) + 1;
  diceImg.classList.remove("hidden");
  diceImg.src = `dice-${randomNumber}.png`;
  if (players[0].classList.contains("player--active")) {
    if (randomNumber === 1) {
      firstCurrentScore = 0;
      firstPlayerCurrentScore.textContent = firstCurrentScore;
      toggleClass();
    } else {
      firstCurrentScore += randomNumber;
      firstPlayerCurrentScore.textContent = firstCurrentScore;
    }
  } else {
    if (randomNumber === 1) {
      secondCurrentScore = 0;
      secondPlayerCurrentScore.textContent = secondCurrentScore;
      toggleClass();
    } else {
      secondCurrentScore += randomNumber;
      secondPlayerCurrentScore.textContent = secondCurrentScore;
    }
  }
};

const startAgain = () => {
  firstFinalScore = 0;
  secondFinalScore = 0;
  firstCurrentScore = 0;
  secondCurrentScore = 0;
  firstPlayerFinalScore.textContent = firstFinalScore;
  secondPlayerFinalScore.textContent = secondFinalScore;
  firstPlayerCurrentScore.textContent = firstCurrentScore;
  secondPlayerCurrentScore.textContent = secondCurrentScore;
  players[0].classList.remove("player--winner") || players[1].classList.remove("player--winner");
  btnRoll.disabled = false;
  btnHold.disabled = false;
};
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", switchPlayer);
btnNewGame.addEventListener("click", startAgain);
