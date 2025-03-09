async function getTransaction(userId, accountId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/transactions/${userId}/${accountId}`;
        
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        throw error;
    }
}

export { getTransaction };

async function getBankById(bankId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/bank/${bankId}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error('Error fetching bank:', error);
        throw error;
    }
}

export { getBankById };

async function getAccountsById(userId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/accounts/${userId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
}

export { getAccountsById };

async function getTransactions(userId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/transactions/${userId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

export { getTransactions };

async function getUserTransactionsByMonths(userId, months) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/transactions/${userId}/months/${months}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

export { getUserTransactionsByMonths };

async function getCoinInfo(ticker) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/coinInfo/${ticker}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coin:', error);
        throw error;
    }
}

export { getCoinInfo };

async function getUserCoins(userId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/userCoins/${userId}`;

    console.log("url", url);


    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coins:', error);
        throw error;
    }
}

export { getUserCoins };

async function GetAmountPerCategory(userId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/userAmountPerCrypto/${userId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

export { GetAmountPerCategory };


async function getCoins() {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/coins`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coins:', error);
        throw error;
    }
}

export { getCoins };

async function AddCrypto(userId, crypto){
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/addCrypto/${userId}`;

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(crypto)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding crypto:', error);
        throw error;
    }
}

export { AddCrypto };

async function GetUserPortfolioHistoricalValue(userId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/userPortfolioHistoricalValue/${userId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching historical value:', error);
        throw error;
    }
}

export { GetUserPortfolioHistoricalValue };