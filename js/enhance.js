// =================================
// KBO CARD GAME
// enhance.js
// 선수 강화 시스템
// =================================



// 강화 성공 확률
// 현재 강화 단계 기준

const ENHANCE_RATE = [

    90, // 0 → 1강

    85, // 1 → 2강

    70, // 2 → 3강

    50, // 3 → 4강

    45, // 4 → 5강

    30, // 5 → 6강

    25, // 6 → 7강

    20, // 7 → 8강

    15, // 8 → 9강

    10  // 9 → 10강

];






// 강화 스탯

const STATS = [

    "power",

    "contact",

    "speed",

    "defense",

    "control"

];









// =================================
// 강화 비용
// =================================

function getEnhanceCost(level){


    return (

        level + 1

    )

    *

    100000000;


}









// =================================
// 고급강화권 대상
// =================================

function isPremiumEnhance(player){



    return (

        player.grade==="🔴"

        ||

        player.grade==="🟪🟥"

        ||

        player.grade==="🟣"

    );


}









// =================================
// 강화
// =================================

function enhancePlayer(player){



    let level =
    player.enhance || 0;






    if(
        level>=10
    ){

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








    // 고급강화권

    if(

        userData.items.premiumEnhanceTicket

        &&

        isPremiumEnhance(player)

    ){


        chance=100;


        userData.items.premiumEnhanceTicket--;


    }






    // 강화권

    else if(

        userData.items.enhanceTicket

    ){


        chance +=10;


        userData.items.enhanceTicket--;


    }









    let success =

    Math.random()*100 <= chance;









    if(success){



        player.enhance =
        level+1;



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









    // 실패 처리



    let protect=false;



    if(

        userData.items.protectTicket

        &&

        userData.items.protectTicket>0

    ){


        protect=true;


        userData.items.protectTicket--;


    }







    if(!protect){



        if(level>0){



            player.enhance =
            level-1;




            decreaseRandomStat(player);



        }



    }







    saveGame();




    return player.name+" 강화 실패!";



}









// =================================
// 실패 시 랜덤 스탯 감소
// =================================

function decreaseRandomStat(player){



    let stat =

    STATS[

        Math.floor(

            Math.random()

            *

            STATS.length

        )

    ];




    if(
        player.stats
        &&
        player.stats[stat]
    ){


        player.stats[stat]--;


    }


}









// =================================
// 강화 단계 표시
// =================================

function getEnhanceText(player){



    if(
        !player.enhance
    ){

        return "0강";

    }



    return player.enhance+"강";

}
