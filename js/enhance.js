// =================================
// KBO CARD GAME
// enhance.js
// 선수 강화 시스템
// =================================



// 강화 성공 확률

const ENHANCE_RATE = [

    90, // 0→1

    85, // 1→2

    70, // 2→3

    50, // 3→4

    45, // 4→5

    30, // 5→6

    25, // 6→7

    20, // 7→8

    15, // 8→9

    10  // 9→10

];





// 강화 시 감소 가능한 스탯

const ENHANCE_STATS = [

    "power",

    "contact",

    "speed",

    "defense",

    "control"

];









// =================================
// 강화 비용 계산
// =================================

function getEnhanceCost(level){


    return (

        level + 1

    )

    *

    100000000;


}









// =================================
// 고급강화권 대상 확인
// =================================

function premiumEnhancePossible(player){



    return (

        player.grade==="🔴"

        ||

        player.grade==="🟪🟥"

        ||

        player.grade==="🟣"

    );


}









// =================================
// 선수 강화 실행
// =================================

function enhancePlayer(player){



    let level =

    player.enhance || 0;





    if(level>=10){


        return "최대 강화입니다.";

    }








    let cost =

    getEnhanceCost(level);







    if(
        !useMoney(cost)
    ){

        return "강화 비용이 부족합니다.";

    }







    let chance =

    ENHANCE_RATE[level];








    // 고급강화권 우선 사용

    if(

        userData.items.premiumEnhanceTicket

        &&

        userData.items.premiumEnhanceTicket > 0

        &&

        premiumEnhancePossible(player)

    ){


        chance=100;


        userData.items.premiumEnhanceTicket--;


    }



    // 일반 강화권 사용

    else if(

        userData.items.enhanceTicket

        &&

        userData.items.enhanceTicket > 0

    ){


        chance += 10;


        userData.items.enhanceTicket--;


    }








    let result =

    Math.random()*100 <= chance;









    // 성공

    if(result){



        player.enhance =

        level + 1;




        saveGame();



        return (

            player.name

            +

            " "

            +

            player.enhance

            +

            "강 성공!"

        );


    }









    // 실패

    let protect = false;





    if(

        userData.items.protectTicket

        &&

        userData.items.protectTicket > 0

    ){


        protect=true;


        userData.items.protectTicket--;


    }









    // 하락방지권 없음

    if(!protect){



        // 0강 실패

        if(level===0){



            player.enhance=0;



        }




        // 1강 이상 실패

        else{



            player.enhance =

            level - 1;



            decreaseRandomStat(player);



        }


    }








    saveGame();





    return (

        player.name

        +

        " 강화 실패!"

    );


}









// =================================
// 실패 시 랜덤 스탯 감소
// =================================

function decreaseRandomStat(player){



    if(
        !player.stats
    ){

        return;

    }







    let stat =

    ENHANCE_STATS[

        Math.floor(

            Math.random()

            *

            ENHANCE_STATS.length

        )

    ];








    if(
        player.stats[stat] > 0
    ){


        player.stats[stat]--;


    }


}









// =================================
// 강화 표시
// =================================

function getEnhanceLevel(player){



    return (

        player.enhance || 0

    )

    +

    "강";


}
