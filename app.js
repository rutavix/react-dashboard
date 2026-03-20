const services = [
  { name: 'gateway', latency: 145, errorRate: 0.004 },
  { name: 'api', latency: 185, errorRate: 0.009 },
  { name: 'worker', latency: 230, errorRate: 0.014 },
  { name: 'search', latency: 120, errorRate: 0.003 }
];

const kpis = [
  { label: 'Services', value: services.length },
  { label: 'Avg Latency (ms)', value: Math.round(services.reduce((s, x) => s + x.latency, 0) / services.length) },
  { label: 'Avg Error Rate', value: `${(services.reduce((s, x) => s + x.errorRate, 0) / services.length * 100).toFixed(2)}%` }
];

const kpiGrid = document.getElementById('kpi-grid');
kpis.forEach((kpi) => {
  const card = document.createElement('article');
  card.className = 'kpi-card';
  card.innerHTML = `<div>${kpi.label}</div><div class="kpi-value">${kpi.value}</div>`;
  kpiGrid.appendChild(card);
});

const body = document.getElementById('service-body');
services.forEach((service) => {
  const status = service.errorRate < 0.01 ? 'Healthy' : 'Watch';
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${service.name}</td>
    <td>${service.latency} ms</td>
    <td>${(service.errorRate * 100).toFixed(2)}%</td>
    <td class="${status === 'Healthy' ? 'ok' : 'warn'}">${status}</td>
  `;
  body.appendChild(row);
});

const chart = document.getElementById('latency-chart');
const points = services.map((service, index) => `${40 + index * 160},${160 - service.latency / 2}`).join(' ');
chart.innerHTML = `
  <polyline points="${points}" fill="none" stroke="#38bdf8" stroke-width="3" />
`;
