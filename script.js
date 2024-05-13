function calculate() {
    var n = +document.getElementById('n').value;
    var U = Array.from({length: 20}, (_, i) => i + 1);
    var A = U.map(x => Math.exp(-Math.pow(x - (n + 2), 2)));
    var B = U.map(x => 1 - Math.exp(-Math.pow(x - (n + 2), 2)));
    var C_intersect = A.map((a, i) => Math.min(a, B[i]));
    var C_union = A.map((a, i) => Math.max(a, B[i]));

    var sigma = 10;
    var C = U.map(x => Math.exp(-Math.pow(x - 0, 2) / (2 * sigma * sigma)));

    var data = [
        {x: U, y: A, mode: 'lines', name: 'A'},
        {x: U, y: B, mode: 'lines', name: 'B'},
        {x: U, y: C_intersect, mode: 'lines', name: 'C_intersect'},
        {x: U, y: C_union, mode: 'lines', name: 'C_union'},
        {x: U, y: C, mode: 'lines', name: 'C'}
    ];

    Plotly.newPlot('plot', data);

    var results = '';
    results += 'Ядро A: ' + U.filter((_, i) => A[i] === 1).join(', ') + '<br>';
    results += 'Носій A: ' + U.filter((_, i) => A[i] > 0).join(', ') + '<br>';
    results += 'Висота A: ' + Math.max(...A) + '<br>';
    ['0.8', '0.6', '0.4', '0.1'].forEach(alpha => {
        results += 'A' + alpha + ': ' + U.filter((_, i) => A[i] >= alpha).join(', ') + '<br>';
    });

    document.getElementById('results').innerHTML = results;
}
