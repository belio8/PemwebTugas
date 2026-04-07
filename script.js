const box = document.getElementById('feedbackContainer');
const form = document.getElementById('feedbackForm');

const render = () => {
    const data = JSON.parse(localStorage.getItem('assignedFeedback') || '[]');
    box.innerHTML = data.map(f => `
        <div class="feedback-item">
            <div class="feedback-header">
                <strong class="feedback-name">${f.from} (${f.email})</strong>
                <span class="feedback-date">${new Date(f.date).toLocaleDateString('id-ID')}</span>
            </div>
            <p class="feedback-message">${f.message}</p>
        </div>
    `).join('') || '<p class="no-feedback">Belum ada feedback.</p>';
};

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('assignedFeedback') || '[]');
    
    list.push({
        from: form.name.value,
        email: form.email.value,
        message: form.feedback.value,
        date: new Date()
    });

    localStorage.setItem('assignedFeedback', JSON.stringify(list));
    form.reset();
    render();
});

render();