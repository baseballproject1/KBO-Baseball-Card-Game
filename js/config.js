// =================================
// KBO CARD GAME
// config.js
// 게임 기본 설정
// =================================



const GAME_CONFIG = {



// 시즌 설정

seasonGames:144,

maxStage:50,





// 스테이지 보상

winRewardPerStage:1000000000, 
// 승리 보상 = 스테이지 × 10억


loseRewardPerStage:500000000,
// 패배 보상 = 스테이지 × 5억





// 레전드 제작

legendCost:15000000000,
// 150억



maxLegendPerTeam:5,






// 강화 설정


maxEnhance:10,



// 강화 성공 확률

enhanceRate:[

    90,
    85,
    70,
    50,
    45,
    30,
    25,
    20,
    15,
    10

],





// 강화 비용

enhanceCostPerLevel:100000000,
// 강화 단계 × 1억





// 강화권 효과

enhanceTicketBonus:10,



// 고급 강화권

premiumEnhanceRate:100,







// 일반 뽑기 확률


normalGacha:{


    "⚪":50,

    "🔵":20,

    "🟢":15,

    "🟡":5,

    "🔴":5,

    "🟪🟥":5


},






// 고급 뽑기 확률


premiumGacha:{


    "🔵":35,

    "🟢":30,

    "🟡":15,

    "🔴":10,

    "🟪🟥":10


}





};
