// =================================
// KBO CARD GAME
// trade.js
// 트레이드 시스템
// =================================



// =================================
// 트레이드 계약서 등급
// =================================


const TRADE_CONTRACT = {


    normal:[

        "⚪",
        "🔵",
        "🟢"

    ],



    premium:[

        "🟡",
        "🔴",
        "🟪🟥"

    ]


};






// =================================
// 트레이드 가능 확인
// =================================

function canTradePlayer(player){



    // 레전드 불가

    if(
        player.grade==="🟣"
    ){

        return false;

    }



    return true;


}








// =================================
// 필요한 계약서 확인
// =================================

function getTradeContract(player){



    if(

        TRADE_CONTRACT.normal

        .includes(player.grade)

    ){

        return "normalContract";

    }







    if(

        TRADE_CONTRACT.premium

        .includes(player.grade)

    ){

        return "premiumContract";

    }






    return null;


}









// =================================
// 등급 차이 확인
// =================================

function getGradeRank(grade){



    const rank={


        "⚪":1,

        "🔵":2,

        "🟢":3,

        "🟡":4,

        "🔴":5,

        "🟪🟥":6,

        "🟣":7


    };



    return rank[grade] || 0;


}









// =================================
// 트레이드 실행
// =================================

function tradePlayers(

    myPlayers,

    receivePlayer

){





    // 받은 선수 확인


    if(
        !receivePlayer
    ){

        return "선수가 없습니다.";

    }






    // 레전드 확인

    if(
        !canTradePlayer(receivePlayer)
    ){

        return "레전드는 트레이드할 수 없습니다.";

    }








    // 등급 차이 확인


    let myRank =

    Math.max(

        ...myPlayers.map(

            p=>

            getGradeRank(p.grade)

        )

    );





    let receiveRank =

    getGradeRank(

        receivePlayer.grade

    );








    // 등급 차이 1 이상이면 2대1 필요


    if(

        receiveRank > myRank

        &&

        myPlayers.length !== 2

    ){

        return "높은 등급 선수 트레이드는 2명의 선수가 필요합니다.";

    }








    // 계약서 확인


    let contract =

    getTradeContract(receivePlayer);






    if(!contract){


        return "사용할 수 없는 등급입니다.";

    }







    if(

        !userData.items[contract]

        ||

        userData.items[contract] <=0

    ){

        return "필요한 계약서가 없습니다.";

    }








    // 계약서 차감


    userData.items[contract]--;







    // 내 선수 제거


    myPlayers.forEach(player=>{


        userData.cards =

        userData.cards.filter(

            c =>

            c.id !== player.id

        );


    });








    // 받은 선수 등록


    let newPlayer={


        ...receivePlayer,


        FA:false,


        contractType:"TRADE",


        contractSeason:5,


        needRenew:false


    };






    userData.cards.push(newPlayer);







    saveGame();






    return (

        receivePlayer.name

        +

        " 트레이드 완료!"

    );


}
