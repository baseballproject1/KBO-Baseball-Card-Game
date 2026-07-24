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

        );


    }



    updateUI();


}







// =================================
// 경기
// =================================


function playLeague(mode){



    let result =
    startLeague(mode);



    alert(

    result.result

    +

    "\n상대 : "

    +

    result.enemy

    +

    "\n보상 : "

    +

    Math.floor(
    result.reward/100000000
    )

    +

    "억"

    );



    if(result.seasonEnd){


        alert(
        "144경기 완료!\n다음 스테이지 해금!"
        );


    }



    updateUI();


}







// =================================
// 저장
// =================================


function saveButton(slot){


    saveGame(slot);


    alert(
    slot+"번 저장 완료"
    );


}






// =================================
// 불러오기
// =================================


function loadButton(slot){


    if(
    loadGame(slot)
    ){


        alert(
        slot+"번 불러오기 완료"
        );


        updateUI();


    }

    else{


        alert(
        "저장 데이터 없음"
        );


    }


}






// 시작

updateUI();
