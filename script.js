// Get the display element
const display = document.getElementById('result');

// Function to append numbers and operators to display
function appendToDisplay(value) {
    // If display is empty and user tries to add an operator, do nothing
    if (display.value === '' && (value === '+' || value === '-' || value === '*' || value === '/')) {
        return;
    }
    
    // If last character is an operator and user tries to add another operator, replace it
    const lastChar = display.value.slice(-1);
    if ((lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') && 
        (value === '+' || value === '-' || value === '*' || value === '/')) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }
    
    // If display shows "Error", clear it first
    if (display.value === 'Error') {
        display.value = '';
    }
    
    // Add the value to display
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
}

// Function to delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Function to calculate the result
function calculate() {
    try {
        // Replace × with * for calculation
        let expression = display.value.replace('×', '*');
        
        // Check if expression is empty
        if (expression === '') {
            return;
        }
        
        // Check if expression ends with an operator
        const lastChar = expression.slice(-1);
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
            return;
        }
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Check if result is valid
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and decimal point
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    // Operators
    else if (key === '+' || key === '-' || key === '*') {
        appendToDisplay(key);
    }
    // Division
    else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    }
    // Equals
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    // Clear
    else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
    // Backspace
    else if (key === 'Backspace') {
        deleteLast();
    }
});