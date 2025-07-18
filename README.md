# Mars Rover Technical Challenge

This project is an implementation of the Mars Rover technical challenge. The goal is to navigate a squad of robotic rovers on a plateau on Mars.

## Features

*   **Interactive Command-Line Interface:** Users can input plateau dimensions, rover initial positions, and command sequences directly through the console.
*   **Multi-Rover Support:** The application can process commands for multiple rovers on the same plateau.
*   **Clear Output:** Displays the initial and final state of the plateau with all rovers, along with individual rover results and any encountered errors.
*   **Robust Input Processing:** Handles and validates various input formats for plateau setup, rover deployment, and movement commands.
*   **Error Handling:** Provides informative error messages for invalid inputs or commands.

## Application Structure

The codebase is written in TypeScript and follows a functional programming paradigm, emphasizing pure functions and immutability. The project is organized into several logical modules, each with a specific responsibility:

*   `src/index.ts`: The main entry point of the application. It orchestrates user input/output using `readline` and initiates the core application logic.
*   `src/app/`: Contains the core application logic, including the `runMarsRoverApp` function, which is separated from direct I/O for enhanced testability.
*   `src/display/`: Responsible for all output and visualization.
    *   `grid.display.ts`: Provides functions for rendering the Mars plateau and rover positions.
    *   `messages.display.ts`: Handles displaying initial welcome messages, results, and error messages to the user.
*   `src/parser/`: Dedicated to parsing raw string inputs into structured data.
    *   `plateau.parser.ts`: Parses plateau dimensions.
    *   `rover.parser.ts`: Parses rover initial positions and directions.
*   `src/process/`: Manages the overall processing flow of user input and rover commands.
    *   `input.process.ts`: Contains the main logic for processing all user inputs (plateau, rovers, commands) and coordinating their execution.
    *   `rover.process.ts`: Handles the sequential processing of commands for individual rovers.
*   `src/rover/`: Encapsulates all rover-specific operations and logic.
    *   `directions.rover.ts`: Manages changes in rover orientation (turning left/right).
    *   `execute.rover.ts`: Implements the logic for executing individual movement commands (L, R, M).
    *   `tostring.rover.ts`: Utility for converting rover objects into a human-readable string format.
*   `src/types/`: Defines all custom TypeScript types and interfaces used across the application, ensuring strong typing and code clarity.
*   `src/validation/`: Contains functions responsible for validating various aspects of the input and rover movements, such as plateau dimensions, rover positions, and collision detection.
*   `src/utils/`: Provides general utility functions and constants, such as error messages and helper functions for switch cases.

## Functional Paradigm and State Management

The project adheres to a functional programming style. This means functions are designed to be pure, avoiding side effects, which significantly improves code predictability, testability, and maintainability.

The state of the rovers (position and direction) is managed effectively through a state machine approach. Each command (L, R, M) acts as a transition function, taking the current rover state as input and returning a new, updated state. This immutable state management ensures that rover movements are deterministic and easy to trace.

## How to Run the Program

To run the program, you need to have Node.js and npm installed.

1.  Install the dependencies:

    ```bash
    npm install
    ```

2.  Run the program:

    ```bash
    npm start
    ```

    The program will then prompt you to enter the input. You can paste the example input provided in the `Mars_Rover_Technical_Test.pdf` file or provide your own custom input. The application will guide you through entering the plateau size, followed by rover positions and command sequences. Enter an empty line twice to signal the end of input.

## How to Run Tests

To run the tests, you can use the following command:

```bash
npm test
```

This will execute all unit tests located in the `src/__tests__` directory. The tests are comprehensive, covering various aspects of the application's logic, including input parsing, rover movement, and error handling.