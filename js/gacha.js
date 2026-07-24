// =================================
// KBO CARD GAME
// gacha.js
// 최종 뽑기 확률
// =================================


// 등급 뽑기 함수

function getRandomGrade(type){

    let r = Math.random()*100;


    // 일반 뽑기
    if(type==="normal"){


        if(r < 50)
            return "⚪";

        else if(r < 70)
            return "🔵";

        else if(r < 85)
            return "🟢";

        else if(r < 90)
            return "🟡";

        else if(r < 95)
            return "🔴";

        else
            return "🟪🟥";

    }



    // 고급 뽑기

    if(type==="premium"){


        if(r < 35)
            return "🔵";

        else if(r < 65)
            return "🟢";

        else if(r < 80)
            return "🟡";

        else if(r < 90)
            return "🔴";

        else
            return "🟪🟥";

    }


}





// 카드 뽑기

function drawCard(type){


    let grade =
    getRandomGrade(type);



    let pool =
    players.filter(
        p=>p.grade===grade
    );



    if(pool.length===0){

        console.log(
        "해당 등급 선수 없음:",
        grade
        );

        return null;

    }



    let player =
    pool[
        Math.floor(
            Math.random()*pool.length
        )
    ];



    addCard(player);



    return player;

}
