# Typescript Todo App

A basic typescript app written with classes and interfaces for the purpose of demonstrating some of the key strengths of Typescript.

## Technologies used

Built with:

- HTML
- Typescript
- CSS
- Lite Server
- Node

## Setup and usage

Step 1) Clone the repository

Step 2) npm install

```shell
npm install
```

Step 3) npm start

```shell
npm start
```

### (Optional for Debugging and altering code)

If editing the code in this project then you will need to first start tsc in watch mode.
This assumes that you have Typescript Compiler installed in your system. The tsconfig is already set up.

```shell
tsc -w
```

## Screenshot

![Todo Typescript App](todo-app.png)

## Learnings:

- [x] Using Interfaces to correctly assign Types before using them.
- [x] Correctly building class objects for use in the DOM environment.
- [x] Manpiulating the DOM environment using a template in HTML.
- [x] Using additional classes to validate data and then return it to view classes.
- [x] Using lite-server in combination with Typescript to develop a working website easily.

## Features to add:

- [x] localStorage addon to save To do list tasks for page reload. I was looking into this but the issue I was having was correctly assigning it back to my todo array inside a protected constructor.

## Authors and acknowledgment

Martin Holland

- GitHub @martin-holland
- [LinkedIn](https://www.linkedin.com/in/martin-holland-5099071b9/)
