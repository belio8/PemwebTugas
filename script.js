const box = document.getElementById('feedbackContainer');
const form = document.getElementById('feedbackForm');

const render = async () => {
    try {
        // Memanggil file PHP yang baru kita buat
        const response = await fetch('ambil_data.php');
        const data = await response.json();

        if (data.length === 0) {
            box.innerHTML = '<p class="no-feedback">Belum ada feedback di database.</p>';
            return;
        }

        box.innerHTML = data.map(f => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <strong class="feedback-name">${f.name} (${f.email})</strong>
                    <span class="feedback-date">${f.created_at}</span>
                </div>
                <p class="feedback-message">${f.comment}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching data:', error);
        box.innerHTML = '<p class="no-feedback">Gagal memuat data dari database.</p>';
    }
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

form.addEventListener('submit', async (e) => {
    // 1. Selalu cegah form agar halaman TIDAK me-refresh
    e.preventDefault(); 

    // 2. Lakukan validasi. Jika gagal, berhenti di sini.
    if (!feedbackValidate()) return;

    // 3. Kemas semua inputan form secara otomatis
    const formData = new FormData(form);

    try {
        // 4. Kirim data ke tambah.php 
        const response = await fetch('tambah.php', {
            method: 'POST',
            body: formData
        });

        // Tangkap balasan dari PHP (ingat di tambah.php kita menulis echo "success")
        const result = await response.text(); 

        if (result.trim() === "success") {
            // Beritahu user bahwa data sukses masuk (karena halaman tidak refresh)
            //alert("Data berhasil disimpan!");

            // 5. PENTING: Jangan gunakan form.reset() karena akan menghapus semua isi form.
            // Kita HANYA mengosongkan kolom komentar, biarkan Nama, Email, dan Telepon tetap terisi
            form.feedback.value = '';

            // 6. Panggil fungsi render() untuk mengambil data terbaru dari database
            render(); 
        } else {
            alert("Gagal menyimpan data ke database.");
        }
        
    } catch (error) {
        alert('Terjadi kesalahan saat mengirim data ke server.');
        console.error('Error:', error);
    }
});

render();