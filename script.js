"use strict";

// ============================================================================== //
// ============================================================================== //

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

// ============================================================================== //
// ============================================================================== //

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
let bankDetails = document.querySelector(".bank-details");

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

// Variables
let currentAccount = "";
let totalBalance = 0;
// ============================================================================== //
// ============================================================================== //

// DISPLAYING TRANSACTIONS - USING .insertAdjacentHTML()

const displayTransactions = function (account) {
  // Assigning the transaction based on the current account
  let transactions = account.movements;

  // Here, the existing transactions that are hard-coded in the HTML are removed
  transactionContainer.innerHTML = "";

  // Iterating transactions to show them
  transactions.forEach((transaction) => {
    const transactionType = transaction > 0 ? `credit` : `debit`;

    const html = `
      <div class="transaction-item flex">
          <div class="transaction--details flex">
              <p class="transaction--type type-${transactionType}">${transactionType}</p>
              <p class="transaction--date">31/08/2023</p>
          </div>
          <p class="transaction--amount">
          ₹ <span class="amount">${transaction}</span>
          </p>
      </div>
      `;
    transactionContainer.insertAdjacentHTML("afterbegin", html);
  });
};

// ==============================================================================
// ==============================================================================

// MAKING USERNAMES
const createUserNames = function (accounts) {
  accounts.forEach((acc) => {
    return (acc.username = acc.owner
      .toLowerCase() // turns into lower case
      .split(" ") // splits the name
      .map((name) => name[0]) // takes out the first letter
      .join("")); // joins the number of letters togethter
  });
};

createUserNames(accounts);

// ==============================================================================
// ==============================================================================

// CALCULATING BALANCE FOR THE USER

const displayBalance = function (account) {
  // Assigning the transaction based on the current account
  let transactions = account.movements;

  totalBalance = transactions.reduce((acc, ele) => {
    return acc + ele;
  });

  balance.textContent = `₹${totalBalance}`;
};

// ==============================================================================
// ==============================================================================

// CALCULATING STATS OF THE USER USING CHAINING METHODS

const displayStats = function (account) {
  // Assigning the transaction based on the current account
  let transactions = account.movements;

  // Calculating the total IN Amount
  const totalIn = transactions
    .filter((transaction) => transaction > 0)
    .reduce((acc, transaction) => acc + transaction, 0);

  // Calculating the total Out Amount
  const totalOut = transactions
    .filter((transaction) => transaction < 0)
    .map((transaction) => transaction * -1)
    .reduce((acc, transaction) => acc + transaction, 0);

  // Calculating Interest
  const interest = transactions
    .filter((transaction) => transaction > 0)
    .map((deposit) => (deposit * 1.2) / 100) // Taking 1.2% as hard-coded. Will be dynamic once implementing login functionality
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  // Displaying the contents calculated
  inAmount.textContent = `₹${totalIn}`;
  outAmount.textContent = `₹${totalOut}`;
  interestAmount.textContent = `₹${interest}`;
};

// ==============================================================================
// ==============================================================================

// REFRESHING DISPLAY

let refreshDisplay = function (currentAccount) {
  displayBalance(currentAccount);
  displayTransactions(currentAccount);
  displayStats(currentAccount);
};

// ==============================================================================
// ==============================================================================

// IMPLEMENTING LOGIN FUNCTIONALITY

loginBtn.addEventListener("click", function (e) {
  // Prevents the page from reloading again
  e.preventDefault();

  // Getting the account using the username entered in the form
  currentAccount = accounts.find((acc) => acc.username === username.value);

  if (currentAccount && currentAccount?.pin === Number(password.value)) {
    // Actually displaying stuff
    bankDetails.style.opacity = 100;

    greeting.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    refreshDisplay(currentAccount);
  }

  // The focus is not on the input anymore
  username.blur();
  password.blur();

  // Clearing the fields of the input areas
  username.value = "";
  password.value = "";
});

// ==============================================================================
// ==============================================================================

// TRANSFER FUNCTIONALITY
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let recieverAccount = accounts.find(
    (acc) => acc.username === transferUser.value
  );

  // console.log(recieverAccount?.interestRate);
  let transferAmountValue = transferAmount.value;

  if (
    recieverAccount &&
    recieverAccount?.username !== currentAccount.username &&
    totalBalance > 0 &&
    totalBalance > transferAmountValue &&
    transferAmountValue > 0
  ) {
    // console.log(recieverAccount);
    currentAccount.movements.push(-transferAmountValue);
    totalBalance -= transferAmount.value;
    recieverAccount.movements.push(Number(transferAmountValue));
    refreshDisplay(currentAccount);
  }

  transferAmount.blur();
  transferUser.blur();
  transferUser.value = "";
  transferAmount.value = "";
});

// ==============================================================================
// ==============================================================================

// THE CLOSE ACCOUNT FUNCTIONALITY USING THE FIND INDEX METHOD

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let userToBeClosed = accounts.find((acc) => acc.username === closeUser.value);
  let userToBeClosedPin = closePin.value;

  if (
    userToBeClosed &&
    userToBeClosed.username === currentAccount.username &&
    userToBeClosedPin == currentAccount.pin
  ) {
    const indexDelete = accounts.findIndex(
      (acc) => acc.username === userToBeClosed.username
    );

    accounts.splice(indexDelete, 1);
    currentAccount = null;
    bankDetails.style.opacity = 0;
    greeting.textContent = "Log in to get started";
  }
});
// ==============================================================================
// ==============================================================================

// LOAN FUNCTIONALITY USING THE SOME METHOD

loanBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // The loan can only be approved if the user has a deposit of
  // at least 10% of the requested amount

  const loanValue = Number(loanAmount.value);

  if (
    loanValue > 0 &&
    currentAccount.movements.some((mov) => mov >= loanValue * 0.1)
  ) {
    currentAccount.movements.push(loanValue);
    refreshDisplay(currentAccount);
  }

  loanAmount.value = "";
  loanAmount.blur();
});

// ==============================================================================
// ==============================================================================
