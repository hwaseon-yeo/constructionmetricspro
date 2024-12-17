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

    // 단위 변환
    if (fromUnit === "m2" && toUnit === "ft2") {
        result = value * 10.764;
    } else if (fromUnit === "ft2" && toUnit === "m2") {
        result = value / 10.764;
    } else if (fromUnit === "m2" && toUnit === "yard2") {
        result = value * 1.196;
    } else if (fromUnit === "yard2" && toUnit === "m2") {
        result = value / 1.196;
    } else if (fromUnit === "m2" && toUnit === "acre") {
        result = value * 0.000247;
    } else if (fromUnit === "acre" && toUnit === "m2") {
        result = value / 0.000247;
    } else {
        result = value;
    }

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
