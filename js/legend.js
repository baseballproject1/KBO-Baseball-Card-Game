// =================================
// KBO CARD GAME
// legend.js
// 레전드 제작 시스템
// =================================



// 레전드 제작 비용

const LEGEND_COST = 15000000000;



// 레전드 제작

function makeLegend(signatureCard){



    // 시그니처 확인

    if(
    signatureCard.grade !== "🔴"
    ){

        return "시그니처 카드만 제작 가능합니다.";

    }



    // 이미 레전드 존재 확인

    let alreadyLegend =
    userData.cards.some(
        c=>
        c.name===signatureCard.name &&
        c.grade==="🟪🟥"
    );



    if(alreadyLegend){

        return "이미 레전드가 있습니다.";

    }





    // 팀 레전드 개수 확인

    let teamLegendCount =
    userData.cards.filter(
        c=>
        c.team===signatureCard.team &&
        c.grade==="🟪🟥"
    ).length;



    if(teamLegendCount>=5){

        return "팀 레전드는 최대 5명입니다.";

    }





    // 돈 확인

    if(
    !useMoney(LEGEND_COST)
    ){

        return "제작 비용이 부족합니다.";

    }





    // 골든글러브 확인

    let goldCards =
    userData.cards.filter(
        c=>
        c.name===signatureCard.name &&
        c.grade==="🟡"
    );



    if(goldCards.length < 2){

        userData.money += LEGEND_COST;

        return "같은 선수 골든글러브 2장이 필요합니다.";

    }





    // S등급 확인

    let sCards =
    userData.cards.filter(
        c=>
        c.team===signatureCard.team &&
        c.grade==="🟢"
    );



    if(sCards.length < 5){

        userData.money += LEGEND_COST;

        return "같은 팀 S등급 5장이 필요합니다.";

    }





    // 재료 제거


    removeCard(signatureCard);



    removeCard(goldCards[0]);

    removeCard(goldCards[1]);



    for(let i=0;i<5;i++){

        removeCard(sCards[i]);

    }





    // 레전드 카드 생성


    let legendCard = {


        id:
        signatureCard.id,

        name:
        signatureCard.name,

        team:
        signatureCard.team,

        position:
        signatureCard.position,

        grade:
        "🟪🟥",

        legend:true,

        enhance:0,


        stats:{


            ...signatureCard.stats,


            파워:
            (signatureCard.stats.파워||0)+5,


            컨택:
            (signatureCard.stats.컨택||0)+5,


            수비:
            (signatureCard.stats.수비||0)+5,


            속도:
            (signatureCard.stats.속도||0)+5,


            선구:
            (signatureCard.stats.선구||0)+5


        },


        trait:
        "리빙 레전드"

    };





    userData.cards.push(
        legendCard
    );



    saveGame();



    return "레전드 제작 완료!";

}





// 카드 제거

function removeCard(card){


    let index =
    userData.cards.indexOf(card);



    if(index !== -1){

        userData.cards.splice(
            index,
            1
        );

    }

}
