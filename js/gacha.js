// =================================
// KBO CARD GAME
// gacha.js
// 뽑기 시스템
// =================================



// =================================
// 등급 뽑기
// =================================


function getGachaGrade(type){


    let table;



    if(type==="normal"){


        table={

            "⚪":50,

            "🔵":20,

            "🟢":15,

            "🟡":5,

            "🔴":5,

            "🟪🟥":5

        };


    }



    else if(type==="premium"){


        table={


            "🔵":35,

            "🟢":30,

            "🟡":15,

            "🔴":10,

            "🟪🟥":10


        };


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



}







// =================================
// 선수 카드 뽑기
// =================================


function drawCard(type){



    let grade =

    getGachaGrade(type);





    let pool =

    players.filter(

        player =>

        player.grade===grade

    );






    if(pool.length===0){


        console.log(

        "해당 등급 선수 없음"

        );


        return null;


    }






    let player =

    pool[

        Math.floor(

            Math.random()*pool.length

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



    if(type==="normal"){


        return {


            "⚪️":50,

            "🔵":20,

            "🟢":15,

           "🟡":5,

            "🔴":5,

            "🟪🟥":5


        };


    }





    if(type==="premium"){


        return {


            "🔵":35,

            "🟢":30,

            "🟡":15,

            "🔴":10,

            "🟪🟥":10


        };


    }


}
