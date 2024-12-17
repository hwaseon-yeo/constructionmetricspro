// 다양한 단위 변환
function convertUnit() {
    const value = parseFloat(document.getElementById("unit-value").value);
    const fromUnit = document.getElementById("unit-from").value;
    const toUnit = document.getElementById("unit-to").value;
    let result;

    if (isNaN(value)) {
        alert("숫자를 입력해주세요.");
        return;
    }

    // 면적, 무게, 부피, 길이 변환
    if (fromUnit === "m2" && toUnit === "ft2") {
        result = value * 10.764;
    } else if (fromUnit === "ft2" && toUnit === "m2") {
        result = value / 10.764;
    } else if (fromUnit === "kg" && toUnit === "ton") {
        result = value / 1000;
    } else if (fromUnit === "ton" && toUnit === "kg") {
        result = value * 1000;
    } else if (fromUnit === "liter" && toUnit === "gallon") {
        result = value * 0.264172;
    } else if (fromUnit === "gallon" && toUnit === "liter") {
        result = value / 0.264172;
    } else {
        result = value;
    }

    document.getElementById("unit-output").textContent = result.toFixed(2);
}

// 자재 계산기
function calculateMaterialsAndCost() {
    const area = parseFloat(document.getElementById("area").value);
    const material = document.getElementById("material").value;
    const currency = document.getElementById("currency").value;

    if (isNaN(area)) {
        alert("면적을 입력해주세요.");
        return;
    }

    let materialAmount;
    if (material === "cement") {
        materialAmount = area * 30; // 예시: 시멘트 1m²당 30kg
    } else if (material === "sand") {
        materialAmount = area * 50; // 예시: 모래 1m²당 50kg
    } else if (material === "bricks") {
        materialAmount = area * 100; // 예시: 벽돌 1m²당 100개
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then(response => response.json())
        .then(data => {
            const usdToCurrency = data.rates[currency];
            const costPerUnit = 10; // 예시: 단위당 가격 10 USD
            const totalCost = (costPerUnit * materialAmount) * usdToCurrency;

            document.getElementById("material-output").textContent = materialAmount.toFixed(2);
            document.getElementById("cost-output").textContent = totalCost.toFixed(2);

            // 최근 계산 기록 저장
            saveRecentConversion(area, material, materialAmount, totalCost);
        })
        .catch(err => alert('API 호출 실패: ' + err));
}

// 최근 계산 기록 저장
function saveRecentConversion(area, material, materialAmount, totalCost) {
    const recentConversions = JSON.parse(localStorage.getItem("recentConversions")) || [];
    const conversion = {
        area: area,
        material: material,
        materialAmount: materialAmount,
        totalCost: totalCost
    };
    recentConversions.unshift(conversion); // 최신 변환을 앞에 추가
    if (recentConversions.length > 5) recentConversions.pop(); // 최근 5개의 기록만 저장
    localStorage.setItem("recentConversions", JSON.stringify(recentConversions));
    displayRecentConversions();
}

// 최근 계산 기록 표시
function displayRecentConversions() {
    const recentConversions = JSON.parse(localStorage.getItem("recentConversions")) || [];
    const ul = document.getElementById("recent-conversions");
    ul.innerHTML = ""; // 기존 기록 삭제

    recentConversions.forEach(function(conversion) {
        const li = document.createElement("li");
        li.textContent = `면적: ${conversion.area}m², 자재: ${conversion.material}, 자재량: ${conversion.materialAmount}kg, 총 비용: ${conversion.totalCost}`;
        ul.appendChild(li);
    });
}

// 페이지 로드 시 최근 계산 기록 표시
document.addEventListener("DOMContentLoaded", function() {
    displayRecentConversions();
});

// 계산 기록을 텍스트 파일로 저장
function saveRecentConversions() {
    const recentConversions = JSON.parse(localStorage.getItem("recentConversions")) || [];
    let fileContent = '최근 계산 기록:\n\n';

    recentConversions.forEach(function(conversion) {
        fileContent += `면적: ${conversion.area}m², 자재: ${conversion.material}, 자재량: ${conversion.materialAmount}kg, 총 비용: ${conversion.totalCost}\n`;
    });

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "recent_conversions.txt";
    link.click();
}

// 기록 삭제
function clearRecentConversions() {
    localStorage.removeItem("recentConversions");
    displayRecentConversions();
}
