import data from "./data.js";
import { addScore, removeScore } from "./score.js";

//////////////////////////////////* Index *//////////////////////////////////





const questions = document.getElementsByClassName("data-open-modal");
const playerUp = document.getElementsByClassName("player-up");
const playerDown = document.getElementsByClassName("player-down");
const modal = document.getElementById("data-modal");
const questionContent = document.getElementById("question-content");
const scores = document.getElementsByClassName("score");
const miniScores = document.getElementsByClassName("mini-score");

let dailyDoubleIndex = 9;
let currentMoney = 0;
let questionID = 0;

let resetButtons = () => {
    for (let i = 0; i < playerDown.length; i++) {
        if (playerDown[i].classList.contains("disabled-button")) playerDown[i].classList.remove("disabled-button");
        if (playerUp[i].classList.contains("disabled-button")) playerUp[i].classList.remove("disabled-button");
        playerDown[i].classList.add("enabled-button");
        playerUp[i].classList.add("enabled-button");
        playerDown[i].disabled = false;
        playerUp[i].disabled = false;
    }
}

let answerQuestion = (i) => {
    questions[i].textContent = "";
    questions[i].disabled = true;
    questions[i].classList.remove("question");
    questions[i].classList.add("disabled-question");
}

for (let i = 0; i < playerUp.length; i++) {
    playerUp[i].addEventListener("click", () => {
        let newScore = addScore(i, currentMoney);
        scores[i].textContent = newScore;
        miniScores[i].textContent = newScore;
        resetButtons();
        answerQuestion(questionID);
        document.body.style.overflowY = "";
        modal.close();
    });
}

for (let i = 0; i < playerDown.length; i++) {
    playerDown[i].addEventListener("click", () => {
        let newScore = removeScore(i, currentMoney);
        scores[i].textContent = newScore;
        miniScores[i].textContent = newScore;

        playerDown[i].disabled = true;
        playerUp[i].disabled = true;
        playerDown[i].classList.remove("enabled-button");
        playerUp[i].classList.remove("enabled-button");
        playerDown[i].classList.add("disabled-button");
        playerUp[i].classList.add("disabled-button");
        
        let count = 0;
        for (let index = 0; index < playerDown.length; index++) {
            if (playerDown[index].classList.contains("disabled-button")) {
                count++;
            }
        }

        if (count == playerDown.length) {
            resetButtons();
            document.body.style.overflowY = "";
            answerQuestion(questionID);
            modal.close();
        }
    });
}

for (let i = 0; i < questions.length; i++) {
    questions[i].addEventListener("click", () => {
        if (i == dailyDoubleIndex) {
            dailyDouble();
            return;
        }
        modal.showModal();
        document.body.style.overflowY = "hidden";
        questionContent.innerHTML = data[i]["question"];
        currentMoney = Number(questions[i].textContent.slice(1));
        questionID = i;
    });
}





//////////////////////////////////* Double *//////////////////////////////////





const doubleQuestion = document.getElementById("double-question");
const doubleBorder = document.getElementById("double-border");
const doubleModal = document.getElementById("modal-double");
const doubleMiniScores = document.getElementsByClassName("double-mini-score");

const doubleInputs = document.getElementsByClassName("double-input");
const doublePlayerUp = document.getElementsByClassName("double-player-up");
const doublePlayerDown = document.getElementsByClassName("double-player-down");
const doubleAudio = new Audio("./assets/dd.mp3");

let dailyDouble = () => {
    doubleModal.showModal();
    doubleAudio.play();
    document.body.style.overflowY = "hidden";
    for (let i = 0; i < doubleMiniScores.length; i++) {
        doubleMiniScores[i].textContent = addScore(i, 0);
    }
    doubleQuestion.textContent = "Daily Double";
};

for (let i = 0; i < doublePlayerUp.length; i++) {
    doublePlayerUp[i].addEventListener("click", () => {
        let inputValue = doubleInputs[i].value;
        if (isNaN(Number(inputValue))) return;
        let newScore = addScore(i, inputValue);
        scores[i].textContent = newScore;
        doubleMiniScores[i].textContent = newScore;

        answerQuestion(dailyDoubleIndex);
        document.body.style.overflowY = "";
        doubleModal.close();
    });
}

for (let i = 0; i < doublePlayerDown.length; i++) {
    doublePlayerDown[i].addEventListener("click", () => {
        let inputValue = doubleInputs[i].value;
        if (isNaN(Number(inputValue))) return;
        let newScore = removeScore(i, doubleInputs[i].value);
        scores[i].textContent = newScore;
        doubleMiniScores[i].textContent = newScore;

        answerQuestion(dailyDoubleIndex);
        document.body.style.overflowY = "";
        doubleModal.close();
    });
}

doubleBorder.addEventListener("click", e => {
    doubleBorder.style.backgroundColor = "transparent";
    doubleQuestion.textContent = data[dailyDoubleIndex].question;
    document.body.style.overflowY = "hidden";
})





//////////////////////////////////* Final *//////////////////////////////////





const finalButton = document.getElementById("next-round-link");
const finalQuestion = document.getElementById("final-question");
const finalBorder = document.getElementById("final-border");
const finalModal = document.getElementById("modal-final");
const finalMiniScores = document.getElementsByClassName("final-mini-score");

const finalInputs = document.getElementsByClassName("final-input");
const finalPlayerUp = document.getElementsByClassName("final-player-up");
const finalPlayerDown = document.getElementsByClassName("final-player-down");


finalButton.addEventListener("click", () => {
    finalModal.showModal();
    document.body.style.overflowY = "hidden";
    for (let i = 0; i < finalMiniScores.length; i++) {
        finalMiniScores[i].textContent = addScore(i, 0);
    }
    finalQuestion.textContent = data[30].category;
});

for (let i = 0; i < finalPlayerUp.length; i++) {
    finalPlayerUp[i].addEventListener("click", () => {
        let inputValue = finalInputs[i].value;
        if (isNaN(Number(inputValue))) return;
        let newScore = addScore(i, inputValue);
        scores[i].textContent = newScore;
        finalMiniScores[i].textContent = newScore;

        finalPlayerDown[i].disabled = true;
        finalPlayerUp[i].disabled = true;
        finalPlayerDown[i].classList.remove("enabled-button");
        finalPlayerUp[i].classList.remove("enabled-button");
        finalPlayerDown[i].classList.add("disabled-button");
        finalPlayerUp[i].classList.add("disabled-button");
    });
}

for (let i = 0; i < finalPlayerDown.length; i++) {
    finalPlayerDown[i].addEventListener("click", () => {
        let inputValue = finalInputs[i].value;
        if (isNaN(Number(inputValue))) return;
        let newScore = removeScore(i, inputValue);
        scores[i].textContent = newScore;
        finalMiniScores[i].textContent = newScore;

        finalPlayerDown[i].disabled = true;
        finalPlayerUp[i].disabled = true;
        finalPlayerDown[i].classList.remove("enabled-button");
        finalPlayerUp[i].classList.remove("enabled-button");
        finalPlayerDown[i].classList.add("disabled-button");
        finalPlayerUp[i].classList.add("disabled-button");
    });
}

finalBorder.addEventListener("click", e => {
    finalBorder.style.backgroundColor = "transparent";
    finalModal.querySelector("h1").remove();
    finalQuestion.textContent = data[30].question;
    document.body.style.overflowY = "hidden";
});





//////////////////////////////////* Setup *//////////////////////////////////





const setupModal = document.getElementById("setup-modal");
const inputNames = document.querySelectorAll(".setup-label > input");
const saveBtn = document.querySelector("#setup-inner > button");

let setupGame = () => {
    setupModal.showModal();
    document.body.style.overflowY = "hidden";
}

setupGame();


saveBtn.addEventListener("click", e => {
    inputNames.forEach((input, index) => {
        let contestantNames = document.querySelectorAll(`.contestant-${index + 1}`);
        console.log(contestantNames);
        contestantNames.forEach(element => element.textContent = input.value ? input.value : `Contestant-${index + 1}`);
    });
    document.body.style.overflowY = "";
    setupModal.close();
});