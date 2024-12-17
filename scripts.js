// i18next 다국어 지원 초기화
i18next.init({
    lng: 'ko',  // 기본 언어 설정
    resources: {
        ko: {
            translation: {
                "material-calculator-heading": "건축 자재 계산기",
                "material-input-placeholder": "면적을 입력하세요",
                "material-output-text": "자재 필요량",
                "cost-calculator-heading": "자재 비용 계산기",
                "cost-input-placeholder": "단위당 가격",
                "quantity-input-placeholder": "필요 수량",
                "cost-output-text": "총 비용",
                "currency-converter-heading": "실시간 환율 계산",
                "currency-from-label": "환전할 화폐",
                "currency-to-label": "받을 화폐",
                "currency-amount-placeholder": "금액을 입력하세요",
                "currency-result-text": "환율 결과"
            }
        },
        en: {
            translation: {
                "material-calculator-heading": "Construction Material Calculator",
                "material-input-placeholder": "Enter area in square meters",
                "material-output-text": "Material Quantity",
                "cost-calculator-heading": "Material Cost Calculator",
                "cost-input-placeholder": "Unit cost",
                "quantity-input-placeholder": "Quantity needed",
                "cost-output-text": "Total Cost",
                "currency-converter-heading": "Real-Time Currency Conversion",
                "currency-from-label": "Currency to convert",
                "currency-to-label": "Currency to receive",
                "currency-amount-placeholder": "Enter amount",
                "currency-result-text": "Exchange rate result"
            }
        }
    }
}, function(err, t) {
    document.getElementById('material-calculator-heading').innerText = t('material-calculator-heading');
    document.getElementById('material-input-placeholder').placeholder = t('material-input-placeholder');
    document.getElementById('material-output').innerText = t('material-output-text');
    document.getElementById('cost-calculator-heading').innerText = t('cost-calculator-heading');
    document.getElementById('cost-input-placeholder').placeholder = t('cost-input-placeholder');
    document.getElementById('quantity-input-placeholder').placeholder = t('quantity-input-placeholder');
    document.getElementById('cost-output').innerText = t('cost-output-text');
    document.getElementById('currency-converter-heading').innerText = t('currency-converter-heading');
    document.getElementById('currency-from-label').innerText = t('currency-from-label');
    document.getElementById('currency-to-label').innerText = t('currency-to-label');
    document.getElementById('currency-amount-placeholder').placeholder = t('currency-amount-placeholder');
    document.getElementById('exchange-rate-output').innerText = t('currency-result-text');
});

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

// 자재 비용 계산기 (실시간 시장가 API 사용)
function calculateCost() {
    const materialCost = document.getElementById("material-cost").value;
    const quantity = document.getElementById("quantity").value;

    if (isNaN(materialCost) || isNaN(quantity)) {
        alert("가격과 수량을 입력하세요.");
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)  // API 예시, 실제 시장가를 API로 가져옴
        .then(response => response.json())
        .then(data => {
            const usdToKrw = data.rates.KRW;
            const totalCost = (materialCost * quantity) * usdToKrw;
            document.getElementById("cost-output").textContent = totalCost.toFixed(2);
        })
        .catch(err => alert('API 호출 실패: ' + err));
}

// 환율 변환기
function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("currency-from").value;
    const toCurrency = document.getElementById("currency-to").value;

    if (isNaN(amount)) {
        alert("금액을 입력하세요.");
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            document.getElementById("exchange-rate-output").textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(err => alert('환율 API 호출 실패: ' + err));
}

// 최근 변환 기록 저장
function saveRecentConversions() {
    const recentConversions = JSON.parse(localStorage.getItem("recentConversions")) || [];
    const conversion = {
        area: document.getElementById('area').value,
        material: document.getElementById('material').value,
        materialAmount: document.getElementById('material-output').textContent,
        cost: document.getElementById('cost-output').textContent
    };
    recentConversions.unshift(conversion); // 최신 변환을 앞에 추가
    if (recentConversions.length > 5) recentConversions.pop(); // 최근 5개의 기록만 저장
    localStorage.setItem("recentConversions", JSON.stringify(recentConversions));
    displayRecentConversions();
}

// 최근 변환 기록 표시
function displayRecentConversions() {
    const recentConversions = JSON.parse(localStorage.getItem("recentConversions")) || [];
    const ul = document.getElementById("recent-conversions");
    ul.innerHTML = ""; // 기존 기록 삭제

    recentConversions.forEach(function(conversion) {
        const li = document.createElement("li");
        li.textContent = `면적: ${conversion.area}m², 자재: ${conversion.material}, 필요량: ${conversion.materialAmount}, 비용: ${conversion.cost}`;
        ul.appendChild(li);
    });
}

// 페이지 로드 시 최근 변환 기록 표시
document.addEventListener("DOMContentLoaded", function() {
    displayRecentConversions();
});
