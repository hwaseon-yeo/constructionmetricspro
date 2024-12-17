// 변환 함수
function convert() {
    const value = parseFloat(document.getElementById("input-value").value);
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;

    // 유효한 값이 입력되었는지 확인
    if (isNaN(value)) {
        alert("숫자를 입력해주세요.");
        return;
    }

    let result;

    // 제곱미터 <-> 제곱피트 변환 공식
    if (fromUnit === "m2" && toUnit === "ft2") {
        result = value * 10.764; // 제곱미터를 제곱피트로 변환
    } else if (fromUnit === "ft2" && toUnit === "m2") {
        result = value / 10.764; // 제곱피트를 제곱미터로 변환
    } else {
        result = value; // 동일한 단위일 경우 값 그대로 반환
    }

    // 결과 출력
    document.getElementById("output").textContent = result.toFixed(2);
}
