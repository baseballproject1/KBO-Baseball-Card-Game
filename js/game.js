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



        saveGame();



        return {


            result:"패배",

            enemy:enemy.name,

            reward:reward,

            stage:leagueStage

        };


    }

}





// 팀 전력 계산

function getTeamPower(teamName){



    let list =
    players.filter(
        p=>p.team===teamName
    );



    let total=0;



    list.forEach(p=>{


        let stat=0;


        Object.values(
            p.stats
        ).forEach(v=>{

            stat+=v;

        });


        total+=stat;


    });



    return total/list.length;

}
