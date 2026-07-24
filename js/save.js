// =================================
// KBO CARD GAME
// save.js
// 5개 저장 슬롯 시스템
// =================================


// 현재 플레이 데이터

let userData = {

    team:null,

    money:10000000000,

    cards:[],

    level:1,

    stage:1,

    win:0,

    lose:0,

    day:1

};



// 저장 슬롯 이름

const SAVE_SLOTS = [

    "KBO_CARD_GAME_SAVE_1",
    "KBO_CARD_GAME_SAVE_2",
    "KBO_CARD_GAME_SAVE_3",
    "KBO_CARD_GAME_SAVE_4",
    "KBO_CARD_GAME_SAVE_5"

];




// 슬롯 저장

function saveGame(slot){


    if(slot < 1 || slot > 5){

        console.log("잘못된 저장 슬롯");

        return false;

    }



    localStorage.setItem(

        SAVE_SLOTS[slot-1],

        JSON.stringify(userData)

    );



    console.log(
        slot+"번 슬롯 저장 완료"
    );


    return true;

}




// 슬롯 불러오기

function loadGame(slot){


    if(slot < 1 || slot > 5){

        console.log("잘못된 슬롯");

        return false;

    }



    let data =

    localStorage.getItem(

        SAVE_SLOTS[slot-1]

    );



    if(data){


        userData = JSON.parse(data);



        console.log(

            slot+"번 슬롯 불러오기 완료"

        );


        return true;

    }



    console.log(

        "저장 데이터 없음"

    );


    return false;

}





// 슬롯 삭제

function deleteSave(slot){


    if(slot < 1 || slot > 5){

        return false;

    }



    localStorage.removeItem(

        SAVE_SLOTS[slot-1]

    );



    console.log(

        slot+"번 슬롯 삭제 완료"

    );


    return true;

}





// 저장 슬롯 확인

function checkSave(slot){


    if(slot < 1 || slot > 5){

        return false;

    }



    return localStorage.getItem(

        SAVE_SLOTS[slot-1]

    ) !== null;

}





// 카드 추가

function addCard(player){


    userData.cards.push({

        id:player.id,

        name:player.name,

        team:player.team,

        position:player.position,

        grade:player.grade,

        stats:player.stats,

        trait:player.trait,

        enhance:0

    });


}




// 돈 추가

function addMoney(amount){


    userData.money += amount;


}




// 돈 사용

function useMoney(amount){


    if(userData.money >= amount){


        userData.money -= amount;


        return true;


    }


    return false;


}





// 초기 자동 불러오기
// 1번 슬롯 확인

if(checkSave(1)){

    loadGame(1);

}
