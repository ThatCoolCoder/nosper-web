# chrome-calculator

A WIP extension for Chrome that provides an actually good calculator.

Implemented features:
- Basic arithmetic (+-/*^)
- Unary functions (trigonometry/roots)
- Recognises operator precedence
- Recognises brackets
- Ability to assign and later reference variables
- Ability to define custom functions (very beta)
- Values of pi, etc
- Input history that you can navigate with arrow keys and is saved between sessions

Planned features:
- Support for implicit multiplication of terms (will only be useful in limited situations, may not even bother implementing)
- Functions and variables saved between sessions, not just input history
- Ability to run as a firefox extension or a standalone website (polyfills to cover missing chrome storage)

The code is pretty messy as this is the first time I've successfully created an AST generator and I don't really know what I'm doing.

Feel free to contribute small features like adding an extra operator or constant variable. Don't do major stuff like adding a new type of token because I'm doing this for fun and therefore I want to do the coding myself.