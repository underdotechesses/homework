function getRenderedDays(monthIndex, year) {
    const days = [];
    const firstDayOfMonth = new Date(year, monthIndex, 1, 12, 0, 0, 0);
    const firstWeekDayOfMonth = firstDayOfMonth.getDay();
    const startDayShift = firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0, 12, 0, 0, 0);
    const lastWeekDayOfMonth = lastDayOfMonth.getDay();
    const endDayShift = lastWeekDayOfMonth === 0 ? 0 : 7 - lastWeekDayOfMonth;
    const firstRenderedDay = new Date(year, monthIndex, 1 - startDayShift, 12, 0, 0, 0);
    const lastRenderedDay = new Date(year, monthIndex + 1, endDayShift, 12, 0, 0, 0);

    //console.log({monthIndex, year, firstDayOfMonth, firstWeekDayOfMonth, startDayShift, lastDayOfMonth, lastWeekDayOfMonth, endDayShift, firstRenderedDay, lastRenderedDay});

    for (const day = new Date(firstRenderedDay); day <= lastRenderedDay; day.setDate( day.getDate() + 1)) {
        days.push(new Date(day));
    }

    return days;
}

console.log(getRenderedDays(6, 2023));

const MONTHES = [
    'January',
    'Fabruary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const currentDay = getCurrentDay();
const item = {
    year: currentDay.getFullYear(),
    monthIndex: currentDay.getMonth(),
    $title: document.querySelector('.aside--time-link'),
    $today: document.querySelector('.today'),
    $prev: document.querySelector('.calendar__btn--prev'),
    $next: document.querySelector('.calendar__btn--next'),
    $days: document.querySelector('.calendar')
};

console.log(item);

renderCalendar(item);

item.$prev.addEventListener('click', function() {
    const prevMonth = new Date(item.year, item.monthIndex - 1, 1, 12, 0, 0, 0);

    item.year = prevMonth.getFullYear();
    item.monthIndex = prevMonth.getMonth();

    renderCalendar(item);
})

item.$next.addEventListener('click', function() {
    const nextMonth = new Date(item.year, item.monthIndex + 1, 1, 12, 0, 0, 0);

    item.year = nextMonth.getFullYear();
    item.monthIndex = nextMonth.getMonth();

    renderCalendar(item);
})

function getCurrentDay() {
    const currentDay = new Date();

    currentDay.setHours(12);
    currentDay.setMinutes(0);
    currentDay.setSeconds(0);
    currentDay.setMilliseconds(0);

    return currentDay;
}

function getShownDay() {
    const {search} = location;
    const params = new URLSearchParams(search);
    const day = params.get('day')||(new Date()).toJSON();
    const shownDay = new Date(day);
    shownDay.setHours(12);
    shownDay.setMinutes(0);
    shownDay.setSeconds(0);
    shownDay.setMilliseconds(0);

    return shownDay;
}

function getCalendarTitle({year, monthIndex}) {
    return `${MONTHES[monthIndex]} ${year}`;
}

function getToday({year, monthIndex}, {shownDay}) {
    return `${shownDay} ${MONTHES[monthIndex]} ${year}`;
}

function renderDay(day, monthIndex) {
    const $li = document.createElement('li');
    const $link = document.createElement('a');

    $li.className = 'calendar__day';
    $link.className = 'calendar__day-link';

    $link.setAttribute('aria-label', day.toDateString());
    $link.href = `?day=${day.toJSON().split('T')[0]}`;

    $link.innerText = day.getDate();

    $li.append($link);

    if(day.getMonth() !== monthIndex) {
        $li.classList.add('calendar__day--not-in-month');
    }

    return $li;
}

function renderCalendar(item) {
    item.$title.innerText = getCalendarTitle(item);
    item.$days.innerText = '';
    // item.$today.innerText = getToday(item.year, itme.monthIndex);

    const currentDay = getCurrentDay();
    const shownDay = getShownDay();

    const days = getRenderedDays(item.monthIndex, item.year);
    const renderDays = days.map(day => {
        const $li = renderDay(day, item.monthIndex);

        if(currentDay.getTime() === day.getTime()) {
            $li.classList.add('calendar__day--current');
        }
        if(shownDay.getTime() === day.getTime()) {
            $li.classList.add('calendar__shown--day');
        }

        return $li;
    });

    item.$days.append(...renderDays);

    console.log(days, renderDays);
}