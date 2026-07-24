// =================================
// KBO CARD GAME
// shopitems.js
// 상점 아이템
// =================================



const SHOP_ITEMS = {





// =================================
// 뽑기권
// =================================


normalTicket:{


    id:"normalTicket",

    name:"일반 뽑기권",

    price:100000000,

    type:"gacha",

    effect:"일반 뽑기 1회"


},




premiumTicket:{


    id:"premiumTicket",

    name:"고급 뽑기권",

    price:500000000,

    type:"gacha",

    effect:"고급 뽑기 1회"


},







// =================================
// 강화 아이템
// =================================



enhanceTicket:{


    id:"enhanceTicket",

    name:"강화권",

    price:300000000,

    type:"enhance",

    effect:"강화 성공 확률 +10%"


},






protectTicket:{


    id:"protectTicket",

    name:"하락방지권",

    price:500000000,

    type:"enhance",

    effect:"강화 실패 시 하락 방지"


},






premiumEnhanceTicket:{


    id:"premiumEnhanceTicket",

    name:"고급강화권",

    price:1000000000,

    type:"enhance",


    allowGrade:[

        "🔴",

        "🟪🟥",

        "🟣"

    ],


    effect:

    "시그니처/레전드시그니처/레전드 강화 100%"


},







// =================================
// FA / 트레이드 계약서
// =================================



normalContract:{


    id:"normalContract",

    name:"일반 계약서",

    price:500000000,

    type:"contract",


    allowGrade:[


        "⚪",

        "🔵",

        "🟢"


    ],


    effect:

    "일반/A/S 등급 FA 및 트레이드 가능"


},







premiumContract:{


    id:"premiumContract",

    name:"고급 계약서",

    price:2000000000,

    type:"contract",


    allowGrade:[


        "🟡",

        "🔴",

        "🟪🟥"


    ],


    effect:

    "골든글러브/시그니처/레전드시그니처 FA 및 트레이드 가능"


},







// =================================
// 레전드 제작
// =================================



legendContract:{


    id:"legendContract",

    name:"레전드 계약서",

    price:10000000000,

    type:"legend",


    allowGrade:[


        "🟪🟥"


    ],


    effect:

    "🟪🟥 레전드 시그니처 + 재료로 🟣 레전드 제작"


}







};









// =================================
// 아이템 구매
// =================================


function buyItem(itemId){



    let item = SHOP_ITEMS[itemId];



    if(!item){


        return "없는 아이템입니다.";

    }






    if(
        !useMoney(item.price)
    ){

        return "돈이 부족합니다.";

    }






    if(
        !userData.items[itemId]
    ){

        userData.items[itemId]=0;

    }






    userData.items[itemId]++;





    saveGame();





    return item.name+" 구매 완료!";


}
