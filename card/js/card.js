//Grab a couple of things
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the data :Array & Object
const getData = () => [

    { imgSrc: "/card/css/card-img/seahorse (1).png", name: "1"},
    { imgSrc: "/card/css/card-img/seahorse (2).png", name: "2"},
    { imgSrc: "/card/css/card-img/seahorse (3).png", name: "3"},
    { imgSrc: "/card/css/card-img/seahorse (4).png", name: "4"},
    { imgSrc: "/card/css/card-img/seahorse (5).png", name: "5"},
    { imgSrc: "/card/css/card-img/seahorse (6).png", name: "6"},
    { imgSrc: "/card/css/card-img/seahorse (7).png", name: "7"},
    { imgSrc: "/card/css/card-img/seahorse (8).png", name: "8"},
    { imgSrc: "/card/css/card-img/seahorse (1).png", name: "1"},
    { imgSrc: "/card/css/card-img/seahorse (2).png", name: "2"},
    { imgSrc: "/card/css/card-img/seahorse (3).png", name: "3"},
    { imgSrc: "/card/css/card-img/seahorse (4).png", name: "4"},
    { imgSrc: "/card/css/card-img/seahorse (5).png", name: "5"},
    { imgSrc: "/card/css/card-img/seahorse (6).png", name: "6"},
    { imgSrc: "/card/css/card-img/seahorse (7).png", name: "7"},
    { imgSrc: "/card/css/card-img/seahorse (8).png", name: "8"},

];

//Randomize
const randomize = () => {
    const cardData = getData();
    // console.log(cardData);
    cardData.sort(() => Math.random() - 0.5); // 랜덤 함수 
    // console.log(cardData);
    return cardData;
};

//Card Generator Function 
const cardGenerator = () => {
    const cardData = randomize();
    console.log(cardData);
    //Generate the HTML
    cardData.forEach((item) => {
      const card = document.createElement('div');
      const face = document.createElement('img');
      const back = document.createElement('div');
      card.classList = 'card';
      face.classList = 'face';
      back.classList = 'back';
      //Attach the info to the cards
      face.src = item.imgSrc;
      card.setAttribute('name', item.name);
      // Attach the cards to the section
      section.appendChild(card);
      card.appendChild(face);
      card.appendChild(back);

      card.addEventListener('click', (e)=> {
        card.classList.toggle('toggleCard');
        checkCards(e);
      });
    });
  };

  //Check Cards
  const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    // console.log(clickedCard); 
    // flipped라는 클래스가 적용이 됨 
    const flippedCards =  document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll(".toggleCard");
    // toggleCard라는 180 뒤집는 클래스가 부여된 toggleCard와 클릭이된 카드를 flippedCards라는 클래스 속성 부여  
    if(flippedCards.length === 2) {
      if(
        flippedCards[0].getAttribute('name') === 
        flippedCards[1].getAttribute('name')
        ) {
          console.log(flippedCards);
          console.log("match");
          flippedCards.forEach((card) => {
            card.classList.remove('flipped');
            card.style.pointerEvents = 'none';
            //더 이상 클릭 할 수 없게 만든다. 
          });
        } else { // 이미지가 같지 않은 경우 
          console.log("wrong"); 
          flippedCards.forEach((card) => {
            card.classList.remove('flipped');
            setTimeout(() => card.classList.remove('toggleCard'), 1000);
          });
          playerLives--;
          console.log(playerLives);
          console.log(playerLivesCount);
          playerLivesCount.textContent = playerLives;
          if(playerLives === 0) {
          restart("Try Again");
        }
      }
    }
    //Run a check to see if we won the game
    if(toggleCard.length === 16){
      restart("You won!");
    }
  };

  //Restart
  const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
      cards[index].classList.remove('toggleCard');
      //Randomize
      setTimeout(()=>{
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute('name', item.name);
        section.style.pointerEvents = "all";
      }, 800);
    });
    playerLives = 6;
    playerLives.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
  };

cardGenerator();