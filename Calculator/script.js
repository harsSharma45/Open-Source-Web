let operation = null; // To store current operation (sqrt, pow, sin, etc.)
let currentValue = ''; // To store the number

// Function to append numbers or operators to display
function appendToDisplay(value) {
    const display = document.getElementById('display');
    currentValue += value;
    display.value = currentValue;
}

// Function to clear the display
function clearDisplay() {
    const display = document.getElementById('display');
    currentValue = '';
    operation = null;
    display.value = '';
}

// Function to delete the last character
function deleteLast() {
    const display = document.getElementById('display');
    currentValue = currentValue.slice(0, -1);
    display.value = currentValue;
}

// Set the operation type (e.g., sqrt, pow, sin)
function setOperation(op) {
    operation = op;
}

// Function to handle calculations
function calculate() {
    const display = document.getElementById('display');
    let result = parseFloat(currentValue);

    // Apply the operation if any
    if (operation) {
        switch (operation) {
            case 'sqrt':
                result = Math.sqrt(result);
                break;
            case 'pow':
                result = Math.pow(result, 2); // For x²
                break;
            case 'sin':
                result = Math.sin(result);
                break;
            case 'cos':
                result = Math.cos(result);
                break;
            case 'tan':
                result = Math.tan(result);
                break;
        }
        operation = null; // Reset operation after applying
    }

    // Display the result
    display.value = result;
    currentValue = result.toString(); // Update current value to result
}
