document.addEventListener('DOMContentLoaded', () => {
    let financialChart;

    document.getElementById('finance-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve values from the form
        const income = parseFloat(document.getElementById('income').value);
        const expense = parseFloat(document.getElementById('expense').value);
        const savings = parseFloat(document.getElementById('savings').value);

        // Update the data list
        const dataList = document.getElementById('data-list');
        dataList.innerHTML = `Income: ${income}, Expense: ${expense}, Savings Goal: ${savings}`;

        // Update recommendations
        const recommendationText = document.getElementById('recommendation-text');
        if (expense > income) {
            recommendationText.textContent = 'Your expenses exceed your income. Consider cutting down on unnecessary expenses.';
        } else if (savings < 0.2 * income) {
            recommendationText.textContent = 'Try to save at least 20% of your income for better financial health.';
        } else {
            recommendationText.textContent = 'You are on track with your financial goals.';
        }

        // Update chart
        const ctx = document.getElementById('financialChart').getContext('2d');

        // Clear previous chart if it exists
        if (financialChart) {
            financialChart.destroy();
        }

        // Create a new chart
        financialChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expense', 'Savings'],
                datasets: [{
                    label: 'Financial Data',
                    data: [income, expense, savings],
                    backgroundColor: ['green', 'red', 'blue']
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
});