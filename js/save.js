// =================================
// KBO CARD GAME
// save.js
// 세이브 슬롯 시스템
// =================================


const SAVE_KEY = "KBO_CARD_GAME_SAVE_SLOTS";

const MAX_SLOT = 5;





// =================================
// 기본 데이터 생성
// =================================

function createDefaultData(){


    return {


        team:null,


        money:10000000000,


        cards:[],


        items:{


            normalTicket:0,

            premiumTicket:0,


            enhanceTicket:0,


            protectTicket:0,


            premiumEnhanceTicket:0,


            normalContract:0,


            premiumContract:0,


            legendContract:0,


            traitChangeTicket:0


        },



        // FA

        FAList:[],


        faCount:0,


        lastFARefresh:"",




        // 시즌

        season:1,


        seasonPlaying:false,



        // 저장 정보

        saveTime:""


    };


}







// =================================
// 전체 슬롯 불러오기
// =================================

function getSaveSlots(){


    let data =

    localStorage.getItem(SAVE_KEY);



    if(!data){


        let slots=[];


        for(
            let i=0;
            i<MAX_SLOT;
            i++
        ){

            slots.push(null);

        }


        return slots;

    }




    return JSON.parse(data);


}







// =================================
// 슬롯 저장
// =================================

function saveGame(slot){



    if(
        slot<1
        ||
        slot>MAX_SLOT
    ){

        return "잘못된 슬롯";

    }





    userData.saveTime =

    new Date().toLocaleString();





    let slots =

    getSaveSlots();





    slots[slot-1]=userData;





    localStorage.setItem(

        SAVE_KEY,

        JSON.stringify(slots)

    );





}







// =================================
// 슬롯 불러오기
// =================================

function loadGame(slot){



    let slots =

    getSaveSlots();





    let data =

    slots[slot-1];







    if(!data){


        userData =

        createDefaultData();


        return false;


    }







    userData=data;





    repairSaveData();





    return true;


}







// =================================
// 슬롯 삭제
// =================================

function deleteSave(slot){



    let slots =

    getSaveSlots();





    slots[slot-1]=null;





    localStorage.setItem(

        SAVE_KEY,

        JSON.stringify(slots)

    );


}







// =================================
// 슬롯 정보 표시
// =================================

function getSlotInfo(){



    let slots =

    getSaveSlots();






    return slots.map((data,index)=>{


        if(!data){


            return {


                slot:index+1,


                empty:true


            };


        }





        return {


            slot:index+1,


            empty:false,


            team:data.team,


            season:data.season,


            money:data.money,


            saveTime:data.saveTime


        };


    });


}







// =================================
// 저장 데이터 보정
// =================================

function repairSaveData(){



    if(!userData.items){

        userData.items={};

    }






    const itemList=[


        "normalTicket",

        "premiumTicket",

        "enhanceTicket",

        "protectTicket",

        "premiumEnhanceTicket",

        "normalContract",

        "premiumContract",

        "legendContract",

        "traitChangeTicket"


    ];





    itemList.forEach(item=>{


        if(
            userData.items[item]===undefined
        ){

            userData.items[item]=0;

        }


    });







    if(!userData.cards){


        userData.cards=[];


    }





    if(!userData.FAList){


        userData.FAList=[];


    }





    if(
        userData.faCount===undefined
    ){

        userData.faCount=0;

    }





    if(
        userData.season===undefined
    ){

        userData.season=1;

    }







    // 선수 데이터 보정

    userData.cards.forEach(player=>{


        if(!player.stats){


            player.stats={

                power:0,

                contact:0,

                speed:0,

                defense:0,

                control:0

            };


        }





        if(
            player.enhance===undefined
        ){

            player.enhance=0;

        }





        if(
            player.trait===undefined
        ){

            player.trait=null;

            player.traitValue=0;

        }





        if(
            player.contractSeason===undefined
        ){

            player.contractSeason=1;

        }



    });





    saveGame(currentSlot);


    }
