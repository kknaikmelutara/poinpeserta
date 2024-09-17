const daftarNama = [
    "JUWARIYAH HASNA",
    "AHMAD MAHENDRA",
    "AULIA AL MAR'ATUSSALIHAH",
    "EMA HAMDANI PUTRI",
    "M. AZZAR NOZZI",
    "M. KHAIRUL MINAN",
    "M. ROZI RAMDANI",
    "M. SIRO JUDIN BASRI",
    "M. ZARKAWI RAMADAN",
    "MUHAMMAD FAUZAN HAKIM",
    "RAQASY ASIRULLAH",
    "SALMIYAH",
    "SALSABILA",
    "SERLY SASKIA SAFITRI",
    "SITI AZIZAH",
    "ZULYA MAHENDI"
];

const warnaKelas = [
    'color1', 'color2', 'color3', 'color4', 'color5',
    'color6', 'color7', 'color8', 'color9', 'color10',
    'color11', 'color12', 'color13', 'color14', 'color15',
    'color16'
];

function init() {
    if (!localStorage.getItem('poinData')) {
        const initialPoinData = {};
        daftarNama.forEach(nama => initialPoinData[nama] = 0);
        localStorage.setItem('poinData', JSON.stringify(initialPoinData));
    }

    populateNamaSelect();

    document.getElementById('poinForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nama = document.getElementById('nama').value;
        const poin = parseInt(document.getElementById('poin').value);

        const poinData = JSON.parse(localStorage.getItem('poinData'));
        if (poinData[nama] !== undefined) {
            poinData[nama] += poin;
            localStorage.setItem('poinData', JSON.stringify(poinData));
            updatePoinList();
        }
    });

    updatePoinList();
}

function populateNamaSelect() {
    const namaSelect = document.getElementById('nama');
    namaSelect.innerHTML = '';  // Clear existing options

    daftarNama.forEach((nama) => {
        const option = document.createElement('option');
        option.value = nama;
        option.textContent = nama;
        namaSelect.appendChild(option);
    });
}

function updatePoinList() {
    const poinData = JSON.parse(localStorage.getItem('poinData'));
    const poinStats = document.getElementById('poinStats');
    poinStats.innerHTML = '';

    let colorIndex = 0;
    for (const nama in poinData) {
        const div = document.createElement('div');
        div.className = `stat-item ${warnaKelas[colorIndex % warnaKelas.length]}`;
        div.innerHTML = `
          <h3>${nama}</h3>
          <div class="poin-value">${poinData[nama]} poin</div>
          <button class="decrease-btn" data-nama="${nama}">-</button>
          <button class="remove-btn" data-nama="${nama}">×</button>
          <button class="reset-btn" data-nama="${nama}">Reset</button>
      `;
        poinStats.appendChild(div);
        colorIndex++;
    }

    // Add event listeners for decrease, remove, and reset buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const nama = this.getAttribute('data-nama');
            removePoin(nama);
        });
    });

    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function() {
            const nama = this.getAttribute('data-nama');
            decreasePoin(nama);
        });
    });

    document.querySelectorAll('.reset-btn').forEach(button => {
        button.addEventListener('click', function() {
            const nama = this.getAttribute('data-nama');
            resetPoin(nama);
        });
    });
}

function resetPoin(nama) {
    const poinData = JSON.parse(localStorage.getItem('poinData'));
    if (poinData[nama] !== undefined) {
        poinData[nama] = 0; // Reset points to 0
        localStorage.setItem('poinData', JSON.stringify(poinData));
        updatePoinList();  // Update the list to reflect the reset
    }
}

function removePoin(nama) {
    const poinData = JSON.parse(localStorage.getItem('poinData'));
    if (poinData[nama] !== undefined) {
        delete poinData[nama];
        localStorage.setItem('poinData', JSON.stringify(poinData));
        updatePoinList();
    }
}

function decreasePoin(nama) {
    const poinData = JSON.parse(localStorage.getItem('poinData'));
    if (poinData[nama] !== undefined) {
        poinData[nama] = Math.max(poinData[nama] - 1, 0); // Decrease by 1, but not below 0
        localStorage.setItem('poinData', JSON.stringify(poinData));
        updatePoinList();
    }
}

document.addEventListener('DOMContentLoaded', init);
