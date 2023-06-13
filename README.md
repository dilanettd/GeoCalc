## Project Title

hellocomputing test FrontEnd APP

## Description

Our goal is to make math engaging and fun by providing an interactive application that allows children to visualize figures and learn how to calculate their perimeters and areas easily. Our web application allows the user to choose from a list of shapes including rectangle, square, circle, and triangle. Once a shape is selected, the user can choose whether they want to know the perimeter or area of that shape. They can then enter the required values and the application will calculate the perimeter or area of the selected shape.

But that's not all! Our application also allows the user to convert the calculated perimeter or area into other units such as centimetre, decimetre, metre and kilometre. The default unit is metre (m), but the user can switch to any unit from the list provided. The list of possible units and shapes are retrieved directly from our Node.js API that is specifically built for this purpose.

## Requirements

Before running this application ensure that the following are installed on your system.

Node.js,
NPM,
Angular CLI

## Installation

1- Clone the repository
`git clone https://github.com/dilanettd/GeoCalc.git`

2- Navigate to the project directory

3- Install dependencies
`npm install`

## Usage

1- Start the development server
`ng serve`

2- Navigate to http://localhost:4200/ on your web browser.

3- Enter the server address in the environment file, for example API_URL: 'http://127.0.0.1:5000/',

4-Enjoy the app!

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

Run `npx cypress open` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
