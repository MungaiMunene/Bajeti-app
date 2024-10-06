const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const Chart = require('chart.js');

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

let dom;
let document;
let window;
let chartInstance = null;

beforeAll(() => {
    // Mock Canvas methods globally
    global.HTMLCanvasElement.prototype.getContext = () => ({
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        beginPath: jest.fn(),
        closePath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        arc: jest.fn(),
        stroke: jest.fn(),
        fill: jest.fn(),
    });

    // Override Chart constructor to capture instance
    global.Chart = function(ctx, config) {
        chartInstance = new Chart.constructor(ctx, config);
        return chartInstance;
    };
});

beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    window = dom.window;
    global.document = document;
    global.window = window;
    chartInstance = null;  // Reset the chart instance
    require('./script'); // Import the script file after DOM setup
});

describe('Bajeti Tracker App', () => {
    test('should display income, expense, and savings in the data list', () => {
        const form = document.getElementById('finance-form');
        const incomeInput = document.getElementById('income');
        const expenseInput = document.getElementById('expense');
        const savingsInput = document.getElementById('savings');
        const dataList = document.getElementById('data-list');

        incomeInput.value = 5000;
        expenseInput.value = 2000;
        savingsInput.value = 1000;

        form.dispatchEvent(new window.Event('submit'));

        expect(dataList.innerHTML).toBe("Income: 5000, Expense: 2000, Savings Goal: 1000");
    });
    test('should generate correct chart data', () => {
        const form = document.getElementById('finance-form');
        const incomeInput = document.getElementById('income');
        const expenseInput = document.getElementById('expense');
        const savingsInput = document.getElementById('savings');

        incomeInput.value = 6000;
        expenseInput.value = 3000;
        savingsInput.value = 1500;

        form.dispatchEvent(new window.Event('submit'));

        // Ensure chart initialization logic is correct
        expect(chartInstance).not.toBeUndefined();
        expect(chartInstance.data.datasets[0].data).toEqual([6000, 3000, 1500]);
    });

    test('should provide correct recommendations', () => {
        const form = document.getElementById('finance-form');
        const incomeInput = document.getElementById('income');
        const expenseInput = document.getElementById('expense');
        const savingsInput = document.getElementById('savings');
        const recommendationText = document.getElementById('recommendation-text');

        incomeInput.value = 4000;
        expenseInput.value = 4500;
        savingsInput.value = 500;

        form.dispatchEvent(new window.Event('submit'));

        expect(recommendationText.textContent).toBe("Your expenses exceed your income. Consider cutting down on unnecessary expenses.");

        incomeInput.value = 5000;
        expenseInput.value = 2000;
        savingsInput.value = 500;

        form.dispatchEvent(new window.Event('submit'));

        expect(recommendationText.textContent).toBe('Try to save at least 20% of your income for better financial health.');

        incomeInput.value = 5000;
        expenseInput.value = 2000;
        savingsInput.value = 1500;

        form.dispatchEvent(new window.Event('submit'));

        expect(recommendationText.textContent).toBe('You are on track with your financial goals.');
    });
});