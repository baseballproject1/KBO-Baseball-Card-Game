// =================================
// KBO CARD GAME
// enhance.js
// 강화 시스템
// =================================


// 강화 성공 확률

const enhanceRate = [

    90,
    85,
    70,
    50,
    45,
    30,
    25,
    20,
    15,
    10

];




// 강화 실행

function enhanceCard(
card,
useEnhanceTicket=false,
useProtectTicket=false,
usePremiumEnhance=false
){



    // 최대 강화

    if(card.enhance >= 10){

        return "이미 10강입니다.";

    }



    // 강화 비용

    let cost =
    (card.enhance + 1) * 100000000;



    if(!useMoney(cost)){

        return "돈이 부족합니다.";

    }



    let chance =
    enhanceRate[card.enhance];



    // 강화권 +10%

    if(useEnhanceTicket){

        chance += 10;

    }



    // 고급 강화권

    if(
    usePremiumEnhance &&
    (
    card.grade==="🔴" ||
    card.grade==="🟪🟥"
    )
    ){

        chance=100;

    }



    let random =
    Math.random()*100;




    // 성공

    if(random <= chance){


        card.enhance++;


        saveGame();


        return (
        "강화 성공! "
        +card.enhance+
        "강"
        );

    }





    // 실패


    if(!useProtectTicket){


        if(card.enhance>0){


            card.enhance--;


            decreaseRandomStat(card);


        }

    }



    saveGame();



    return "강화 실패";

}





// 실패 시 랜덤 스탯 감소

function decreaseRandomStat(card){


    let stats =
    Object.keys(card.stats);



    let random =
    stats[
    Math.floor(
    Math.random()*stats.length
    )
    ];



    if(card.stats[random]>0){

        card.stats[random]--;

    }


}
