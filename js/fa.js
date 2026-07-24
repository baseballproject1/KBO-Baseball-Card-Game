// =================================
// KBO CARD GAME
// fa.js
// 자유계약(FA) 시스템
// =================================



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

    "⚪":1000000000,

    "🔵":2000000000,

    "🟢":3000000000,

    "🟡":5000000000,

    "🔴":7000000000,

    "🟪🟥":10000000000

};




// 시즌 FA 제한

const MAX_FA_COUNT = 5;







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




    let list =

    players.filter(

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


        FAprice:

        FA_PRICE[grade]


    };


}








// =================================
// FA 목록 생성
// 항상 6명
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



    let now =
    new Date();





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
        now.getHours() === 0

        &&

        now.getMinutes() === 0

    ){



        if(
            userData.lastFARefresh !== today
        ){



            updateFAList();



            userData.lastFARefresh =
            today;



            saveGame();



        }


    }


}









// =================================
// FA 영입 가능 확인
// =================================

function canSignFA(){



    // 시즌 중 불가

    if(
        gameData.seasonPlaying === true
    ){

        return false;

    }






    // 시즌 제한

    if(

        userData.faCount >= MAX_FA_COUNT

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


        return "시즌 종료 후 FA 영입 가능하며 시즌당 최대 5명입니다.";

    }







    let grade =
    player.grade;






    let contract;





    // 일반 계약서

    if(

        [

            "⚪",

            "🔵",

            "🟢"

        ]

        .includes(grade)

    ){


        contract =
        "normalContract";


    }






    // 고급 계약서

    else if(

        [

            "🟡",

            "🔴",

            "🟪🟥"

        ]

        .includes(grade)

    ){


        contract =
        "premiumContract";


    }







    else{


        return "레전드는 FA 영입이 불가능합니다.";

    }









    // 계약서 확인


    if(

        !userData.items[contract]

        ||

        userData.items[contract] <= 0

    ){


        return "필요한 계약서가 없습니다.";

    }









    // 돈 확인


    if(

        !useMoney(

            FA_PRICE[grade]

        )

    ){


        return "계약금이 부족합니다.";

    }








    // 계약서 사용


    userData.items[contract]--;









    // 팀 등록


    userData.cards.push({

        ...player,

        FA:false

    });







    // 영입 횟수 증가


    userData.faCount++;







    // FA 목록 제거


    userData.FAList =

    userData.FAList.filter(

        p =>

        p.id !== player.id

    );







    saveGame();





    return player.name+" FA 계약 완료!";


}
