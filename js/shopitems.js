// =================================
// KBO CARD GAME
// shopitems.js
// 상점 시스템
// =================================



const shopItems = {


// 일반 뽑기권

normalTicket:{

name:"일반 뽑기권",

price:100000000,

type:"ticket"

},



// 고급 뽑기권

premiumTicket:{

name:"고급 뽑기권",

price:500000000,

type:"ticket"

},



// 강화권

enhanceTicket:{

name:"강화권",

price:300000000,

type:"item",

effect:"강화 성공 확률 +10%"

},



// 하락 방지권

protectTicket:{

name:"하락방지권",

price:500000000,

type:"item",

effect:"강화 실패 시 하락 방지"

},



// 특성 변경권

traitChangeTicket:{

name:"특성 변경권",

price:800000000,

type:"item",

effect:"선수 특성 변경"

},



// 고급 강화권

premiumEnhanceTicket:{

name:"고급 강화권",

price:3000000000,

type:"item",

effect:"시그니처/레전드 강화 100%"

}


};





// =================================
// 아이템 구매
// =================================


function buyItem(itemKey){



let item =
shopItems[itemKey];



if(!item){

return "없는 아이템입니다.";

}



if(!useMoney(item.price)){


return "돈이 부족합니다.";

}



if(!userData.items){

userData.items={};

}




if(!userData.items[itemKey]){

userData.items[itemKey]=0;

}



userData.items[itemKey]++;



saveGame();



return item.name+" 구매 완료";

}





// =================================
// 아이템 사용
// =================================


function useItem(itemKey){



if(
!userData.items ||
!userData.items[itemKey] ||
userData.items[itemKey]<=0
){

return false;

}



userData.items[itemKey]--;



saveGame();



return true;

}
