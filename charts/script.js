fetch('data/daily_summary.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Inspect structure
    populateDropdown(data);
    drawChart(data);
  });

function populateDropdown(data) {
  const dropdown = document.getElementById('stockDropdown');
  const uniqueStocks = [...new Set(data.map(row => row.stockname))];

  uniqueStocks.forEach(stock => {
    const option = document.createElement('option');
    option.value = stock;
    option.text = stock;
    dropdown.appendChild(option);
  });
}


function drawChart(data) {
    const ctx = document.getElementById('priceChart').getContext('2d');
  
    const tsla = data.filter(d => d.stockname === 'TSLA');
  
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tsla.map(row => row.trade_date),
        datasets: [{
          label: 'Daily Close Price (TSLA)',
          data: tsla.map(row => row.daily_close),
          borderColor: 'blue',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Price ($)' } }
        }
      }
    });
  }
  