// =================================
// KBO CARD GAME
// script.js
// 화면 연결 + 카드 표시
// =================================



const moneyText =
document.getElementById("money");


const teamText =
document.getElementById("team");


const stageText =
document.getElementById("stage");


const seasonText =
document.getElementById("season");


const cardList =
document.getElementById("cardList");





// =================================
// 화면 업데이트
// =================================


function updateUI(){


    if(moneyText){

        moneyText.textContent =
        Math.floor(
            userData.money / 100000000
        )
        +"억";

    }



    if(teamText){

        teamText.textContent =
        userData.team ||
        "팀 없음";

    }



    if(stageText){

        stageText.textContent =
        "스테이지 "
        +
        seasonData.stage;

    }



    if(seasonText){

        seasonText.textContent =
        "시즌 경기 "
        +
        getSeasonProgress();

    }



    updateCards();


}







// =================================
// 카드 표시
// =================================


function updateCards(){


    if(!cardList)
        return;



    if(
    userData.cards.length===0
    ){

        cardList.innerHTML =
        "아직 카드가 없습니다.";

        return;

    }



    cardList.innerHTML="";



    userData.cards.forEach(card=>{


        let div =
        document.createElement("div");


        div.className="card";



        div.innerHTML = `

        <div class="grade">
        ${card.grade}
        </div>

        <div class="name">
        ${card.name}
        </div>

        <div>
        ${card.team}
        </div>

        <div>
        ${card.position}
        </div>

        <div>
        ${card.enhance}강
        </div>

        `;



        cardList.appendChild(div);


    });



}







// =================================
// 팀 선택
// =================================


function selectTeam(teamName){


    userData.team =
    teamName;


    saveGame();


    updateUI();


    alert(
    teamName+" 선택 완료!"
    );


}







// =================================
// 뽑기
// =================================


function normalDraw(){


    let card =
    drawCard("normal");



    if(card){


        alert(

        "획득!\n"

        +

        card.grade

        +

        " "

        +

        card.name

        );


    }


    updateUI();


}







function premiumDraw(){


    let card =
    drawCard("premium");



    if(card){


        alert(

        "획득!\n"

        +

        card.grade

        +

        " "

        +

        card.name
// =================================
// KBO CARD GAME
// script.js
// 화면 연결
// =================================



// 메시지 출력

function showMessage(text){


    alert(text);


}








// =================================
// 선수 목록 표시
// =================================

function renderPlayers(){



    let box =

    document.getElementById(

        "playerList"

    );



    if(!box) return;



    box.innerHTML="";







    userData.cards.forEach(player=>{



        let div=document.createElement("div");



        div.className=

        "playerCard";




        div.innerHTML=`

        <h3>${player.name}</h3>

        <p>${player.team}</p>

        <p>${player.grade}</p>

        <p>강화 ${player.enhance}강</p>

        <p>${player.trait || "특성 없음"}</p>

        <p>${getContractText(player)}</p>

        `;





        box.appendChild(div);



    });



}









// =================================
// FA 목록 표시
// =================================

function renderFA(){



    let box =

    document.getElementById(

        "faList"

    );



    if(!box)return;



    box.innerHTML="";






    userData.FAList.forEach(player=>{



        let div=document.createElement("div");



        div.className=

        "marketCard";




        div.innerHTML=`

        <span>

        ${player.name}

        ${player.grade}

        </span>


        <button onclick="recruitFA(${player.id})">

        영입

        </button>

        `;



        box.appendChild(div);



    });



}









// =================================
// 트레이드 목록 표시
// =================================

function renderTrade(){



    let box =

    document.getElementById(

        "tradeList"

    );



    if(!box)return;



    box.innerHTML="";







    userData.tradeList.forEach(player=>{



        let div=document.createElement("div");



        div.className=

        "marketCard";





        div.innerHTML=`

        <span>

        ${player.team}

        |

        ${player.name}

        ${player.grade}

        </span>


        <button onclick="selectTrade(${player.id})">

        선택

        </button>

        `;



        box.appendChild(div);



    });



}









// =================================
// FA 버튼
// =================================

function openFA(){


    updateFAList();


    renderFA();


}









// =================================
// 트레이드 버튼
// =================================

function openTrade(){


    updateTradeList();


    renderTrade();


}









// =================================
// 경기 버튼
// =================================

function playMatch(){



    let result=

    window.playMatch();



    if(result){


        showMessage(

        "승리! 보상 획득"

        );


    }

    else{


        showMessage(

        "패배..."

        );


    }




    renderPlayers();


}









// =================================
// 뽑기 결과
// =================================

function drawCard(type){



    let result =

    window.gachaDraw(type);






    if(!result){


        showMessage(

        "뽑기권이 부족합니다."

        );


        return;


    }







    addPlayer(

        result,

        "normal"

    );







    showMessage(

        result.name

        +

        " 획득!"

    );






    renderPlayers();


}









// =================================
// 저장
// =================================

function saveButton(){


    saveCurrentGame();


    showMessage(

    "저장 완료"

    );


}









// =================================
// 전체 갱신
// =================================

function refreshScreen(){



    renderPlayers();


    renderFA();


    renderTrade();



}









// =================================
// 게임 시작
// =================================

window.onload=function(){



    initGame(1);



    refreshScreen();



};
