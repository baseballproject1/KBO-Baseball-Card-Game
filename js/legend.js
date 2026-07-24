// =================================
// KBO CARD GAME
// legend.js
// 레전드 제작 시스템
// =================================



const LEGEND_CREATE_COST = 10000000000;





// =================================
// 레전드 제작 가능 확인
// =================================

function canCreateLegend(signatureCard){



    if(
        signatureCard.grade !== "🔴"
    ){

        return "시그니처 카드만 제작 가능합니다.";

    }







    let team =
    signatureCard.team;






    // 같은 팀 골글 확인

    let goldCount =

    userData.cards.filter(

        c =>

        c.team === team

        &&

        c.grade === "🟡"

    ).length;






    if(
        goldCount < 2
    ){

        return "같은 팀 골든글러브 2장이 필요합니다.";

    }







    // 같은 팀 S 확인

    let sCount =

    userData.cards.filter(

        c =>

        c.team === team

        &&

        c.grade === "🟢"

    ).length;







    if(
        sCount < 5
    ){

        return "같은 팀 S등급 5장이 필요합니다.";

    }







    // 레전드 계약서 확인

    if(

        !userData.items.legendContract

        ||

        userData.items.legendContract <=0

    ){

        return "레전드 계약서가 필요합니다.";

    }








    // 돈 확인

    if(

        userData.money < LEGEND_CREATE_COST

    ){

        return "제작 비용 100억이 필요합니다.";

    }







    return true;


}









// =================================
// 레전드 제작
// =================================

function createLegend(signatureCard){



    let check =

    canCreateLegend(signatureCard);





    if(check !== true){


        return check;


    }








    let team =

    signatureCard.team;









    // 비용 차감

    userData.money -=

    LEGEND_CREATE_COST;







    // 계약서 차감

    userData.items.legendContract--;








    // 재료 제거

    let removeGold = 2;


    let removeS = 5;







    userData.cards =

    userData.cards.filter(card=>{



        if(

            card.id === signatureCard.id

        ){

            return false;

        }







        if(

            card.team===team

            &&

            card.grade==="🟡"

            &&

            removeGold>0

        ){

            removeGold--;

            return false;

        }








        if(

            card.team===team

            &&

            card.grade==="🟢"

            &&

            removeS>0

        ){

            removeS--;

            return false;

        }





        return true;


    });









    // 레전드 생성

    let legendCard = {


        ...signatureCard,


        grade:"🟣",


        contractType:"legend",


        contractSeason:-1,


        needRenew:false,


        legend:true,


        FA:false


    };







    userData.cards.push(legendCard);







    saveGame();







    return (

        legendCard.name

        +

        " 레전드 제작 완료!"

    );


}
