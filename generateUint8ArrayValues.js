const MAX_SUPPLY_TOKENS = 1_000_000_000; // 1 billion tokens
const DECIMALS = 18;

const MULTIPLIER = 10n ** BigInt(DECIMALS);

function tokensToBigInt(tokenCount) {
    return BigInt(tokenCount) * MULTIPLIER;
}

function bigIntToUint8Array(value) {
    let hex = value.toString(16);
    hex = hex.padStart(64, '0');
    const arr = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
        arr[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return arr;
}

function arrayToLiteral(arr) {
    const bytes = Array.from(arr).map((b) => '0x' + b.toString(16).padStart(2, '0'));
    return `[${bytes.join(', ')}]`;
}

const MAX_SUPPLY = tokensToBigInt(MAX_SUPPLY_TOKENS);
const maxSupplyArr = bigIntToUint8Array(MAX_SUPPLY);

console.log('MAX_SUPPLY Uint8Array:');
console.log(arrayToLiteral(maxSupplyArr));
