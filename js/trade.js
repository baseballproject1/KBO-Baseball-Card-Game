// =================================
// KBO CARD GAME
// trade.js
// 트레이드 시스템
// =================================



// =================================
// 계약서 확인
// =================================

function getTradeContract(player){


    if(
        [
            "⚪",
            "🔵",
            "🟢"
        ].includes(player.grade)
    ){

        return "normalContract";

    }



    if(
        [
            "🟡",
            "🔴",
            "🟪🟥"
        ].includes(player.grade)
    ){

        return "premiumContract";

    }



    return null;

}








// =================================
// 등급 차이 확인
// =================================

function sameGrade(player1,player2){


    return player1.grade===player2.grade;


}








// =================================
// 1대1 트레이드 가능
// =================================

function canOneTrade(myCard,targetCard){


    if(
        myCard.grade==="🟣"
        ||
        targetCard.grade==="🟣"
    ){

        return false;

    }




    return true;


}








// =================================
// 2대1 트레이드 가능
// =================================

function canTwoTrade(myCards,targetCard){



    if(
        myCards.length!==2
    ){

        return false;

    }






    for(let card of myCards){


        if(card.grade==="🟣"){

            return false;

        }

    }





    if(
        targetCard.grade==="🟣"
    ){

        return false;

    }





    return true;


}









// =================================
// 트레이드 실행
// =================================

function tradePlayers(myCards,targetCard){



    // 1대1

    if(
        myCards.length===1
    ){



        if(
            !canOneTrade(
                myCards[0],
                targetCard
            )
        ){

            return "트레이드 불가능한 카드입니다.";

        }




    }






    // 2대1

    else if(
        myCards.length===2
    ){



        if(
            !canTwoTrade(
                myCards,
                targetCard
            )
        ){

            return "2대1 트레이드 불가능";

        }



    }






    else{


        return "트레이드는 1대1 또는 2대1만 가능합니다.";

    }








    // 계약서 확인


    let contract =

    getTradeContract(targetCard);






    if(
        !contract
    ){

        return "레전드는 트레이드 불가입니다.";

    }








    if(

        !userData.items[contract]

        ||

        userData.items[contract]<=0

    ){

        return "필요한 계약서가 없습니다.";

    }






// =================================
// KBO CARD GAME
// trade.js
// 트레이드 시스템 최종본
// =================================


// =================================
// KBO 10개 구단
// =================================

const TRADE_TEAMS = [

    "SSG",
    "삼성",
    "LG",
    "두산",
    "KIA",
    "KT",
    "롯데",
    "한화",
    "키움",
    "NC"

];





// =================================
// 트레이드 등급 확률
// FA와 동일
// =================================

const TRADE_RATE = {

    "⚪":50,

    "🔵":30,

    "🟢":10,

    "🟡":5,

    "🔴":3,

    "🟪🟥":2

};






// =================================
// 등급 랜덤
// =================================

function randomTradeGrade(){


    let random = Math.random()*100;

    let total = 0;



    for(let grade in TRADE_RATE){


        total += TRADE_RATE[grade];



        if(random <= total){

            return grade;

        }

    }



    return "⚪";

}







// =================================
// 트레이드 선수 생성
// =================================

function createTradePlayer(team){



    let grade = randomTradeGrade();




    let list = players.filter(player =>


        player.team === team

        &&

        player.grade === grade

        &&

        player.grade !== "🟣"


    );






    // 해당 등급 선수 없으면
    // 같은 팀 랜덤 선수

    if(list.length===0){


        list = players.filter(player =>


            player.team===team

            &&

            player.grade!=="🟣"


        );


    }






    if(list.length===0){

        return null;

    }






    let player =

    list[

        Math.floor(

            Math.random()*list.length

        )

    ];







    return {


        ...player,


        trade:true,


        tradeTeam:team


    };

}









// =================================
// 트레이드 목록 생성
// =================================

function updateTradeList(){



    userData.tradeList=[];







    TRADE_TEAMS.forEach(team=>{


        let player = createTradePlayer(team);




        if(player){


            userData.tradeList.push(player);


        }



    });







    userData.lastTradeRefresh =

    new Date().toLocaleDateString();







    saveGame(currentSlot);



}









// =================================
// 00:00 초기화 확인
// =================================

function checkTradeRefresh(){



    let now = new Date();



    let today =

    now.getFullYear()

    +

    "-"

    +

    (now.getMonth()+1)

    +

    "-"

    +

    now.getDate();








    if(

        now.getHours()===0

        &&

        now.getMinutes()===0

    ){



        if(

            userData.lastTradeRefresh !== today

        ){



            updateTradeList();



            userData.lastTradeRefresh=today;



            saveGame(currentSlot);


        }


    }


}









// =================================
// 계약서 확인
// =================================

function getTradeContract(player){



    if(

        [

            "⚪",

            "🔵",

            "🟢"

        ].includes(player.grade)

    ){

        return "normalContract";

    }







    if(

        [

            "🟡",

            "🔴",

            "🟪🟥"

        ].includes(player.grade)

    ){

        return "premiumContract";

    }







    return null;


}









// =================================
// 레전드 확인
// =================================

function isLegend(player){


    return player.grade==="🟣";


}









// =================================
// 트레이드 가능 확인
// =================================

function canTrade(myCards,target){



    // 레전드 금지

    if(isLegend(target)){

        return false;

    }






    for(let card of myCards){


        if(isLegend(card)){


            return false;


        }


    }







    // 1장 또는 2장만 가능

    if(

        myCards.length!==1

        &&

        myCards.length!==2

    ){

        return false;

    }






    return true;


}









// =================================
// 트레이드 실행
// =================================

function tradePlayers(myCards,targetCard){





    if(

        !canTrade(

            myCards,

            targetCard

        )

    ){

        return "트레이드 불가능";

    }









    let contract =

    getTradeContract(targetCard);







    if(!contract){


        return "레전드는 트레이드 불가";

    }








    if(

        userData.items[contract]<=0

    ){

        return "계약서가 부족합니다.";

    }








    // 계약서 사용

    userData.items[contract]--;








    // 내 카드 제거

    myCards.forEach(card=>{


        userData.cards =

        userData.cards.filter(

            c=>c.id!==card.id

        );


    });








    // 영입 선수

    let newPlayer = {


        ...targetCard,


        trade:false,


        contractType:"TRADE",


        contractSeason:5,


        needRenew:false


    };







    userData.cards.push(newPlayer);








    // 목록 제거

    userData.tradeList =

    userData.tradeList.filter(

        p=>p.id!==targetCard.id

    );







    saveGame(currentSlot);







    return (

        newPlayer.name

        +

        " 트레이드 영입 완료!"

    );


}
