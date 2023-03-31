const gameData = {
    result: null,
    round: 3,
    strike: 0,
    ball: 0,
    scoreInfo: '',
}

// initailize
// 랜덤으로 번호를 생성하는 함수
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 0;
}

// initailize
// 정답을 생성하는 함수
function makeResult() {
    const numbers = [];
    while (numbers.length < gameData.round) {

        const inputNumber = getRandomNumber();

        if (!numbers.includes(inputNumber)) {
            numbers.push(inputNumber);
        }

    }
    gameData.result = numbers;
}

// 결과를 출력해주는 함수
function viewHint() {
    alert(gameData.strike + "스트라이크! " + gameData.ball + "볼!");
}

function initailize() {
    makeResult();
    gameData.scoreInfo = '';
    gameData.strike = 0;
    gameData.ball = 0;
}

initailize();


while (true) {
    if (gameData.round === 11) {
        alert("E-N-D");
        break;
    }
    const inputNumber = prompt("번호를 입력하세요");

    // 정답을 비교하는 메소드
    for (let i = 0; i < inputNumber.length; i++) {
        const number = +inputNumber.charAt(i);

        if (gameData.result.includes(number)) {
            if (gameData.result[i] === number) {
                gameData.strike++;
            } else {
                gameData.ball++;
            }
        }
    }

    gameData.scoreInfo += `입력한 숫자 : ${inputNumber} >> 결과 : ${gameData.strike} 스트라이크 / ${gameData.ball} 볼\n`;

    if (gameData.strike === gameData.round) {
        alert("Lv Up !!!! ");
        gameData.round++;
        initailize();
        continue;
    }

    viewHint();

    gameData.strike = 0;
    gameData.ball = 0;

    alert(gameData.scoreInfo);
}