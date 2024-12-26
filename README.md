# Calculator Project

This is a fully functional calculator application built as part of [The Odin Project](https://www.theodinproject.com) curriculum. The calculator supports basic arithmetic operations, a history of calculations, customizable themes, and keyboard input.

Check out the live version of the project [here](https://rbsdeveloper.github.io/Calculator-Odin-Project/).

## Features

- **Arithmetic Operations**: Perform addition, subtraction, multiplication, and division.
- **Continuous Calculations**: Use the result of one operation as the starting point for the next.
- **History**: Keep track of all previous calculations.
- **Clear History**: Easily manage and delete past operations.
- **Custom Themes**: Choose from three different preset themes to personalize the look of the calculator.
- **Keyboard Support**: Input numbers and operators using your keyboard.

## Getting Started

To get the calculator up and running on your local machine, follow these steps:

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari).

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/calculator-project.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd calculator-project
    ```

3. **Open `index.html` in your web browser.**

## Usage

### Basic Usage

1. **Input Numbers**: Click on the number buttons or use your keyboard to enter numbers.
2. **Select Operators**: Click on the operator buttons (+, -, *, /) to perform calculations.
3. **Calculate**: Press the equals button (=) to see the result.
4. **Clear**: Use the clear button (C) to reset the calculator display.

### Advanced Features

- **History**: Press the history button to view your calculation history.
- **Clear History**: Click the trash button to clear the entire calculation history.
- **Themes**: Use the theme selector to change the calculator’s appearance.
- **Keyboard Input**: Use your keyboard to enter numbers and operators. Special keys like Backspace and Escape are also supported.

## Code Overview

The code is organized into sections that handle different aspects of the calculator's functionality:

### Global Variables

Store important data such as the current input and operation.

### Event Listeners

Handle button clicks and keyboard inputs to update the display and perform calculations.

### Helper Functions

Facilitate operations like continuous calculations, input validation, managing history, and theme changes.

### Main Functions

- **helpCalculation()**: Handles calculations for both the equals button and operator chaining functionality.
- **validatePossibleCalc()**: Checks if the input is valid for performing a calculation.
- **separatorChecker()**: Manages the input of decimal points.
- **updateHistoryDisplay()**: Updates the history overlay with past calculations.
- **operate()**: Performs the specified arithmetic operation and updates the history.
- **avoidMultipleOperators()**: Ensures multiple operators are not entered consecutively.
- **changeTheme()**: Updates the calculator’s theme based on user selection.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with any improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- The Odin Project for providing an excellent curriculum and resources.
- All contributors who helped improve this project.
