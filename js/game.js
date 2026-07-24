// =================================
// KBO CARD GAME
// game.js
// 리그 경기 시스템
// =================================



// 현재 스테이지

let leagueStage = 1;



// 최대 스테이지

const MAX_STAGE = 50;





// 경기 시작

function startLeague(mode="all"){



    if(!userData.team){

        return "팀을 먼저 선택하세요.";

    }



    let myTeam =
    teams.find(
        t=>t.name===userData.team
    );



    let enemy =
    getEnemyTeam();



    let result =
    playGame(
        myTeam,
        enemy,
        mode
    );



    return result;

}





// 상대 팀 선택

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





// 경기 진행

function playGame(myTeam,enemy,mode){



    let myPower =
    getTeamPower(myTeam.name);



    let enemyPower =
    getTeamPower(enemy.name);



    // 스테이지 보정

    enemyPower +=
    leagueStage*20;



    let random =
    Math.random()*100;



    let winRate =
    50+
    (myPower-enemyPower)/20;



    let win =
    random < winRate;



    if(win){


        userData.win++;


        let reward =
        leagueStage*1000000000;



        addMoney(reward);



        if(
        leagueStage<MAX_STAGE
        ){

            leagueStage++;

            userData.stage=leagueStage;

        }



        saveGame();



        return {

            result:"승리",

            enemy:enemy.name,

            reward:reward,

            stage:leagueStage

        };


    }



    else{


        userData.lose++;



        let reward =
        leagueStage*500000000;



        addMoney(reward);



// =================================
// KBO CARD GAME
// game.js
// 리그 모드 + 시즌 시스템
// =================================



const MAX_STAGE = 50;

const SEASON_GAMES = 144;



// 시즌 데이터

let seasonData = {


    stage:1,


    game:0,


    win:0,


    lose:0


};





// =================================
// 경기 진행 표시
// =================================


function getSeasonProgress(){


    return (

        seasonData.game

        +

        " / "

        +

        SEASON_GAMES

    );

}





// =================================
// 시즌 정보
// =================================


function getSeasonInfo(){


    return {


        stage:
        seasonData.stage,


        progress:
        getSeasonProgress(),


        win:
        seasonData.win,


        lose:
        seasonData.lose


    };


}







// =================================
// 리그 경기 시작
// =================================


function startLeague(mode="all"){



    if(!userData.team){


        return {

            result:"팀 없음",

            message:"팀을 먼저 선택하세요."

        };


    }




    let enemy =
    getEnemyTeam();



    let result =
    playGame(
        userData.team,
        enemy,
        mode
    );




    // 경기 수 증가

    seasonData.game++;




    if(result.result==="승리"){


        seasonData.win++;


    }

    else{


        seasonData.lose++;


    }





    // 시즌 종료 확인

    if(
        seasonData.game >= SEASON_GAMES
    ){


        finishSeason();


        result.seasonEnd=true;


    }




    saveGame();



    return result;


}







// =================================
// 경기 실행
// =================================


function playGame(
myTeam,
enemy,
mode
){



    let myPower =
    getTeamPower(myTeam);



    let enemyPower =
    getTeamPower(enemy.name);




    // 스테이지 난이도 증가

    enemyPower +=
    seasonData.stage*50;




    // 플레이 방식 보정


    if(mode==="attack"){


        myPower += 100;


    }


    else if(mode==="defense"){


        myPower += 50;


    }





    let winRate =


    50

    +

    ((myPower-enemyPower)/30);





    if(winRate<10)

        winRate=10;



    if(winRate>90)

        winRate=90;







    let result =
    Math.random()*100 < winRate;






    if(result){



        let reward =

        seasonData.stage

        *

        1000000000;



        addMoney(reward);



        return {


            result:"승리",


            enemy:
            enemy.name,


            reward:reward,


            progress:
            getSeasonProgress()


        };


    }

    else{



        let reward =

        seasonData.stage

        *

        500000000;



        addMoney(reward);



        return {


            result:"패배",


            enemy:
            enemy.name,


            reward:reward,


            progress:
            getSeasonProgress()


        };


    }



}







// =================================
// 시즌 종료
// =================================


function finishSeason(){



    seasonData.game=0;



    seasonData.win=0;



    seasonData.lose=0;





    if(
        seasonData.stage < MAX_STAGE
    ){


        seasonData.stage++;


    }



    userData.stage =
    seasonData.stage;



    saveGame();



}







// =================================
// 상대 팀 선택
// =================================


function getEnemyTeam(){



    let list =

    teams.filter(

        t=>

        t.name !== userData.team

    );



    return list[

        Math.floor(

            Math.random()*list.length

        )

    ];

}





// =================================
// 팀 전력 계산
// =================================


function getTeamPower(teamName){



    let list =

    players.filter(

        p=>

        p.team===teamName

    );



    if(list.length===0)

        return 0;



    let total=0;



    list.forEach(player=>{


        let power=0;



        Object.values(

            player.stats

        ).forEach(stat=>{


            power+=stat;


        });



        total+=power;


    });




    return total/list.length;



}
