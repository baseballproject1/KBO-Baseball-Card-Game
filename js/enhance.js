// =================================
// KBO CARD GAME
// enhance.js
// 강화 시스템
// =================================



// =================================
// 카드 강화
// =================================


function enhanceCard(card){



    // 최대 강화 확인

    if(
        card.enhance >= GAME_CONFIG.maxEnhance
    ){

        return "최대 강화입니다.";

    }






    // 강화 비용

    let cost =

    (card.enhance + 1)

    *

    GAME_CONFIG.enhanceCostPerLevel;






    if(
        !useMoney(cost)
    ){

        return "돈이 부족합니다.";

    }






    // 현재 강화 단계 확률

    let chance =

    GAME_CONFIG.enhanceRate[

        card.enhance

    ];






    let random =

    Math.random()*100;







    // 성공

    if(
        random <= chance
    ){


        card.enhance++;


        saveGame();



        return (

        "강화 성공! "

        +

        card.enhance

        +

        "강"

        );


    }








    // 실패


    if(card.enhance>0){



        card.enhance--;



        decreaseRandomStat(card);



    }




    saveGame();



    return "강화 실패";



}







// =================================
// 실패 시 랜덤 능력치 감소
// =================================


function decreaseRandomStat(card){



    let stats =

    Object.keys(

        card.stats

    );




    let randomStat =

    stats[

        Math.floor(

            Math.random()

            *

            stats.length

        )

    ];






    if(
        card.stats[randomStat] > 0
    ){


        card.stats[randomStat]--;


    }



}
