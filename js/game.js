// =================================
// KBO CARD GAME
// game.js
// Main Game System
// Part 1 / 3
// =================================


// 현재 세이브 슬롯

let currentSlot = 1;



// 현재 선택 선수

let selectedPlayer = null;





// =================================
// 게임 초기화
// =================================

function initGame(slot = 1){


    currentSlot = slot;



    let result = loadGame(slot);



    if(!result){


        userData = createDefaultData();


        saveGame(slot);


    }



    repairSaveData();



    updateUI();



}









// =================================
// 현재 게임 저장
// =================================

function saveCurrentGame(){


    saveGame(currentSlot);


}









// =================================
// 슬롯 변경
// =================================

function selectSaveSlot(slot){



    if(
        slot < 1 ||
        slot > 5
    ){

        return;

    }





    currentSlot = slot;



    loadGame(slot);



    updateUI();



}









// =================================
// 선수 추가
// =================================

function addPlayer(player,type="normal"){



    setPlayerContract(

        player,

        type

    );





    if(
        !player.trait
    ){

        giveTrait(player);


    }






    userData.cards.push(player);



    saveCurrentGame();



}









// =================================
// 선수 찾기
// =================================

function getPlayer(id){



    return userData.cards.find(

        player =>

        player.id === id


    );


}









// =================================
// 선수 선택
// =================================

function selectPlayer(id){



    selectedPlayer =

    getPlayer(id);



    return selectedPlayer;



}









// =================================
// 선수 판매
// =================================

function sellCard(id){



    let player =

    getPlayer(id);



    if(!player){


        return "선수가 없습니다.";


    }







    let price =

    getTradeValue(player)

    *

    100000000;







    userData.money += price;






    userData.cards =

    userData.cards.filter(

        p =>

        p.id !== id


    );







    saveCurrentGame();






    return (

        player.name

        +

        " 판매 완료"

    );



}









// =================================
// 시즌 시작
// =================================

function startSeason(){



    userData.seasonPlaying=true;



    userData.faCount=0;



    saveCurrentGame();



}









// =================================
// 시즌 종료
// =================================

function endSeason(){



    userData.seasonPlaying=false;



    userData.season++;



    endSeasonContract();



    saveCurrentGame();



}









// =================================
// UI 업데이트
// =================================

function updateUI(){



    let money =

    document.getElementById(

        "money"

    );





    if(money){


        money.textContent =

        Math.floor(

            userData.money /

            100000000

        )

        +

        "억";


    }






    let season =

    document.getElementById(

        "season"

    );





    if(season){


        season.textContent =

        userData.season

        +

        "시즌";


    }



}// =================================
// KBO CARD GAME
// game.js
// Part 2 / 3
// =================================







// =================================
// 리그 단계
// =================================

function startLeague(stage){



    userData.stage = stage;



    saveCurrentGame();



}









// =================================
// 경기 진행
// =================================

function playMatch(){



    let myPower =

    calculateTeamPower();





    let enemyPower =

    50 +

    Math.floor(

        Math.random()*50

    );






    let win =

    myPower >= enemyPower

    ||

    Math.random()<0.5;






    if(win){


        matchWin();


    }

    else{


        matchLose();


    }







    return win;


}









// =================================
// 팀 전력 계산
// =================================

function calculateTeamPower(){



    let power=0;





    userData.cards.forEach(player=>{



        if(player.stats){



            power +=

            player.stats.power

            +

            player.stats.contact

            +

            player.stats.speed

            +

            player.stats.defense

            +

            player.stats.control;



        }



        power +=

        player.enhance || 0;



    });






    return power;



}









// =================================
// 승리 보상
// =================================

function matchWin(){



    userData.money +=

    1000000000;






    userData.items.normalTicket++;






    saveCurrentGame();



}









// =================================
// 패배 보상
// =================================

function matchLose(){



    userData.items.normalTicket += 0;




    saveCurrentGame();



}









// =================================
// FA 열기
// =================================

function openFA(){



    if(!userData.FAList){


        userData.FAList=[];


    }






    updateFAList();



    return userData.FAList;



}









// =================================
// FA 영입
// =================================

function recruitFA(id){



    let player =

    userData.FAList.find(

        p=>p.id===id

    );






    if(!player){


        return "FA 선수가 없습니다.";


    }







    let result =

    signFA(player);






    updateUI();





    return result;



}









// =================================
// 트레이드 열기
// =================================

function openTrade(){



    if(!userData.tradeList){


        userData.tradeList=[];


    }







    updateTradeList();






    return userData.tradeList;



}









// =================================
// 트레이드 실행
// =================================

function executeTrade(myCards,targetID){



    let target =

    userData.tradeList.find(

        p=>p.id===targetID


    );






    if(!target){


        return "트레이드 선수가 없습니다.";

    }







    let result =

    tradePlayers(

        myCards,

        target

    );






    updateUI();






    return result;



}









// =================================
// FA / 트레이드 자동 확인
// =================================

function dailyCheck(){



    checkFARefresh();



    checkTradeRefresh();



}





// =================================
// KBO CARD GAME
// game.js
// Part 3 / 3
// =================================







// =================================
// 선수 강화
// =================================

function enhancePlayer(id){



    let player =

    getPlayer(id);






    if(!player){


        return "선수가 없습니다.";


    }







    let result =

    enhanceCard(player);






    saveCurrentGame();



    updateUI();





    return result;



}









// =================================
// 특성 변경
// =================================

function changeTrait(id){



    let player =

    getPlayer(id);







    if(!player){


        return "선수가 없습니다.";

    }







    let result =

    changePlayerTrait(player);






    saveCurrentGame();



    return result;



}









// =================================
// 뽑기
// =================================

function drawCard(type="normal"){



    let player =

    gachaDraw(type);






    if(!player){


        return "뽑기 실패";


    }







    addPlayer(

        player,

        "normal"

    );






    return (

        player.name

        +

        " 획득!"

    );


}









// =================================
// 상점 구매
// =================================

function buyItem(item){



    let data =

    shopItems[item];






    if(!data){


        return "상품 없음";


    }







    if(

        userData.money < data.price

    ){

        return "돈 부족";


    }








    userData.money -=

    data.price;






    userData.items[item]++;






    saveCurrentGame();






    return (

        item

        +

        " 구매 완료"

    );



}









// =================================
// 재계약
// =================================

function renewPlayer(id){



    let player =

    getPlayer(id);






    if(!player){


        return "선수가 없습니다.";

    }






    let result =

    renewContract(player);






    saveCurrentGame();



    return result;



}









// =================================
// 팀 레전드 제작
// =================================

function craftLegend(signatureCard){



    let result =

    makeLegend(signatureCard);






    saveCurrentGame();






    return result;



}









// =================================
// 미션 보상
// =================================

function getMissionReward(item,count=1){



    if(
        !userData.items[item]
    ){

        userData.items[item]=0;


    }







    userData.items[item]+=count;






    saveCurrentGame();



}









// =================================
// 게임 종료 저장
// =================================

function exitGame(){



    saveCurrentGame();



}









// =================================
// 자동 실행
// =================================

setInterval(()=>{


    if(userData){


        dailyCheck();


    }



},60000);






// =================================
// 게임 로딩
// =================================

window.addEventListener(

"load",

()=>{


    initGame(1);


}

);
