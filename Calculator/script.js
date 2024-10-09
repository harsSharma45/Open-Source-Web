let display = document.getElementById('display');

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    display.value += value;
}

function calculate() {
    try {
        // Issue 3: If user inputs two operators, it will break (e.g., 5++2)
        // Solution: You need to validate and prevent invalid expressions.
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error'; // Shows error when there's an invalid expression
    }
}

// Issue 4: No validation for decimal points, user can enter multiple '.'.
// Solution: Add logic to handle proper decimal usage.
