import moment from 'moment';

function getDayOfWeek(value){
    switch(value) {
        case 0: return 'Chủ nhật';
        case 1: return 'Thứ hai';
        case 2: return 'Thứ ba';
        case 3: return 'Thứ tư';
        case 4: return 'Thứ năm';
        case 5: return 'Thứ sáu';
        case 6: return 'Thứ bảy';
    }
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function getTabsDate(){
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var tabs = [
        {heading: currentMonth-2 + '/' + currentYear, 
        fromDate: new Date(currentYear, currentMonth-3, 1), 
        toDate: new Date(currentYear, currentMonth-3, daysInMonth(currentMonth-2, currentYear))},

        {heading: currentMonth-1 + '/' + currentYear, 
        fromDate: new Date(currentYear, currentMonth-2, 1), 
        toDate: new Date(currentYear, currentMonth-2, daysInMonth(currentMonth-1, currentYear))},

        {heading: currentMonth + '/' + currentYear, 
        fromDate: new Date(currentYear, currentMonth-1, 1), 
        toDate: new Date(currentYear, currentMonth-1, daysInMonth(currentMonth, currentYear))},

        {heading: currentMonth + 1 + '/' + currentYear, 
        fromDate: new Date(currentYear, currentMonth, 1), 
        toDate: new Date(currentYear, currentMonth, daysInMonth(currentMonth+1, currentYear))},
    ]
    return tabs;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export default {
    getDayOfWeek,
    getTabsDate,
    daysInMonth,
    getRandomColor,
}