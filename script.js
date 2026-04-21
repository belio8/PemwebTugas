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

function feedbackValidate() {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const feedback = form.feedback.value.trim();
    const telephone = form.telephone.value.trim();
    if (!name || !email || !feedback) {
        alert('Semua field harus diisi!');
        return false;
    }
    else if(name.length < 3) {
        alert('Nama harus lebih dari 3 karakter!');
        return false;
    }
    else if(!email.includes('@') || !email.includes('.')) {
        alert('Email tidak valid!');
        return false;
    }
    else if(!/^\d{10,15}$/.test(telephone)) {
        alert('Nomor telepon tidak valid!');
        return false;
    }
    return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!feedbackValidate()) {
        return;
    }
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