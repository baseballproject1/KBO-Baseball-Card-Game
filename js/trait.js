// =================================
// KBO CARD GAME
// trait.js
// 특성 시스템 최종본
// =================================



const TRAITS = {

    batter: [
        { name: "홈런왕", stat: "파워", value: 5, tier: "일반" },
        { name: "공수겸장", stat: "수비", value: 5, tier: "일반" },
        { name: "베테랑투혼", stat: "선구", value: 5, tier: "일반" },
        { name: "클러치 히터", stat: "컨택", value: 5, tier: "일반" },
        { name: "정교한 타격", stat: "컨택", value: 5, tier: "일반" },
        { name: "장타 본능", stat: "파워", value: 5, tier: "일반" },
        { name: "빠른 발", stat: "주루", value: 5, tier: "일반" },
        { name: "수비 장인", stat: "수비", value: 5, tier: "일반" },
        { name: "선구안", stat: "선구", value: 5, tier: "일반" },
        { name: "초구 공략", stat: "컨택", value: 5, tier: "고급" },

        { name: "해결사", stat: "파워", value: 7, tier: "고급" },
        { name: "장타력 괴물", stat: "파워", value: 7, tier: "고급" },
        { name: "수비 스페셜리스트", stat: "수비", value: 7, tier: "고급" },
        { name: "주루 마스터", stat: "주루", value: 7, tier: "고급" },
        { name: "타격 천재", stat: "컨택", value: 7, tier: "고급" },
        { name: "출루 머신", stat: "선구", value: 7, tier: "고급" },
        { name: "역전의 사나이", stat: "파워", value: 7, tier: "고급" },
        { name: "침착한 타자", stat: "선구", value: 7, tier: "고급" },
        { name: "스프린터", stat: "주루", value: 7, tier: "고급" },
        { name: "철벽 내야수", stat: "수비", value: 7, tier: "고급" }
    ],

    pitcher: [
        { name: "강심장", stat: "제구", value: 5, tier: "일반", trigger: "지고 있을 때 발동" },
        { name: "에이스", stat: "구속", value: 5, tier: "일반" },
        { name: "정밀 제구", stat: "제구", value: 5, tier: "일반" },
        { name: "강속구", stat: "구속", value: 5, tier: "일반" },
        { name: "변화구 장인", stat: "변화", value: 5, tier: "일반" },
        { name: "탈삼진 머신", stat: "구속", value: 5, tier: "일반" },
        { name: "위기관리", stat: "제구", value: 5, tier: "일반" },
        { name: "완투형", stat: "체력", value: 5, tier: "일반" },
        { name: "불펜 핵심", stat: "체력", value: 5, tier: "일반" },
        { name: "마무리 본능", stat: "제구", value: 5, tier: "고급" },

        { name: "위기극복", stat: "제구", value: 7, tier: "고급" },
        { name: "삼진 본능", stat: "구속", value: 7, tier: "고급" },
        { name: "정교한 제구", stat: "제구", value: 7, tier: "고급" },
        { name: "압도적 구위", stat: "구속", value: 7, tier: "고급" },
        { name: "커브 마스터", stat: "변화", value: 7, tier: "고급" },
        { name: "에이스 본색", stat: "체력", value: 7, tier: "고급" },
        { name: "철벽 마무리", stat: "제구", value: 7, tier: "고급" },
        { name: "선발 에이스", stat: "체력", value: 7, tier: "고급" },
        { name: "불꽃 투혼", stat: "구속", value: 7, tier: "고급" },
        { name: "변화무쌍", stat: "변화", value: 7, tier: "고급" }
    ],

    legend: [
        { name: "리빙 레전드", stat: "전체", value: 10, tier: "레전드" },
        { name: "시대를 지배한 타자", stat: "전체", value: 8, tier: "레전드" },
        { name: "불멸의 에이스", stat: "전체", value: 8, tier: "레전드" },
        { name: "전설의 품격", stat: "전체", value: 6, tier: "레전드" },
        { name: "왕조의 중심", stat: "전체", value: 6, tier: "레전드" }
    ]
};



// ---------------------------------
// 특성 랜덤 선택
// ---------------------------------

function randomTrait(player) {
    let pool = TRAITS.batter;

    if (player.position === "투수") {
        pool = TRAITS.pitcher;
    }

    if (player.grade === "🟣") {
        pool = TRAITS.legend;
    }

    return pool[Math.floor(Math.random() * pool.length)];
}



// ---------------------------------
// 특성 부여
// ---------------------------------

function giveTrait(player) {
    const trait = randomTrait(player);

    player.trait = trait.name;
    player.traitTier = trait.tier;
    player.traitStat = trait.stat;
    player.traitValue = trait.value;
    player.traitTrigger = trait.trigger || null;

    applyTrait(player);
    return player;
}



// ---------------------------------
// 특성 적용
// ---------------------------------

function applyTrait(player) {
    if (!player.trait || !player.stats) return;

    // 레전드 특성처럼 전체 능력치 증가일 때
    if (player.traitStat === "전체") {
        Object.keys(player.stats).forEach((key) => {
            player.stats[key] += player.traitValue;
        });
        return;
    }

    if (player.stats[player.traitStat] === undefined) {
        player.stats[player.traitStat] = 0;
    }

    player.stats[player.traitStat] += player.traitValue;
}



// ---------------------------------
// 특성 제거
// ---------------------------------

function removeTrait(player) {
    if (!player.trait || !player.stats) return;

    if (player.traitStat === "전체") {
        Object.keys(player.stats).forEach((key) => {
            player.stats[key] -= player.traitValue;
            if (player.stats[key] < 0) player.stats[key] = 0;
        });
    } else if (player.stats[player.traitStat] !== undefined) {
        player.stats[player.traitStat] -= player.traitValue;
        if (player.stats[player.traitStat] < 0) player.stats[player.traitStat] = 0;
    }

    player.trait = null;
    player.traitTier = null;
    player.traitStat = null;
    player.traitValue = 0;
    player.traitTrigger = null;
}



// ---------------------------------
// 특성 변경
// ---------------------------------

function changeTrait(player) {
    if (!userData.items.traitChangeTicket || userData.items.traitChangeTicket <= 0) {
        return "특성 변경권이 없습니다.";
    }

    removeTrait(player);
    userData.items.traitChangeTicket--;

    giveTrait(player);
    saveGame();

    return player.name + " 특성 변경 완료!";
}



// ---------------------------------
// 특성 텍스트
// ---------------------------------

function getTraitText(player) {
    if (!player.trait) return "특성 없음";

    if (player.traitStat === "전체") {
        return `${player.trait} +${player.traitValue}`;
    }

    return `${player.trait} +${player.traitValue}`;
}
