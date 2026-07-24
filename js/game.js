// =================================
// KBO CARD GAME
// game.js
// 리그 + 시즌 + 플레이 방식
// =================================


const MAX_STAGE = 50;
const SEASON_GAMES = 144;



let seasonData = {

    stage:1,
    game:0,
    win:0,
    lose:0

};




// 시즌 진행 표시

function getSeasonProgress(){

    return seasonData.game + " / " + SEASON_GAMES;

}




function getSeasonInfo(){

    return {

        stage:seasonData.stage,

        progress:getSeasonProgress(),

        win:seasonData.win,

        lose:seasonData.lose

    };

}




// =================================
// 경기 시작
// mode
// attack = 공격만
// defense = 수비만
// all = 전체플레이
// =================================


function startLeague(mode="all"){



    if(!userData.team){

        return {

            result:"실패",

            message:"팀을 먼저 선택하세요."

        };

    }



    let enemy = getEnemyTeam();



    let result =
    playGame(
        userData.team,
        enemy,
        mode
    );



    seasonData.game++;



    if(result.result==="승리"){

        seasonData.win++;

    }
    else{

        seasonData.lose++;

    }



    if(seasonData.game>=SEASON_GAMES){

        finishSeason();

        result.seasonEnd=true;

    }



    saveGame();


    return result;

}





// =================================
// 경기 계산
// =================================


function playGame(myTeam, enemy, mode){



    let myPower=0;

    let enemyPower=0;



    if(mode==="attack"){


        // 공격만
        myPower =
        getBatPower(myTeam);



        enemyPower =
        getPitchPower(enemy.name);


    }



    else if(mode==="defense"){


        // 수비만
        myPower =
        getPitchPower(myTeam)
        +
        getDefensePower(myTeam);



        enemyPower =
        getBatPower(enemy.name);


    }



    else{


        // 전체 플레이

        myPower =
        getTeamPower(myTeam);



        enemyPower =
        getTeamPower(enemy.name);


    }





    // 스테이지 난이도

    enemyPower +=
    seasonData.stage*50;




    let winRate =

    50 +

    ((myPower-enemyPower)/30);



    if(winRate<10)
        winRate=10;


    if(winRate>90)
        winRate=90;




    let win =
    Math.random()*100 < winRate;





    let reward;



    if(win){


        reward =
        seasonData.stage *
        1000000000;



        addMoney(reward);



        return {

            result:"승리",

            enemy:enemy.name,

            reward:reward,

            progress:getSeasonProgress()

        };


    }



    else{


        reward =
        seasonData.stage *
        500000000;



        addMoney(reward);



        return {

            result:"패배",

            enemy:enemy.name,

            reward:reward,

            progress:getSeasonProgress()

        };


    }



}







// =================================
// 공격력
// =================================


function getBatPower(team){


let list =
players.filter(
p=>p.team===team
);


let total=0;


list.forEach(p=>{


total +=

(p.stats.파워||0)

+

(p.stats.컨택||0)

+

(p.stats.선구||0);


});



return total/list.length;


}







// =================================
// 투수력
// =================================


function getPitchPower(team){


let list =
players.filter(

p=>
p.team===team &&
p.position==="투수"

);



let total=0;



list.forEach(p=>{


total +=

(p.stats.제구||0)

+

(p.stats.구속||0)

+

(p.stats.변화||0);


});



if(list.length===0)

return 0;



return total/list.length;


}







// =================================
// 수비력
// =================================


function getDefensePower(team){


let list =
players.filter(
p=>p.team===team
);



let total=0;



list.forEach(p=>{


total +=

(p.stats.수비||0);


});



return total/list.length;


}







// =================================
// 전체 전력
// =================================


function getTeamPower(team){


let list =
players.filter(
p=>p.team===team
);



let total=0;



list.forEach(p=>{


Object.values(
p.stats
).forEach(v=>{


total+=v;


});


});



return total/list.length;


}







// =================================
// 상대 팀
// =================================


function getEnemyTeam(){


let list =

teams.filter(

t=>t.name!==userData.team

);



return list[

Math.floor(
Math.random()*list.length
)

];


}







// =================================
// 시즌 종료
// =================================


function finishSeason(){



seasonData.game=0;

seasonData.win=0;

seasonData.lose=0;



if(seasonData.stage<MAX_STAGE){

seasonData.stage++;

}



userData.stage =
seasonData.stage;



saveGame();


}
