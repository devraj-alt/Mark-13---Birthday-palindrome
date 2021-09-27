const inputDate = document.querySelector(".input-date");
const btnCheck = document.querySelector(".btn-check");
const outputDiv = document.querySelector(".output-div");
const spinner = document.querySelector(".spinner");

var nextDate = 0;
var nextMonth = 0;
var nextYear = 0;
var counter = 0;

const dateMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const clickHandler = () => {
  outputDiv.innerHTML = "";
  const dateString = inputDate.value;
  if (dateString) {
    const dateArray = dateString.split("-");
    const date = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];
    nextDate = Number(date);
    nextMonth = Number(month);
    nextYear = Number(year);

    const dateFormatArray = createDateFormat(date, month, year);
    spinner.style.display = "block";
    setTimeout(() => {
      palindromeChecker(dateFormatArray);
    }, 2000);
  } else {
    displayMessage("Date is invalid!", true);
  }
};

const createDateFormat = (date, month, year) => {
  const format1 = date + month + year;
  const format2 = month + date + year;
  const format3 = month + year + date;
  const format4 = year + month + date;
  const format5 = year + date + month;
  const format6 = date + year + month;
  return [format1, format2, format3, format4, format5, format6];
};

const palindromeChecker = (dates) => {
  for (var i = 0; i < dates.length; i++) {
    if (isPalindrome(dates[i])) {
      spinner.style.display = "none";
      displayMessage("Your birthday is palindrome", true);
      return;
    }
  }
  nextPalindromeChecker();
};

const isPalindrome = (date) => {
  const reversedString = date.split("").reverse().join("");
  return date === reversedString;
};

const nextPalindromeChecker = () => {
  while (true) {
    counter++;
    nextDate = nextDate + 1;

    if (nextDate > dateMonths[nextMonth - 1]) {
      nextDate = 1;
      nextMonth = nextMonth + 1;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear = nextYear + 1;
      }
    }

    var nextDateString = nextDate;
    var nextMonthString = nextMonth;
    if (nextDate < 10) {
      nextDateString = "0" + nextDate;
    }
    if (nextMonth < 10) {
      nextMonthString = "0" + nextMonth;
    }
    const dates = createDateFormat(
      nextDateString,
      nextMonthString,
      nextYear.toString()
    );
    for (var i = 0; i < dates.length; i++) {
      if (isPalindrome(dates[i])) {
        spinner.style.display = "none";
        displayMessage("Your birthday is not a  palindrome.", false);
        displayMessage(
          " Next palindrome date is " +
            nextDateString +
            "/" +
            nextMonthString +
            "/" +
            nextYear +
            ".",
          false
        );
        displayMessage("You missed by" + counter + "days", false);
        return;
      }
    }
  }
};

const displayMessage = (msg, clear) => {
  if (clear) {
    outputDiv.innerHTML = "";
  }
  const para = document.createElement("p");
  const nodeText = document.createTextNode(msg);
  para.append(nodeText);
  outputDiv.appendChild(para);
};

btnCheck.addEventListener("click", clickHandler);
