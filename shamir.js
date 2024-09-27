const fs = require('fs');

// Decode value from a given base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Lagrange interpolation to find the polynomial value at x
function lagrangeInterpolation(xValues, yValues, x) {
    let totalSum = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let xi = xValues[i];
        let yi = yValues[i];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (x - xValues[j]) / (xi - xValues[j]);
            }
        }
        totalSum += term;
    }

    return totalSum;
}

// Find the constant term c from the polynomial defined by the given roots
function findConstantTerm(data) {
    const n = data.keys.n;
    const k = data.keys.k;

    const xValues = [];
    const yValues = [];

    for (const key in data) {
        if (key === "keys") continue;
        const base = data[key].base;
        const value = data[key].value;
        const x = parseInt(key);
        const y = decodeValue(base, value);

        xValues.push(x);
        yValues.push(y);
    }

    if (xValues.length < k || yValues.length < k) {
        throw new Error("Not enough data points to determine the polynomial.");
    }

    // Calculate the constant term c at x = 0
    return lagrangeInterpolation(xValues.slice(0, k), yValues.slice(0, k), 0);
}

// Main function to read JSON input and compute the constant term
function main() {
    const testCase1 = `{
        "keys": {
            "n": 4,
            "k": 3
        },
        "1": {
            "base": "10",
            "value": "4"
        },
        "2": {
            "base": "2",
            "value": "111"
        },
        "3": {
            "base": "10",
            "value": "12"
        },
        "6": {
            "base": "4",
            "value": "213"
        }
    }`;

    const testCase2 = `{
        "keys": {
            "n": 9,
            "k": 6
        },
        "1": {
            "base": "10",
            "value": "28735619723837"
        },
        "2": {
            "base": "16",
            "value": "1A228867F0CA"
        },
        "3": {
            "base": "12",
            "value": "32811A4AA0B7B"
        },
        "4": {
            "base": "11",
            "value": "917978721331A"
        },
        "5": {
            "base": "16",
            "value": "1A22886782E1"
        },
        "6": {
            "base": "10",
            "value": "28735619654702"
        },
        "7": {
            "base": "14",
            "value": "71AB5070CC4B"
        },
        "8": {
            "base": "9",
            "value": "122662581541670"
        },
        "9": {
            "base": "8",
            "value": "642121030037605"
        }
    }`;

    const data1 = JSON.parse(testCase1);
    const data2 = JSON.parse(testCase2);

    const c1 = findConstantTerm(data1);
    const c2 = findConstantTerm(data2);

    console.log(`Constant term for test case 1: ${c1}`);
    console.log(`Constant term for test case 2: ${c2}`);
}

main();
