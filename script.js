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
        dateStr.day = date.day.toString();
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

var date = {
    day : 15,
    month : 19,
    year : 2022
}

console.log(convertDateToStr(date));