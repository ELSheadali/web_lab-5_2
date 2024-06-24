document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const selectedDateInput = document.getElementById('selected-date');
    const resetDateButton = document.getElementById('reset-date');
    let selectedDate = null;
    let currentYear = null;
    let currentMonth = null;

    const renderCalendar = (year, month) => {
        // Clear previous calendar if exists
        calendar.innerHTML = '';

        const calendarTable = document.createElement('table');
        calendarTable.className = 'calendar-table';

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        calendarHeader.innerHTML = `
            <div class="month-year">
                <button id="prev-year">&lt;&lt;</button>
                <button id="prev-month">&lt;</button>
                <span>${monthNames[month]}</span>
                <span>${year}</span>
                <button id="next-month">&gt;</button>
                <button id="next-year">&gt;&gt;</button>
            </div>
        `;
        calendar.appendChild(calendarHeader);

        const headerRow = document.createElement('tr');
        dayNames.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        calendarTable.appendChild(headerRow);

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDayOfMonth) {
                    cell.textContent = '';
                } else if (date > daysInMonth) {
                    cell.textContent = '';
                } else {
                    cell.textContent = date;
                    cell.dataset.date = `${year}-${month + 1}-${date}`;
                    if (selectedDate === cell.dataset.date) {
                        cell.classList.add('selected');
                    }
                    if (j === 0 && date === 1) {
                        cell.dataset.month = true; // Add data attribute to mark month names
                    }
                    cell.addEventListener('click', () => {
                        selectedDate = cell.dataset.date;
                        selectedDateInput.value = selectedDate;
                        updateSelectedDateClass();
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            calendarTable.appendChild(row);
        }
        calendar.appendChild(calendarTable);

        // Store current year and month for navigation
        currentYear = year;
        currentMonth = month;

        document.getElementById('prev-month').addEventListener('click', () => {
            const newMonth = currentMonth - 1;
            if (newMonth < 0) {
                renderCalendar(currentYear - 1, 11);
            } else {
                renderCalendar(currentYear, newMonth);
            }
        });

        document.getElementById('next-month').addEventListener('click', () => {
            const newMonth = currentMonth + 1;
            if (newMonth > 11) {
                renderCalendar(currentYear + 1, 0);
            } else {
                renderCalendar(currentYear, newMonth);
            }
        });

        document.getElementById('prev-year').addEventListener('click', () => {
            renderCalendar(currentYear - 1, currentMonth);
        });

        document.getElementById('next-year').addEventListener('click', () => {
            renderCalendar(currentYear + 1, currentMonth);
        });
    };

    const updateSelectedDateClass = () => {
        const cells = document.querySelectorAll('.calendar-table td');
        cells.forEach(cell => {
            if (cell.dataset.date === selectedDate) {
                cell.classList.add('selected');
            } else {
                cell.classList.remove('selected');
            }
        });
    };

    resetDateButton.addEventListener('click', () => {
        const today = new Date();
        selectedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        selectedDateInput.value = selectedDate;
        renderCalendar(today.getFullYear(), today.getMonth());
        updateSelectedDateClass();
    });

    // Initialize calendar with current date
    const today = new Date();
    selectedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    selectedDateInput.value = selectedDate;
    renderCalendar(today.getFullYear(), today.getMonth());
});
