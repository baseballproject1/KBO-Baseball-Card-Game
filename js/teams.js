// =================================
// KBO CARD GAME
// 팀 데이터
// =================================


const teams = [

{
name:"SSG 랜더스",
money:10000000000
},

{
name:"삼성 라이온즈",
money:10000000000
},

{
name:"LG 트윈스",
money:10000000000
},

{
name:"두산 베어스",
money:10000000000
},

{
name:"KIA 타이거즈",
money:10000000000
},

{
name:"KT 위즈",
money:10000000000
},

{
name:"롯데 자이언츠",
money:10000000000
},

{
name:"한화 이글스",
money:10000000000
},

{
name:"키움 히어로즈",
money:10000000000
},

{
name:"NC 다이노스",
money:10000000000
}

];


// 팀 선수 찾기

function getTeamPlayers(team){

return players.filter(
p=>p.team===team
);

}
