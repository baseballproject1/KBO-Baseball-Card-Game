// =================================
// KBO CARD GAME
// gacha.js
// 선수 뽑기 시스템
// =================================



// =================================
// 일반 뽑기 확률
// =================================

const NORMAL_GACHA_RATE = {


    "⚪":75,

    "🔵":20,

    "🟢":5


};





// =================================
// 고급 뽑기 확률
// =================================

const PREMIUM_GACHA_RATE = {


    "🟡":60,

    "🔴":30,

    "🟪🟥":10


};









// =================================
// 등급 랜덤
// =================================

function randomGachaGrade(rate){



    let random =

    Math.random()*100;



    let total = 0;






    for(let grade in rate){


        total += rate[grade];



        if(random <= total){


            return grade;


        }


    }



    return Object.keys(rate)[0];


}









// =================================
// 선수 선택
// =================================

function getRandomPlayerByGrade(grade){



    let list = players.filter(player =>



        player.grade === grade



    );







    if(list.length===0){


        return null;


    }






    return list[

        Math.floor(

            Math.random()*list.length

        )

    ];



}









// =================================
// 일반 뽑기
// =================================

function normalGacha(){



    let grade =

    randomGachaGrade(

        NORMAL_GACHA_RATE

    );






    let player =

    getRandomPlayerByGrade(

        grade

    );






    return player;


}









// =================================
// 고급 뽑기
// =================================

function premiumGacha(){



    let grade =

    randomGachaGrade(

        PREMIUM_GACHA_RATE

    );






    let player =

    getRandomPlayerByGrade(

        grade

    );







    return player;


}









// =================================
// 게임 연결용
// =================================

function gachaDraw(type="normal"){



    let player;







    if(type==="normal"){



        if(

            userData.items.normalTicket<=0

        ){

            return null;


        }





        userData.items.normalTicket--;



        player = normalGacha();



    }








    else if(type==="premium"){



        if(

            userData.items.premiumTicket<=0

        ){

            return null;


        }





        userData.items.premiumTicket--;



        player = premiumGacha();



    }








    else{


        return null;


    }







    if(!player){


        return null;


    }








    return {


        ...player,


        enhance:0,


        contractType:"normal",


        contractSeason:1,


        needRenew:false,


        trait:null,


        traitValue:0


    };


}
