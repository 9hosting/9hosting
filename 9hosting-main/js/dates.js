// Load closing and upcoming dates on DOM content load
document.addEventListener('DOMContentLoaded', function() {
    fetch('data/dates.json')
        .then(response => response.json())
        .then(data => {
            displayClosingDates(data.closing_dates);
            displayUpcomingScholarships(data.upcoming_scholarships);
        })
        .catch(error => {
            console.error('Error fetching dates:', error);
        });
});

// Display scholarships that are closing soon
function displayClosingDates(closingDates) {
    const closingList = document.getElementById('closing-dates');
    closingList.innerHTML = '';

    closingDates.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${item.scholarship}</strong> - Apply by: ${item.closing_date}`;
        closingList.appendChild(listItem);
    });
}

// Display upcoming scholarships with their tentative dates
function displayUpcomingScholarships(upcomingScholarships) {
    const upcomingList = document.getElementById('upcoming-scholarships');
    upcomingList.innerHTML = '';

    upcomingScholarships.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${item.scholarship}</strong> - Opening: ${item.tentative_opening}`;
        upcomingList.appendChild(listItem);
    });
}
