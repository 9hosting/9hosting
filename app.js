// Initial user balance and portfolio
let balance = 100000; // $100,000 in virtual money
let portfolio = {
    btc: 0, // Amount of BTC owned
    eth: 0  // Amount of ETH owned
};
let transactionHistory = [];

// Fetch cryptocurrency prices from CoinGecko API
const fetchCryptoPrices = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const data = await response.json();
        document.querySelector('#btc-price span').innerText = data.bitcoin.usd;
        document.querySelector('#eth-price span').innerText = data.ethereum.usd;
        return data;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
};

// Buy crypto
const buyCrypto = async () => {
    const crypto = document.getElementById('crypto-select').value;
    const amount = parseFloat(document.getElementById('trade-amount').value);

    const prices = await fetchCryptoPrices();
    let pricePerUnit = crypto === 'btc' ? prices.bitcoin.usd : prices.ethereum.usd;
    
    if (amount <= balance) {
        let units = amount / pricePerUnit;
        portfolio[crypto] += units;
        balance -= amount;
        addTransaction('buy', crypto, units, amount);
        updateUI();
    } else {
        alert('Not enough balance!');
    }
};

// Sell crypto
const sellCrypto = async () => {
    const crypto = document.getElementById('crypto-select').value;
    const amount = parseFloat(document.getElementById('trade-amount').value);

    const prices = await fetchCryptoPrices();
    let pricePerUnit = crypto === 'btc' ? prices.bitcoin.usd : prices.ethereum.usd;
    
    let units = amount / pricePerUnit;
    if (portfolio[crypto] >= units) {
        portfolio[crypto] -= units;
        balance += amount;
        addTransaction('sell', crypto, units, amount);
        updateUI();
    } else {
        alert('Not enough holdings!');
    }
};

// Update the UI
const updateUI = () => {
    document.getElementById('balance').innerText = `Virtual Balance: $${balance.toFixed(2)}`;
    document.getElementById('btc-holdings').innerText = `Bitcoin (BTC): ${portfolio.btc.toFixed(6)}`;
    document.getElementById('eth-holdings').innerText = `Ethereum (ETH): ${portfolio.eth.toFixed(6)}`;
};

// Add transaction to history
const addTransaction = (type, crypto, units, amount) => {
    const transaction = `${type.toUpperCase()} ${units.toFixed(6)} ${crypto.toUpperCase()} for $${amount.toFixed(2)}`;
    transactionHistory.push(transaction);
    const historyList = document.getElementById('transaction-history');
    const li = document.createElement('li');
    li.innerText = transaction;
    historyList.appendChild(li);
};

// Event listeners for Buy and Sell buttons
document.getElementById('buy-btn').addEventListener('click', buyCrypto);
document.getElementById('sell-btn').addEventListener('click', sellCrypto);

// Fetch and display initial crypto prices
fetchCryptoPrices();
updateUI();
