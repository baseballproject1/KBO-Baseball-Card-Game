// =================================
// KBO CARD GAME
// fa.js
// 자유계약 선수 시스템
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


    "⚪":1000000000,

    "🔵":2000000000,

    "🟢":3000000000,

    "🟡":5000000000,

    "🔴":7000000000,

    "🟪🟥":10000000000


};





// 시즌 FA 제한

const MAX_FA_SIGN = 5;









// =================================
// 등급 랜덤
// =================================

function randomFAGrade(){



    let random =
    Math.random()*100;



    let total=0;



    for(
        let grade in FA_RATE
    ){


        total += FA_RATE[grade];



        if(random <= total){


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

    players.filter(player=>



        player.grade===grade

        &&

        player.grade!=="🟣"



    );







    if(list.length===0){


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


        faPrice:FA_PRICE[grade]



    };



}









// =================================
// FA 목록 갱신
// =================================

function updateFAList(){



    if(!userData.FAList){


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






    saveGame(currentSlot);


}









// =================================
// 00:00 FA 갱신
// =================================

function checkFARefresh(){



    let now = new Date();



    let date =

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

            userData.lastFARefresh!==date

        ){



            userData.FAList=[];



            updateFAList();



            userData.lastFARefresh=date;



            saveGame(currentSlot);


        }


    }


}









// =================================
// 계약서 확인
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

        userData.seasonPlaying

    ){


        return false;


    }







    if(

        userData.faCount>=MAX_FA_SIGN

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


        return "시즌 종료 후 FA 영입 가능 (시즌당 5명)";


    }








    let contract =

    getFAContract(player);







    if(!contract){


        return "레전드는 FA 영입 불가입니다.";


    }







    if(

        !userData.items[contract]

        ||

        userData.items[contract]<=0

    ){


        return "계약서가 부족합니다.";


    }







    if(

        !useMoney(player.faPrice)

    ){


        return "계약금이 부족합니다.";


    }







    // 계약서 차감

    userData.items[contract]--;







    let newPlayer={


        ...player,


        FA:false,


        contractType:"FA",


        contractSeason:5,


        needRenew:false


    };







    userData.cards.push(newPlayer);







    userData.faCount++;







    userData.FAList =

    userData.FAList.filter(

        p=>p.id!==player.id

    );







    saveGame(currentSlot);







    return (

        player.name

        +

        " FA 영입 완료!"

    );


}
