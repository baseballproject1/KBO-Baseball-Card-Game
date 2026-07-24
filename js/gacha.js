// =================================
// KBO CARD GAME
// gacha.js
// 뽑기 시스템
// =================================



// =================================
// 등급 확률
// =================================


const GACHA_RATE = {


    normal:{


        "⚪":50,

        "🔵":20,

        "🟢":15,

        "🟡":5,

        "🔴":5,

        "🟪🟥":5


    },



    premium:{


        "🔵":35,

        "🟢":30,

        "🟡":15,

        "🔴":10,

        "🟪🟥":10


    }


};






// =================================
// 등급 뽑기
// =================================


function getGachaGrade(type){


    let rate =

    GACHA_RATE[type];



    if(!rate)

        return null;




    let random =

    Math.random()*100;



    let total=0;



    for(let grade in rate){


        total += rate[grade];



        if(random < total){


            return grade;


        }


    }


}







// =================================
// 카드 뽑기
// =================================


function drawCard(type="normal"){



    let grade =

    getGachaGrade(type);






    let pool =

    players.filter(

        player =>

        player.grade===grade

    );







    if(pool.length===0){



        console.log(

        grade+" 등급 선수 없음"

        );



        return null;


    }






    let player =

    pool[

        Math.floor(

            Math.random()

            *

            pool.length

        )

    ];







    let card={



        id:player.id,


        name:player.name,


        team:player.team,


        position:player.position,


        grade:player.grade,



        stats:{


            ...player.stats


        },



        trait:

        player.trait || "없음",



        enhance:0



    };







    userData.cards.push(card);



    saveGame();





    return card;


}







// =================================
// 확률 확인
// =================================


function getGachaRate(type){


    return GACHA_RATE[type];


}
