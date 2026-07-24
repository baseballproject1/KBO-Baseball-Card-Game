/// =================================
// KBO CARD GAME
// gacha.js
// 뽑기 시스템
// =================================



// =================================
// 등급 추출
// =================================


function getGachaGrade(type){


    let table;



    if(type==="normal"){


        table =
        GAME_CONFIG.normalGacha;


    }


    else if(type==="premium"){


        table =
        GAME_CONFIG.premiumGacha;


    }


    else{


        return null;

    }





    let random =
    Math.random()*100;



    let sum=0;



    for(let grade in table){


        sum += table[grade];



        if(random < sum){


            return grade;


        }


    }



    return null;


}







// =================================
// 선수 뽑기
// =================================


function drawCard(type){



    let grade =
    getGachaGrade(type);



    if(!grade){

        return null;

    }





    let pool =

    players.filter(

        player=>

        player.grade===grade

    );





    if(pool.length===0){


        console.log(

        "해당 등급 선수 없음 : "

        +

        grade

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





    let card =

    addCard(player);





    return card;



}







// =================================
// 확률 확인용
// =================================


function showGachaRate(type){



    if(type==="normal"){


        return GAME_CONFIG.normalGacha;


    }



    if(type==="premium"){


        return GAME_CONFIG.premiumGacha;


    }



}
