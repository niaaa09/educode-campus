document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HYPERLINK & HASH ROUTING NAVIGATION ---
    const pages = {
        'home': document.getElementById('page-home'),
        'gallery': document.getElementById('page-gallery'),
        'pendaftaran': document.getElementById('page-pendaftaran')
    };

    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    function handleRouting() {
        let hash = window.location.hash.replace('#', '');
        if (!pages[hash]) {
            hash = 'home';
        }

        Object.keys(pages).forEach(pageKey => {
            if (pages[pageKey]) pages[pageKey].classList.remove('active');
        });
        if (pages[hash]) pages[hash].classList.add('active');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        if (mobileMenu) mobileMenu.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('hashchange', handleRouting);
    handleRouting();

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- 2. FORM VALIDATION & CONFIRMATION MODAL ---
    const btnSubmit = document.getElementById('btn-submit');
    const modal = document.getElementById('confirm-modal');
    const modalBtnCancel = document.getElementById('modal-btn-cancel');
    const modalBtnConfirm = document.getElementById('modal-btn-confirm');

    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const btnRegisterAgain = document.getElementById('btn-register-again');

    const inputNik = document.getElementById('nik');
    const inputNama = document.getElementById('nama');
    const inputNoHp = document.getElementById('nohp');
    const inputAlamat = document.getElementById('alamat');

    const errNik = document.getElementById('error-nik');
    const errNama = document.getElementById('error-nama');
    const errJk = document.getElementById('error-jk');
    const errNoHp = document.getElementById('error-nohp');
    const errAlamat = document.getElementById('error-alamat');
    const errLang = document.getElementById('error-lang');

    // Only numbers for NIK & HP
    if (inputNik) {
        inputNik.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
    if (inputNoHp) {
        inputNoHp.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    function validateForm() {
        let isValid = true;
        [errNik, errNama, errJk, errNoHp, errAlamat, errLang].forEach(err => err.classList.add('hidden'));

        if (!inputNik.value || inputNik.value.length !== 16) {
            errNik.classList.remove('hidden');
            isValid = false;
        }

        if (!inputNama.value.trim()) {
            errNama.classList.remove('hidden');
            isValid = false;
        }

        const selectedJk = document.querySelector('input[name="jenis_kelamin"]:checked');
        if (!selectedJk) {
            errJk.classList.remove('hidden');
            isValid = false;
        }

        if (!inputNoHp.value || inputNoHp.value.length < 10) {
            errNoHp.classList.remove('hidden');
            isValid = false;
        }

        if (!inputAlamat.value.trim()) {
            errAlamat.classList.remove('hidden');
            isValid = false;
        }

        const selectedLangs = document.querySelectorAll('input[name="lang"]:checked');
        if (selectedLangs.length === 0) {
            errLang.classList.remove('hidden');
            isValid = false;
        }

        return isValid;
    }

    function openModal() {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }

    if (btnSubmit) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateForm()) {
                openModal();
            }
        });
    }

    if (modalBtnCancel) modalBtnCancel.addEventListener('click', closeModal);

    if (modalBtnConfirm) {
        modalBtnConfirm.addEventListener('click', () => {
            closeModal();

            const nik = inputNik.value;
            const nama = inputNama.value;
            const jk = document.querySelector('input[name="jenis_kelamin"]:checked').value;
            const nohp = inputNoHp.value;
            const alamat = inputAlamat.value;
            const selectedLangs = Array.from(document.querySelectorAll('input[name="lang"]:checked'))
                .map(cb => cb.value);

            document.getElementById('res-nik').textContent = nik;
            document.getElementById('res-nama').textContent = nama;
            document.getElementById('res-jk').textContent = jk;
            document.getElementById('res-nohp').textContent = nohp;
            document.getElementById('res-alamat').textContent = alamat;

            const langContainer = document.getElementById('res-lang');
            langContainer.innerHTML = '';
            selectedLangs.forEach(lang => {
                const badge = document.createElement('span');
                badge.className = 'px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs';
                badge.textContent = lang;
                langContainer.appendChild(badge);
            });

            formContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');

            window.scrollTo({ top: resultContainer.offsetTop - 100, behavior: 'smooth' });
        });
    }

    if (btnRegisterAgain) {
        btnRegisterAgain.addEventListener('click', () => {
            resultContainer.classList.add('hidden');
            formContainer.classList.remove('hidden');
        });
    }

});