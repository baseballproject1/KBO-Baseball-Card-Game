// =================================
// KBO CARD GAME
// gacha.js
// 뽑기 시스템
// =================================



// =================================
// 일반 뽑기 확률
// ⚪50 🔵20 🟢15 🟡5 🔴5 🟪🟥0
// =================================

const NORMAL_GACHA_RATE = {

    "⚪":50,

    "🔵":20,

    "🟢":15,

    "🟡":5,

    "🔴":3,

   "🟪🟥"2
};






// =================================
// 고급 뽑기 확률
// 🟡15 🔴10 🟪🟥10
// =================================

const PREMIUM_GACHA_RATE = {


    "🔵":60,

    "🟢":20,

    "🟡":10,

    "🔴":6,

    "🟪🟥":4

};









// =================================
// 등급 랜덤
// =================================

function randomGrade(rate){


    let random =
    Math.random()*100;


    let total=0;



    for(
        let grade in rate
    ){


        total += rate[grade];


        if(random <= total){

            return grade;

        }

    }



    return "⚪";


}









// =================================
// 선수 뽑기
// =================================

function drawPlayer(rate){



    let grade =
    randomGrade(rate);





    let list = players.filter(

        p =>

        p.grade === grade

        &&

        p.grade !== "🟣"

    );





    if(
        list.length===0
    ){

        return null;

    }






    let player =

    list[

        Math.floor(

            Math.random()

            *

            list.length

        )

    ];





    return {

        ...player,

        contractType:"normal",

        contractSeason:1,

        needRenew:false

    };


}









// =================================
// 일반 뽑기
// =================================

function normalGacha(){



    if(

        !userData.items.normalTicket

        ||

        userData.items.normalTicket<=0

    ){

        return "일반 뽑기권이 없습니다.";

    }







    userData.items.normalTicket--;








    let player =

    drawPlayer(

        NORMAL_GACHA_RATE

    );







    if(!player){

        return "뽑기 실패";

    }







    userData.cards.push(player);







    saveGame();







    return player.name+" 획득!";

}









// =================================
// 고급 뽑기
// =================================

function premiumGacha(){



    if(

        !userData.items.premiumTicket

        ||

        userData.items.premiumTicket<=0

    ){

        return "고급 뽑기권이 없습니다.";

    }







    userData.items.premiumTicket--;







    let player =

    drawPlayer(

        PREMIUM_GACHA_RATE

    );








    if(!player){

        return "뽑기 실패";

    }







    userData.cards.push(player);







    saveGame();







    return player.name+" 획득!";

}









// =================================
// 10회 뽑기
// =================================

function multiGacha(type,count=10){



    let result=[];



    for(
        let i=0;
        i<count;
        i++
    ){


        let player;



        if(type==="normal"){

            player =
            drawPlayer(
                NORMAL_GACHA_RATE
            );

        }

        else{


            player =
            drawPlayer(
                PREMIUM_GACHA_RATE
            );

        }





        if(player){

            userData.cards.push(player);

            result.push(player);

        }


    }




    saveGame();



    return result;


}
