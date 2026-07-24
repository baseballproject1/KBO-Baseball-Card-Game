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









    // 계약서 차감

    userData.items[contract]--;









    // 내 선수 제거

    myCards.forEach(card=>{


        userData.cards =

        userData.cards.filter(

            c=>c.id!==card.id

        );


    });








    // 영입 선수 생성


    let newPlayer={


        ...targetCard,


        contractType:"TRADE",


        contractSeason:5,


        needRenew:false,


        FA:false


    };







    userData.cards.push(newPlayer);







    saveGame(currentSlot);








    return (

        newPlayer.name

        +

        " 트레이드 영입 완료!"

    );


}









// =================================
// 트레이드 가치 비교
// =================================

function getTradeValue(player){



    const VALUE={


        "⚪":1,

        "🔵":2,

        "🟢":3,

        "🟡":5,

        "🔴":7,

        "🟪🟥":10,

        "🟣":999


    };



    return VALUE[player.grade] || 0;


}
