const warnaKelas = [
  'color1', 'color2', 'color3', 'color4', 'color5',
  'color6', 'color7', 'color8', 'color9', 'color10',
  'color11', 'color12', 'color13', 'color14', 'color15',
  'color16'
];

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
    `;
    poinStats.appendChild(div);
    colorIndex++;
  }
}

document.addEventListener('DOMContentLoaded', updatePoinList);
