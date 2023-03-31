// 👇 ---------------------------- gameData setup ---------------------------- 👇 //

// gameData
const gameData = {
  result: [], // 정답을 가지고 있을 배열
  round: 1, // 현재 단계
  clearRound: 0, // 최종 클리어한 단계
}

// 난수 생성 함수 (return 0 or 1)
function getRandomNumber() {
  return Math.floor(Math.random() * 10) % 2;
}

// result setup [ ex) console.log(gameData.result) 👉 [0, 1, 1, 0, 1, 1] ]
function setResult() {
  gameData.result.push(getRandomNumber());
}

// 6단계까지 답 생성하기 (위의 함수 6번 호출(번호 6개 추가))
for (let i = 0; i < 6; i++) {
  setResult();

}
// 👆 ---------------------------- gameData setup ---------------------------- 👆 //


// 👇 ---------------------------- bridge setup ---------------------------- 👇 //
// 부모를 호출해서 자식태그들을 배열로 선언
const $leftBtn = [...document.getElementById('bridge-left-btn').children];
const $rightBtn = [...document.getElementById('bridge-right-btn').children];

// 클릭했을 때 알람을 띄우는 함수 (왼쪽 다리, 테스트용)
function clickLeftAlert() {
  alert("왼쪽 다리 클릭됨!");

}
// 클릭했을 때 알람을 띄우는 함수 (오른쪽 다리, 테스트용)
function clickRightAlert() {
  alert("오른쪽 다리 클릭됨!");
}

// 왼쪽 다리 버튼 onclick 이벤트에 alert 띄우는 함수 추가하기
$leftBtn.forEach($li => {
  $li.addEventListener('click', clickLeftAlert);
});

// 오른쪽 다리 버튼 onclick 이벤트에 alert 띄우는 함수 추가하기
$rightBtn.forEach($li => {
  $li.addEventListener('click', clickRightAlert);
})

// $btn 태그에게 disabled=true 를 추가하는 함수 (true는 클릭이 안 됨)
function setDisabled($btn) {
  $btn.setAttribute('disabled', true);
}

// $btn 태그에게 disabled를 삭제함 (클릭이 됨)
function removeDisabled($btn) {
  $btn.removeAttribute('disabled');
}

// 왼쪽 다리와 오른쪽 다리 전부를 클릭 불가하게 만듬
$leftBtn.forEach($li => setDisabled($li));
$rightBtn.forEach($li => setDisabled($li));

// 왼쪽, 오른쪽 다리의 첫번째 자식은 클릭이 되게끔 disabled 해제
removeDisabled($leftBtn[0]);
removeDisabled($rightBtn[0]);

// gameData.result 가 가지고 있는 정답 배열을 기준으로
// 다리들에게 정답을 부여하기
// key 값은 'result' 이며 밸류는 0과 1 두 개만 존재
for (let i = 0; i < 6; i++) {
  if (gameData.result[i] === 1) {
    $leftBtn[i].setAttribute('result', 1);
    $rightBtn[i].setAttribute('result', 0);
  } else {
    $leftBtn[i].setAttribute('result', 0);
    $rightBtn[i].setAttribute('result', 1);
  }
}

// 👆 현재 상태는 1번째 다리만 클릭이되고 나머지 다리는 클릭이 불가함

// --- 아래의 코드부터는 클릭 했을 때 정답(1)일 경우와, 오답(0)일 경우로 나누어 로직을 구현 --- //

// ✅ 정답(1)일 경우 ✅
// ->> 클릭된 버튼에게 disabled=true를 부여해 클릭이 안 되게 만듬
// ->> left, right 버튼 둘 다 클릭이 안 되게 만들어야함
// ❌ 오답(1)일 경우 ❌
// ->> round를 1단계로 초기화하고 맨 처음 셋업(1번 다리만 클릭이 가능하게)으로 돌려놔야 함


// ❌ 오답(1)일 경우 ❌ 초기화하는 함수
function resetBridge() {

  // 왼쪽 다리와 오른쪽 다리 전부를 클릭 불가하게 만듬
  $leftBtn.forEach($li => setDisabled($li));
  $rightBtn.forEach($li => setDisabled($li));

  // 왼쪽, 오른쪽 다리의 첫번째 자식은 클릭이 되게끔 disabled 해제
  removeDisabled($leftBtn[0]);
  removeDisabled($rightBtn[0]);

  // round 1단계로 초기화
  gameData.round = 1;
}


// 왼쪽 다리 정답을 확인하는 함수
function leftCheckResult() {
  const $leftBridge = $leftBtn[gameData.clearRound];
  const bridgeResult = +$leftBridge.getAttribute('result');

  const $rightBridge = $rightBtn[gameData.clearRound];

  if (bridgeResult === 1) {
    // ✅ 정답(1)일 경우 ✅

    // 현재 버튼 클릭 불가로 설정 (left right 둘 다)
    setDisabled($leftBridge);
    setDisabled($rightBridge);

    // 현재 클리어한 라운드를 최종 라운드로 갱신
    // 비교해서 큰 값 추가
    // gameData 시도 횟수를 키로 추가해서
    gameData.clearRound = gameData.round;

    // round 1 상승
    gameData.round++;

    // 다음 버튼 클릭 허용 (왼쪽, 오른쪽 모두 허용해야함)
    // 부모 호출 후 해당 id 값이 라운드와 같다면 disabled 해제시키기
    $leftBtn.forEach($btn => {
      if (+$btn.getAttribute('id') === gameData.round) {
        removeDisabled($btn);
      }
    });

    $rightBtn.forEach($btn => {
      if (+$btn.getAttribute('id') === gameData.round) {
        removeDisabled($btn);
      }
    });

  } else {
    // ❌ 오답(1)일 경우 ❌
    alert("left 오답이다.");
    // reset
    resetBridge();
  }
}

function rightCheckResult() {
  const $rightBridge = $rightBtn[gameData.clearRound];
  const bridgeResult = +$rightBridge.getAttribute('result');

  const $leftBridge = $leftBtn[gameData.clearRound];

  if (bridgeResult === 1) {
    // ✅ 정답(1)일 경우 ✅

    // 현재 버튼 클릭 불가로 설정 (left right 둘 다)
    setDisabled($rightBridge);
    setDisabled($leftBridge);

    // 현재 클리어한 라운드를 최종 라운드로 갱신
    gameData.clearRound = gameData.round;

    // round 1 상승
    gameData.round++;

    // 다음 버튼 클릭 허용 (왼쪽, 오른쪽 모두 허용해야함)
    // 부모 호출 후 해당 id 값의
    $leftBtn.forEach($btn => {
      if (+$btn.getAttribute('id') === gameData.round) {
        removeDisabled($btn);
      }
    });

    $rightBtn.forEach($btn => {
      if (+$btn.getAttribute('id') === gameData.round) {
        removeDisabled($btn);
      }
    });

  } else {
    // ❌ 오답(1)일 경우 ❌
    alert("right 오답이다.");
    // reset
    resetBridge();
  }
}

// 왼쪽 다리 버튼 onclick 이벤트에 정답을 확인하는 함수 추가하기
$leftBtn.forEach($li => {
  $li.addEventListener('click', leftCheckResult);
});

// 오른쪽 다리 버튼 onclick 이벤트에 정답을 확인하는 함수 추가하기
$rightBtn.forEach($li => {
  $li.addEventListener('click', rightCheckResult);
})

console.log(gameData.result);


// 클릭했을 때 이미지를 업데이트 시키는 함수

// 👆 ---------------------------- bridge setup ---------------------------- 👆 //





//👇 ---------------------------- bridge img ---------------------------- 👇 //

// endGame 함수 (clearRound가 6이 될 때가 게임을 다 깼을 때)

function endGame(clearRound){
  if(clearRound <= 6);{
    alert(`승리하셨습니다. \n 해마 포인트를 획득하셨습니다!\n 게임을 종료합니다.`);
  }
}


//👆 ---------------------------- bridge img ---------------------------- 👆 //
