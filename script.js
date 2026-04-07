const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackForm = document.getElementById('feedbackForm');

// Fungsi untuk merender list feedback
const displayFeedback = () => {
    const feedback = JSON.parse(localStorage.getItem('assignedFeedback')) || [];
    
    if (!feedback.length) {
        feedbackContainer.innerHTML = '<p class="no-feedback">Belum ada feedback.</p>';
        return;
    }

    feedbackContainer.innerHTML = '<h3>Feedback dari Pengguna:</h3>' + feedback.map(item => `
        <div class="feedback-item">
            <div class="feedback-header">
                <strong class="feedback-name">${item.from}</strong>
                <span class="feedback-date">${new Date(item.date).toLocaleDateString('id-ID')}</span>
            </div>
            <p class="feedback-message">${item.message}</p>
        </div>
    `).join('');
};

// Handle submit form
feedbackForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newFeedback = {
        from: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('feedback').value,
        date: new Date()
    };

    const feedback = JSON.parse(localStorage.getItem('assignedFeedback')) || [];
    feedback.push(newFeedback);
    localStorage.setItem('assignedFeedback', JSON.stringify(feedback));

    feedbackForm.reset();
    displayFeedback();
});

displayFeedback();