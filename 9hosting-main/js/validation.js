document.addEventListener('DOMContentLoaded', function() {
    const applyForm = document.getElementById('apply-form');
    
    applyForm.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});

// Form validation function
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const scholarship = document.getElementById('scholarship-select').value.trim();
    const reason = document.getElementById('reason').value.trim();

    if (!name || !email || !phone || !scholarship || !reason) {
        alert('Please fill in all required fields.');
        return false;
    }

    return true;
}
