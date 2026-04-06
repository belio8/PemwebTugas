// Feedback handling with error management
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackForm = document.getElementById('feedbackForm');

// Display assigned feedback
function displayFeedback() {
    try {
        const feedback = JSON.parse(localStorage.getItem('assignedFeedback')) || [];
        
        if (feedback.length === 0) {
            feedbackContainer.innerHTML = '<p class="no-feedback">Belum ada feedback.</p>';
            return;
        }

        feedbackContainer.innerHTML = '<h3>Feedback dari Pengguna:</h3>' + feedback.map(item => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <strong class="feedback-name">${item.from}</strong>
                    <span class="feedback-date">${new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <p class="feedback-message">${item.message}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading feedback:', error);
        feedbackContainer.innerHTML = '<p class="error">Gagal memuat feedback.</p>';
    }
}

// Submit new feedback
feedbackForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const message = document.getElementById('feedback').value;
        const from = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (!message.trim() || !from.trim() || !email.trim()) {
            throw new Error('Semua field harus diisi');
        }

        const newFeedback = { from, email, message, date: new Date() };
        const feedback = JSON.parse(localStorage.getItem('assignedFeedback')) || [];
        feedback.push(newFeedback);
        localStorage.setItem('assignedFeedback', JSON.stringify(feedback));

        feedbackForm.reset();
        displayFeedback();
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Gagal submit feedback: ' + error.message);
    }
});

// Load feedback on page start
displayFeedback();