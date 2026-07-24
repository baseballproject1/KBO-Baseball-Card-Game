// =================================
// KBO CARD GAME
// contract.js
// 선수 계약 / 재계약 시스템
// =================================



// =================================
// FA 기준 금액
// =================================

const PLAYER_CONTRACT_PRICE = {

    "⚪":1000000000,      // 10억

    "🔵":2000000000,      // 20억

    "🟢":3000000000,      // 30억

    "🟡":5000000000,      // 50억

    "🔴":7000000000,      // 70억

    "🟪🟥":10000000000    // 100억

};






// =================================
// 선수 영입 시 계약기간 설정
// =================================

function setPlayerContract(player, type){


    // 레전드

    if(player.grade==="🟣"){


        player.contractType="legend";

        player.contractSeason=-1;

        player.needRenew=false;


        return player;

    }







    // FA / 트레이드

    if(
        type==="FA" ||
        type==="TRADE"
    ){


        player.contractType=type;

        player.contractSeason=5;

        player.needRenew=false;


    }







    // 기본 선수 / 뽑기 선수

    else{


        player.contractType="normal";

        player.contractSeason=1;

        player.needRenew=false;


    }





    return player;


}









// =================================
// 시즌 종료 계약 체크
// =================================

function endSeasonContractCheck(){



    userData.cards.forEach(player=>{



        // 레전드는 제외

        if(
            player.grade==="🟣"
        ){

            return;

        }






        player.contractSeason--;







        if(
            player.contractSeason<=0
        ){


            player.contractSeason=0;


            player.needRenew=true;


        }



    });





    saveGame();


}









// =================================
// 재계약 비용 계산
// =================================

function getRenewPrice(player){



    if(
        player.grade==="🟣"
    ){

        return 0;

    }




    return (
        PLAYER_CONTRACT_PRICE[player.grade]
        *
        0.5
    );


}









// =================================
// 재계약
// =================================

function renewContract(player){



    // 레전드

    if(
        player.grade==="🟣"
    ){

        return "레전드는 영구 보유입니다.";

    }






    if(
        !player.needRenew
    ){

        return "아직 재계약 기간이 아닙니다.";

    }







    let price =
    getRenewPrice(player);






    if(
        !useMoney(price)
    ){

        return "재계약 비용이 부족합니다.";

    }






    // 5시즌 연장

    player.contractSeason=5;


    player.needRenew=false;




    saveGame();





    return player.name+" 재계약 완료!";

}









// =================================
// 계약 상태 확인
// =================================

function checkPlayerContract(player){



    if(
        player.grade==="🟣"
    ){

        return "영구 보유";

    }




    if(
        player.needRenew
    ){

        return "재계약 필요";

    }




    return (

        "계약 "+

        player.contractSeason+

        "시즌 남음"

    );

}
