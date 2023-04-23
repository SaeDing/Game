const upgradeBtn = document.getElementById('upgrade-btn');
const countDisplay = document.getElementById('count');
const levelDisplay = document.getElementById('level');
const maxLevelDisplay = document.getElementById('max-level');
const itemIcon = document.getElementById('item-icon');
const attackDisplay = document.getElementById('attack');
const attackBtn = document.getElementById('attack-btn');
const slimeHPDisplay = document.getElementById('slime-hp');
const slimeDefeatedDisplay = document.getElementById('slime-defeated');
const successRateDisplay = document.getElementById('success-rate');
const failureRateDisplay = document.getElementById('failure-rate');

// 상점 버튼 추가
const upgradeProbabilityBtn = document.getElementById('upgrade-probability');
const preventResetBtn = document.getElementById('prevent-reset');

let upgradeCount = 0;
let level = 0;
let maxLevel = 0;
let attack = 10;
let slimeHP = 10000;
let initialSlimeHP = 10000;
let slimeDefeated = 0;
let preventReset = false; // 초기화 방지 아이템 활성화 여부
let additionalSuccessRate = 0; // 추가 성공률

function upgradeSuccess() {
    const randomNumber = Math.random();

    if (level === 0) return true;
    else if (level === 1) return randomNumber > 0.1 - additionalSuccessRate;
    else if (level === 2) return randomNumber > 0.1 - additionalSuccessRate;
    else if (level === 3) return randomNumber > 0.1 - additionalSuccessRate;
    else if (level === 4) return randomNumber > 0.1 - additionalSuccessRate;
    else if (level >= 5) return randomNumber > (0.05 + 0.001 * (level - 5) - additionalSuccessRate);
    else return false;
}

function resetUpgrade() {
    if (level >= 5 && !preventReset) {
        level = 0;
    }
    levelDisplay.textContent = level;
}

function updateRates() {
    let successRate = 0;
    if (level === 0) successRate = 100;
    else if (level === 1) successRate = 90 + additionalSuccessRate * 100;
    else if (level === 2) successRate = 90 + additionalSuccessRate * 100;
    else if (level === 3) successRate = 90 + additionalSuccessRate * 100;
    else if (level === 4) successRate = 90 + additionalSuccessRate * 100;
    else if (level >= 5) successRate = (0.95 - 0.001 * (level - 5) + additionalSuccessRate) * 100;

    let failureRate = 100 - successRate;
    successRateDisplay.textContent = `${successRate.toFixed(2)}%`;
    failureRateDisplay.textContent = `${failureRate.toFixed(2)}%`;
}

function formatLargeNumber(number) {
    if (number >= 100000000) {
        return `${(number / 100000000).toFixed(1)}a`;
    } else {
       
        return number;
    }
    }
    
    upgradeBtn.addEventListener('click', () => {
    upgradeCount++;
    countDisplay.textContent = upgradeCount;
    if (upgradeSuccess()) {
        level++;
        levelDisplay.textContent = level;
        if (level > maxLevel) {
            maxLevel = level;
            maxLevelDisplay.textContent = maxLevel;
        }
    } else {
        resetUpgrade();
    }
    
    attack = Math.pow(100, level);
    attackDisplay.textContent = formatLargeNumber(attack);
    
    if (level >= 100) {
        upgradeBtn.disabled = true;
    }
    
    updateRates();
});

attackBtn.addEventListener('click', () => {
slimeHP -= attack;
if (slimeHP <= 0) {
slimeDefeated++;
slimeDefeatedDisplay.textContent = slimeDefeated;
slimeHP = Math.pow(initialSlimeHP, slimeDefeated + 1);
}
slimeHPDisplay.textContent = formatLargeNumber(slimeHP);
});

// 상점 기능 추가
upgradeProbabilityBtn.addEventListener('click', () => {
additionalSuccessRate += 0.01;
updateRates();
});

preventResetBtn.addEventListener('click', () => {
preventReset = true;
});

updateRates();