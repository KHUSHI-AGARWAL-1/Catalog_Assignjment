// Convert a number from a specific base to decimal
function toDecimal(base, num) {
    return parseInt(num, parseInt(base));
}

// Perform Lagrange interpolation to compute the polynomial value at a given x
function lagrange(xArr, yArr, x) {
    let sum = 0;
    const len = xArr.length;

    for (let i = 0; i < len; i++) {
        let term = yArr[i];

        for (let j = 0; j < len; j++) {
            if (i !== j) {
                term *= (x - xArr[j]) / (xArr[i] - xArr[j]);
            }
        }
        sum += term;
    }

    return sum;
}

// Calculate the constant term from the polynomial derived using the given points
function getConst(data) {
    const n = data.keys.n;
    const k = data.keys.k;

    const xArr = [];
    const yArr = [];

    for (const key in data) {
        if (key === "keys") continue;

        const base = data[key].base;
        const val = data[key].value;
        const x = parseInt(key);
        const y = toDecimal(base, val);

        xArr.push(x);
        yArr.push(y);
    }

    if (xArr.length < k || yArr.length < k) {
        throw new Error("Not enough points to determine the polynomial.");
    }

    // Compute the polynomial value at x = 0
    return lagrange(xArr.slice(0, k), yArr.slice(0, k), 0);
}

// Main function to import JSON data and find the constant term
async function run() {
    // Dynamically import JSON files
    const data1 = await import('./testCase1.json', { assert: { type: 'json' } });
    const data2 = await import('./testCase2.json', { assert: { type: 'json' } });

    const c1 = getConst(data1.default);
    const c2 = getConst(data2.default);

    console.log(`Constant term for test case 1: ${c1}`);
    console.log(`Constant term for test case 2: ${c2}`);
}

run();
