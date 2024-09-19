document.addEventListener('DOMContentLoaded', function() {
    // Populate the scholarship dropdown on the application form
    fetch('data/scholarships.json')
        .then(response => response.json())
        .then(data => {
            populateScholarshipDropdown(data.scholarships);
        })
        .catch(error => {
            console.error('Error fetching scholarships:', error);
        });

    // Handle the form submission
    const applyForm = document.getElementById('apply-form');
    applyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        submitApplication();
    });
});

// Populate the scholarship dropdown with available scholarships
function populateScholarshipDropdown(scholarships) {
    const scholarshipDropdown = document.getElementById('scholarship-select');
    scholarshipDropdown.innerHTML = '<option value="">Select Scholarship</option>';

    scholarships.forEach(scholarship => {
        const option = document.createElement('option');
        option.value = scholarship.id;
        option.textContent = scholarship.name;
        scholarshipDropdown.appendChild(option);
    });
}

// Handle the form submission for application
function submitApplication() {
    const formData = new FormData(document.getElementById('apply-form'));

    const applicationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        scholarship: formData.get('scholarship'),
        reason: formData.get('reason')
    };

    console.log('Submitting application:', applicationData);

    alert('Your application has been submitted successfully!');
    document.getElementById('apply-form').reset();
}
