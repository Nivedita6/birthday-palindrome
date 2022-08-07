function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedString = reverseListOfChars.join(''); //same way we do split, same way we do join.
    return reversedString;
}


function checkPalindrome(str){
    var reverse = reverseStr(str);
    return reverse === str;
    // if (reverse === str){
    //     return true;
    // }
    // return false;
}

function convertDateToStr(date){

    var dateStr = {date: '', month: '', year: ''};

    if(date.day < 10){
        dateStr.date = '0' + date.day;
    }
    else{
        dateStr.date = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy =  dateStr.date + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.date + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.date;
    var ddmmyy = dateStr.date + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.date + dateStr.year.slice(-2); 
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.date;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;
    for(var i = 0; i < listOfPalindromes.length; i++){
        if(checkPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month =1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){ //infinite loop
        ctr++;
        var checkPalindrome = checkPalindromeForAllDateFormats(nextDate);
        
        if(checkPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

var dateInput = document.querySelector("#bday-input");
var output = document.querySelector("#result");
var showBtn = document.querySelector("#show-button");

function clickHandler(){
    var bdayStr = dateInput.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }; 

        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            output.innerText = "Yay! your birthday is a palindrome"
        }
        else{
            var [ctr, nextDate] = getNextPalindromeDate(date);
            output.innerText = "The next palindrome date is in " + nextDate.day + "-" + nextDate.month + "-" + nextDate.year + ". You missed it by  " + ctr + " days."
        }

    }
}

showBtn.addEventListener("click", clickHandler);

