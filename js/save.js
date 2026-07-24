// =================================
// KBO CARD GAME
// save.js
// 5개 저장 슬롯 시스템
// =================================



// 저장 슬롯

const SAVE_SLOTS = [

    "KBO_CARD_GAME_SAVE_1",
    "KBO_CARD_GAME_SAVE_2",
    "KBO_CARD_GAME_SAVE_3",
    "KBO_CARD_GAME_SAVE_4",
    "KBO_CARD_GAME_SAVE_5"

];





// =================================
// 기본 데이터
// =================================


let userData = {


    team:null,


    money:10000000000,


    cards:[],


    items:{},


    stage:1,


    season:{


        game:0,


        win:0,


        lose:0


    }


};






// =================================
// 저장
// =================================


function saveGame(slot=1){



    if(slot<1 || slot>5){

        console.log(
        "잘못된 저장 슬롯"
        );

        return false;

    }



    localStorage.setItem(

        SAVE_SLOTS[slot-1],

        JSON.stringify(userData)

    );



    console.log(

        slot+"번 저장 완료"

    );



    return true;


}






// =================================
// 불러오기
// =================================


function loadGame(slot=1){



    if(slot<1 || slot>5){

        return false;

    }



    let data =

    localStorage.getItem(

        SAVE_SLOTS[slot-1]

    );




    if(!data){

        return false;

    }




    userData =

    JSON.parse(data);




    console.log(

    slot+"번 불러오기 완료"

    );



    return true;


}







// =================================
// 저장 확인
// =================================


function checkSave(slot){



    if(slot<1 || slot>5){

        return false;

    }



    return (

    localStorage.getItem(

        SAVE_SLOTS[slot-1]

    ) !== null

    );


}







// =================================
// 저장 삭제
// =================================


function deleteSave(slot){



    if(slot<1 || slot>5){

        return false;

    }



    localStorage.removeItem(

        SAVE_SLOTS[slot-1]

    );



    return true;


}







// =================================
// 카드 추가
// =================================


function addCard(player){



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
// 카드 제거
// =================================


function removeCard(card){



    let index =

    userData.cards.indexOf(card);



    if(index!==-1){


        userData.cards.splice(

            index,

            1

        );


    }



    saveGame();


}







// =================================
// 돈 추가
// =================================


function addMoney(amount){


    userData.money += amount;


}






// =================================
// 돈 사용
// =================================


function useMoney(amount){



    if(

    userData.money >= amount

    ){


        userData.money -= amount;


        return true;


    }



    return false;


}







// =================================
// 아이템 추가
// =================================


function addItem(item){



    if(

    !userData.items[item]

    ){


        userData.items[item]=0;


    }



    userData.items[item]++;



    saveGame();


}







// =================================
// 아이템 사용
// =================================


function useItem(item){



    if(

    !userData.items[item]

    ||

    userData.items[item]<=0

    ){


        return false;


    }




    userData.items[item]--;



    saveGame();



    return true;


}







// =================================
// 자동 불러오기
// =================================


if(checkSave(1)){


    loadGame(1);


}
