// =================================
// KBO CARD GAME
// 선수 뽑기 시스템
// =================================


// 일반 뽑기 확률
// ⚪ 일반 75
// 🔵 A 20
// 🟢 S 5

function normalGacha(){


    let random =
    Math.random()*100;


    let grade;


    if(random < 75){

        grade="⚪";

    }
    else if(random < 95){

        grade="🔵";

    }
    else{

        grade="🟢";

    }



    let list =
    players.filter(
        p=>p.grade===grade
    );



    let player =
    list[
        Math.floor(
            Math.random()*list.length
        )
    ];



    addCard(player);


    return player;

}





// 고급 뽑기
// 🔵 A 60
// 🟢 S 20
// 🟡 골든글러브 15
// 🔴 시그니처 5


function premiumGacha(){


    let random =
    Math.random()*100;


    let grade;



    if(random < 60){

        grade="🔵";

    }
    else if(random < 80){

        grade="🟢";

    }
    else if(random < 95){

        grade="🟡";

    }
    else{

        grade="🔴";

    }



    let list =
    players.filter(
        p=>p.grade===grade
    );



    let player =
    list[
        Math.floor(
            Math.random()*list.length
        )
    ];



    addCard(player);


    return player;

}





// 뽑기권 사용

function drawCard(type){


    let result;


    if(type==="normal"){

        result=normalGacha();

    }


    if(type==="premium"){

        result=premiumGacha();

    }



    return result;

}
