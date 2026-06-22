let myChart;

function calculateEMI() {

    let principal = parseFloat(document.getElementById("loanAmount").value);
    let annualRate = parseFloat(document.getElementById("interestRate").value);
    let years = parseFloat(document.getElementById("loanTenure").value);

    if (!principal || !annualRate || !years) {
        alert("Please fill all fields.");
        return;
    }

    let monthlyRate = annualRate / 12 / 100;
    let months = years * 12;

    let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);

    let totalPayment = emi * months;
    let totalInterest = totalPayment - principal;

    document.getElementById("emi").innerText = emi.toFixed(2);
    document.getElementById("interest").innerText = totalInterest.toFixed(2);
    document.getElementById("total").innerText = totalPayment.toFixed(2);

    let ctx = document.getElementById("emiChart").getContext("2d");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal Amount", "Interest Amount"],
            datasets: [{
                data: [principal, totalInterest]
            }]
        }
    });
}


function resetFields() {

    document.getElementById("loanAmount").value = "";
    document.getElementById("interestRate").value = "";
    document.getElementById("loanTenure").value = "";

    document.getElementById("emi").innerText = "0";
    document.getElementById("interest").innerText = "0";
    document.getElementById("total").innerText = "0";

    if (myChart) {
        myChart.destroy();
    }
}


function toggleDarkMode() {
    document.body.classList.toggle("dark");
}