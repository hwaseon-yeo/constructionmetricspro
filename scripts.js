// 실시간 환율 변환 및 자재량 계산기
function calculateMaterialsAndCost() {
    const area = parseFloat(document.getElementById("area").value);
    const material = document.getElementById("material").value;
    const currency = document.getElementById("currency").value;

    if (isNaN(area)) {
        alert("면적을 입력해주세요.");
        return;
    }

    // 자재 계산
    let materialAmount;
    if (material === "cement") {
        materialAmount = area * 30; // 예시: 시멘트 1m²당 30kg
    } else if (material === "sand") {
        materialAmount = area * 50; // 예시: 모래 1m²당 50kg
    } else if (material === "bricks") {
        materialAmount = area * 100; // 예시: 벽돌 1m²당 100개
    }

    // 자재 비용 계산 (API에서 가격 가져오기)
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)  // API 예시, 실제 시장가를 API로 가져옴
        .then(response => response.json())
        .then(data => {
            const usdToCurrency = data.rates[currency];
            const costPerUnit = 10; // 예시: 단위당 가격 10 USD
            const totalCost = (costPerUnit * materialAmount) * usdToCurrency;

            // 화면에 결과 출력
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

    // Blob을 사용하여 파일 저장
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "recent_conversions.txt";
    link.click();
}

