// =================================
// KBO CARD GAME
// contract.js
// 선수 계약 시스템
// =================================





// =================================
// 계약 설정
// =================================


const FIRST_CONTRACT_SEASON = 1;

const RENEW_CONTRACT_SEASON = 5;

const RENEW_RATE = 0.5;









// =================================
// 선수 영입 시 계약 설정
// =================================

function setPlayerContract(player,type){



    // 레전드

    if(
        player.grade==="🟣"
    ){

        player.contractType="legend";

        player.contractSeason=-1;

        player.needRenew=false;

        return player;

    }








    // FA / 트레이드

    if(

        type==="FA"

        ||

        type==="TRADE"

    ){


        player.contractType=type;


        player.contractSeason=5;


        player.needRenew=false;


        return player;


    }








    // 생성 / 뽑기 선수


    player.contractType="normal";


    player.contractSeason=1;


    player.needRenew=false;



    return player;


}









// =================================
// 시즌 종료 처리
// =================================

function endSeasonContract(){



    userData.cards.forEach(player=>{





        // 레전드 제외

        if(

            player.grade==="🟣"

        ){

            return;

        }







        player.contractSeason--;








        if(

            player.contractSeason<=0

        ){


            player.needRenew=true;


        }





    });







    saveGame(currentSlot);



}









// =================================
// 재계약 비용 계산
// =================================

function getRenewCost(player){



    if(
        !player.faPrice
    ){

        return 0;

    }







    return (

        player.faPrice

        *

        RENEW_RATE

    );


}









// =================================
// 재계약 실행
// =================================

function renewContract(player){



    if(
        !player.needRenew
    ){

        return "재계약 대상이 아닙니다.";

    }







    let cost =

    getRenewCost(player);







    if(
        !useMoney(cost)
    ){

        return "재계약 비용이 부족합니다.";

    }







    player.contractSeason=

    RENEW_CONTRACT_SEASON;






    player.needRenew=false;






    saveGame(currentSlot);







    return (

        player.name

        +

        " 재계약 완료!"

    );


}









// =================================
// 계약 상태 확인
// =================================

function getContractText(player){



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

        player.contractSeason

        +

        "시즌 남음"

    );


}









// =================================
// FA/트레이드 영입
// =================================

function signPlayerFromMarket(player,type){



    let newPlayer={

        ...player

    };






    setPlayerContract(

        newPlayer,

        type

    );







    userData.cards.push(newPlayer);






    saveGame(currentSlot);







    return (

        newPlayer.name

        +

        " 영입 완료!"

    );


}
