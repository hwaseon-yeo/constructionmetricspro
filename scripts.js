// 변환 함수
function convert() {
    const value = parseFloat(document.getElementById("input-value").value);
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;
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
    } else if (fromUnit === "m2" && toUnit === "yard2") {
        result = value * 1.196;
    } else if (fromUnit === "yard2" && toUnit === "m2") {
        result = value / 1.196;
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

    // 최근 변환 기록 저장
    saveRecentConversion(value, fromUnit, toUnit, result);

    // 결과 출력
    document.getElementById("output").textContent = result.toFixed(2);
}

// 건축 자재 계산기
function calculateMaterials() {
    const area = parseFloat(document.getElementById("area").value);
    const material = document.getElementById("material").value;
    let materialAmount;

    if (isNaN(area)) {
        alert("면적을 입력해주세요.");
        return;
    }

    if (material === "cement") {
        materialAmount = area * 30; // 예시: 시멘트 1m²당 30kg
    } else if (material === "sand") {
        materialAmount = area * 50; // 예시: 모래 1m²당 50kg
    } else if (material === "bricks") {
        materialAmount = area * 100; // 예시: 벽돌 1m²당 100개
    }

    document.getElementById("material-output").textContent = materialAmount.toFixed(2);
}

// 건축 자재 비용 계산기
function calculateCost() {
    const cost = parseFloat(document.getElementById("material-cost").value);
    const quantity = parseFloat(document.getElementById("quantity").value);
    let totalCost;

    if (isNaN(cost) || isNaN(quantity)) {
        alert("비용과 수량을 입력해주세요.");
        return;
    }

    totalCost = cost * quantity;

    document.getElementById("cost-output").textContent = totalCost.toFixed(2);
}

// 최근 변환 기록 저장
function saveRecentConversion(value, fromUnit, toUnit, result) {
    const recentConversions = JSON.parse(localStorage.getItem("recentConversions")) || [];
    const conversion = `${value} ${fromUnit} = ${result} ${toUnit}`;
    recentConversions.unshift(conversion); // 최신 변환을 앞에 추가
    if (recentConversions.length > 5) recentConversions.pop(); // 최근 5개의 기록만 저장
    localStorage.setItem("recentConversions", JSON.stringify(recentConversions));

    // 화면에 최근 변환 기록 표시
    displayRecentConversions();
}

// 최근 변환 기록 표시
function displayRecentConversions() {
    const recentConversions = JSON.parse(localStorage.getItem("recentConversions")) || [];
    const ul = document.getElementById("recent-conversions");
    ul.innerHTML = ""; // 기존 기록 삭제

    recentConversions.forEach(function(conversion) {
        const li = document.createElement("li");
        li.textContent = conversion;
        ul.appendChild(li);
    });
}

// 페이지 로드 시 최근 변환 기록 표시
document.addEventListener("DOMContentLoaded", function() {
    displayRecentConversions();
});
