
const fs = require('fs');

function convertToBase10(value, base) {
    return parseInt(value, base);
}


function lagrangeInterpolation(points, k) {
    let c = 0.0;
    for (let i = 0; i < k; i++) {
        let term = points[i][1]; 
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        c += term;
    }
    return c;
}


function processTestCase(input) {
    const n = parseInt(input.keys.n);
    const k = parseInt(input.keys.k);

    const points = [];

   
    for (let key in input) {
        if (key === 'keys') continue;

        const x = parseInt(key);
        const base = parseInt(input[key].base);
        const yValue = input[key].value;
        const y = convertToBase10(yValue, base); 

        points.push([x, y]);
    }

    
    const c = lagrangeInterpolation(points, k);
    console.log("The constant term c is:", c);
}


function main() {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const testCases = JSON.parse(data);


        testCases.forEach(testCase => processTestCase(testCase));
    });
}


main();
