// Load and display the scholarships on the homepage
document.addEventListener('DOMContentLoaded', function() {
    fetch('data/scholarships.json')
        .then(response => response.json())
        .then(data => {
            displayScholarships(data.scholarships);
        })
        .catch(error => {
            console.error('Error fetching scholarships:', error);
        });
});

// Function to display scholarships on the homepage
function displayScholarships(scholarships) {
    const scholarshipsList = document.getElementById('scholarship-list');
    scholarshipsList.innerHTML = '';

    scholarships.forEach(scholarship => {
        const scholarshipItem = document.createElement('div');
        scholarshipItem.classList.add('scholarship-item');
        scholarshipItem.innerHTML = `
            <h3>${scholarship.name}</h3>
            <p><strong>Eligibility:</strong> ${scholarship.eligibility}</p>
            <p><strong>Income Criteria:</strong> ${scholarship.income_criteria}</p>
            <p><strong>Apply by:</strong> ${scholarship.apply_by}</p>
            <a href="#" class="view-details" data-id="${scholarship.id}">View Details</a>
        `;
        scholarshipsList.appendChild(scholarshipItem);
    });

    document.querySelectorAll('.view-details').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const id = event.target.getAttribute('data-id');
            loadScholarshipDetails(id);
        });
    });
}

// Function to load scholarship details
function loadScholarshipDetails(id) {
    fetch('data/scholarship_details.json')
        .then(response => response.json())
        .then(data => {
            const scholarship = data[id];
            if (scholarship) {
                displayScholarshipDetails(scholarship);
            } else {
                alert('Scholarship details not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching scholarship details:', error);
        });
}

// Function to display detailed view of a scholarship
function displayScholarshipDetails(scholarship) {
    const scholarshipDetailsContainer = document.getElementById('scholarship-details');
    scholarshipDetailsContainer.innerHTML = `
        <h2>${scholarship.name}</h2>
        <p><strong>Description:</strong> ${scholarship.description}</p>
        <p><strong>Eligibility:</strong> ${scholarship.eligibility}</p>
        <p><strong>Income Criteria:</strong> ${scholarship.income_criteria}</p>
        <p><strong>Apply By:</strong> ${scholarship.apply_by}</p>
        <a href="${scholarship.apply_link}" target="_blank" class="apply-link">Apply Now</a>
    `;

    // Scroll to the details section
    document.getElementById('scholarship-details').scrollIntoView({ behavior: 'smooth' });
}
