// =================================
// KBO CARD GAME
// legend.js
// 레전드 제작 시스템
// =================================



function makeLegend(legendSignatureCard){



    // 해당 선수 레전드 시그니처 확인

    if(
        legendSignatureCard.grade !== "🟪🟥"
    ){

        return "레전드 시그니처 카드가 필요합니다.";

    }






    // 계약서 확인

    if(
        !userData.items.legendContract
        ||
        userData.items.legendContract <= 0
    ){

        return "레전드 계약서가 필요합니다.";

    }







    // 제작 비용 100억

    if(
        !useMoney(
            10000000000
        )
    ){

        return "100억이 필요합니다.";

    }







    // 같은 팀 골든글러브 확인


    let goldCards =

    userData.cards.filter(

        card =>

        card.team === legendSignatureCard.team

        &&

        card.grade === "🟡"

    );




    if(
        goldCards.length < 2
    ){


        addMoney(10000000000);


        return "같은 팀 골든글러브 2장이 필요합니다.";

    }








    // 같은 팀 S등급 확인


    let sCards =

    userData.cards.filter(

        card =>

        card.team === legendSignatureCard.team

        &&

        card.grade === "🟢"

    );





    if(
        sCards.length < 5
    ){


        addMoney(10000000000);


        return "같은 팀 S등급 5장이 필요합니다.";

    }







    // 재료 제거


    removeCard(
        legendSignatureCard
    );



    removeCard(
        goldCards[0]
    );


    removeCard(
        goldCards[1]
    );





    for(
        let i=0;
        i<5;
        i++
    ){

        removeCard(
            sCards[i]
        );

    }







    // 계약서 사용

    useItem(
        "legendContract"
    );








    // 레전드 카드 생성


    let legendCard = {


        id:

        legendSignatureCard.id
        +
        "_legend",



        name:

        legendSignatureCard.name,



        team:

        legendSignatureCard.team,



        position:

        legendSignatureCard.position,



        grade:

        "🟣",



        trait:

        "리빙 레전드",



        enhance:

        0,



        stats:{



            파워:

            legendSignatureCard.stats.파워 + 5,



            컨택:

            legendSignatureCard.stats.컨택 + 5,



            선구:

            legendSignatureCard.stats.선구 + 5,



            수비:

            legendSignatureCard.stats.수비 + 5,



            주루:

            legendSignatureCard.stats.주루 + 5



        }


    };







    userData.cards.push(

        legendCard

    );





    saveGame();






    return "레전드 제작 완료!";



}
