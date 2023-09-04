"use strict";

// USER DATA
const account1 = {
  owner: "Anisha Thapar",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Raghav Thapar",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Sanjam Singh Kalsi",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Rajan Soni",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// ARRAY OF ACCOUNTS
const accounts = [account1, account2, account3, account4];

// ELEMENTS TO BE MANIPULATED

// Navbar Elements
let greeting = document.querySelector(".greeting");
let username = document.querySelector(".username");
let password = document.querySelector(".password");
let loginBtn = document.querySelector(".btn-login");

// Bank information elements
let currentDate = document.querySelector(".current-date");
let currentTime = document.querySelector(".current-time");
let dateTime = document.querySelector(".date-time");
let balance = document.querySelector(".balance");
let transactionContainer = document.querySelector(".transactions");
let transactionType = document.querySelector(".transaction--type");
let transactionDate = document.querySelector(".transaction--date");
let transactionAmount = document.querySelector(".amount");

// Action elements
let transferUser = document.querySelector(".transfer-user");
let transferAmount = document.querySelector(".transfer-amt");
let transferBtn = document.querySelector(".btn-transfer");

let loanAmount = document.querySelector(".loan-amt");
let loanBtn = document.querySelector(".btn-loan");

let closeUser = document.querySelector(".close-user");
let closePin = document.querySelector(".close-pin");
let closeBtn = document.querySelector(".btn-close");

// Stats Elements
let inAmount = document.querySelector(".in-amt");
let outAmount = document.querySelector(".out-amt");
let interestAmount = document.querySelector(".int-amt");
let sortBtn = document.querySelector(".sort");
let timeLeft = document.querySelector(".time-left");
