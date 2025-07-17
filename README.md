# Mars Rover Technical Challenge

This project is an implementation of the Mars Rover technical challenge. The goal is to navigate a squad of robotic rovers on a plateau on Mars.

## Code Description

The codebase is written in TypeScript and follows a functional programming paradigm. The code is split into several files, each with a specific responsibility:

-   `index.ts`: This is the main entry point of the application. It handles user input and output, and orchestrates the overall flow of the program.
-   `controller.ts`: This file contains the core logic for processing the input and returning the final rover positions. It uses a state machine to manage the rovers' state.
-   `rover.ts`: This file defines the `Rover` data structure and the functions for manipulating it. It includes functions for turning the rover left and right, moving it forward, and executing a sequence of commands.
-   `parser.ts`: This file is responsible for parsing the input string and converting it into the data structures used by the application.
-   `types.ts`: This file defines the data types used throughout the application, such as `Rover`, `Plateau`, `Position`, `Direction`, and `Command`.
-   `example.ts`: This file contains example usage of the functions in the application.

## Functional Paradigm and State Machines

The project is built using a functional approach. This means that the functions are pure, which means that they do not have any side effects. This makes the code easier to reason about and test.

The state of the rovers is managed using a state machine. The state of a rover is represented by its position and direction. The state of the rover is updated by applying a sequence of commands. Each command is a function that takes the current state of the rover as input and returns the new state of the rover as output.

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

The program will then prompt you to enter the input. You can paste the input from the `Mars_Rover_Technical_Test.pdf` file or provide your own input.

## Interactive Interface

The program has an interactive interface that allows you to enter the input and see the output. The program will first prompt you to enter the plateau size. Then, it will prompt you to enter the rover's position and direction. Finally, it will prompt you to enter the commands to execute.

The program will then print the final position and direction of the rover.

## How to Run Tests

To run the tests, you can use the following command:

```bash
npm test
```

This will run all the tests in the `src/__tests__` directory.
