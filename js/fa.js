// =================================
// KBO CARD GAME
// fa.js
// 자유계약(FA) 시스템
// =================================



// FA 등장 확률

const FA_RATE = {

    "⚪":50,

    "🔵":30,

    "🟢":10,

    "🟡":5,

    "🔴":3,

    "🟪🟥":2

};





// FA 영입 가격

const FA_PRICE = {

    "⚪":1000000000,      // 10억

    "🔵":2000000000,      // 20억

    "🟢":3000000000,      // 30억

    "🟡":5000000000,      // 50억

    "🔴":7000000000,      // 70억

    "🟪🟥":10000000000    // 100억

};





const MAX_FA_SIGN = 5;









// =================================
// FA 등급 랜덤
// =================================

function randomFAGrade(){


    let random =
    Math.random()*100;


    let total = 0;



    for(
        let grade in FA_RATE
    ){


        total += FA_RATE[grade];


        if(
            random <= total
        ){

            return grade;

        }

    }



    return "⚪";

}









// =================================
// FA 선수 생성
// =================================

function createFAPlayer(){



    let grade =
    randomFAGrade();




    let list = players.filter(

        p =>

        p.grade === grade

        &&

        p.grade !== "🟣"

    );





    if(
        list.length === 0
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

        FA:true,

        FAprice:FA_PRICE[grade]

    };


}









// =================================
// FA 목록 6명 유지
// =================================

function updateFAList(){



    if(
        !userData.FAList
    ){

        userData.FAList=[];

    }






    while(

        userData.FAList.length < 6

    ){



        let player =
        createFAPlayer();



        if(player){

            userData.FAList.push(player);

        }


    }






    saveGame();


}









// =================================
// 매일 00:00 FA 갱신
// =================================

function checkFARefresh(){



    let now = new Date();



    let today =

    now.getFullYear()

    +

    "-"

    +

    (now.getMonth()+1)

    +

    "-"

    +

    now.getDate();







    if(

        now.getHours()===0

        &&

        now.getMinutes()===0

    ){



        if(

            userData.lastFARefresh !== today

        ){


            updateFAList();


            userData.lastFARefresh=today;


            saveGame();


        }


    }


}









// =================================
// FA 계약서 확인
// =================================

function getFAContract(player){



    if(

        [

            "⚪",

            "🔵",

            "🟢"

        ]

        .includes(player.grade)

    ){

        return "normalContract";

    }







    if(

        [

            "🟡",

            "🔴",

            "🟪🟥"

        ]

        .includes(player.grade)

    ){

        return "premiumContract";

    }






    return null;


}









// =================================
// FA 영입 가능 확인
// =================================

function canSignFA(){



    if(

        gameData.seasonPlaying

    ){

        return false;

    }





    if(

        userData.faCount >= MAX_FA_SIGN

    ){

        return false;

    }



    return true;


}









// =================================
// FA 영입
// =================================

function signFA(player){



    if(

        !canSignFA()

    ){

        return "시즌 종료 후 FA 영입 가능 (시즌당 최대 5명)";

    }






    let contract =

    getFAContract(player);






    if(!contract){


        return "레전드는 FA 영입 불가입니다.";

    }








    // 계약서 확인


    if(

        !userData.items[contract]

        ||

        userData.items[contract] <=0

    ){

        return "필요한 계약서가 없습니다.";

    }








    // 계약금 지불


    if(

        !useMoney(

            FA_PRICE[player.grade]

        )

    ){

        return "계약금이 부족합니다.";

    }








    // 계약서 차감


    userData.items[contract]--;








    // 선수 계약 5시즌


    let newPlayer={


        ...player,


        FA:false,


        contractType:"FA",


        contractSeason:5,


        needRenew:false


    };







    userData.cards.push(newPlayer);







    // FA 횟수 증가


    userData.faCount++;







    // FA 목록 제거


    userData.FAList =

    userData.FAList.filter(

        p =>

        p.id !== player.id

    );






    saveGame();






    return player.name+" FA 영입 완료!";


}
