let display = document.getElementById('display');

// Clears the display
function clearDisplay() {
    display.value = '';
}

// Deletes the last character from the display
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Appends values to the display with validation
function appendToDisplay(value) {
    const lastChar = display.value.slice(-1);

    // Prevent multiple operators in a row
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
        return; // Ignore input if the last character is already an operator
    }

    // Prevent multiple decimal points in the same number
    if (value === '.') {
        const lastOperatorIndex = Math.max(
            display.value.lastIndexOf('+'),
            display.value.lastIndexOf('-'),
            display.value.lastIndexOf('*'),
            display.value.lastIndexOf('/')
        );
        const lastNumber = display.value.slice(lastOperatorIndex + 1);
        if (lastNumber.includes('.')) {
            return; // Ignore if the current number already has a decimal point
        }
    }

    display.value += value; // Append value if it's valid
}

// Evaluates the expression with error handling
function calculate() {
    try {
        // Check if the last character is an operator and prevent evaluation
        const lastChar = display.value.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            return; // Do nothing if the last character is an operator
        }

        // Use eval to evaluate the expression
        display.value = eval(display.value);
    } catch (error) {
        // Catch any errors and display an error message
        display.value = 'Error';
    }
}

// Issue 4: No validation for decimal points, user can enter multiple '.'.
// Solution: Add logic to handle proper decimal usage.
