/* ----------------- user ----------------- */

async function getUserById(userId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/getUserById/${userId}`;

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

export { getUserById };

/* ----------------- portfolio ----------------- */
async function createPortfolio(portfolio) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/createPortfolio`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(portfolio),
        });
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

export { createPortfolio };

async function getPortfolioById(portfolioId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/getPortfolioById/${portfolioId}`;

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

export { getPortfolioById };

async function getPortfolioByUserId(userId) {
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/getPortfolioByUserId/${userId}`;

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

export { getPortfolioByUserId };

async function addCoinToPortfolio(body){
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/createPortfolio`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
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

export { addCoinToPortfolio };

async function getCryptoPerPortfolio(portfolioId){
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/getCryptoPerPortfolio/${portfolioId}`;

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

export { getCryptoPerPortfolio };

async function getTotalPerPortfolio(portfolioId){
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/getTotalPerPortfolio/${portfolioId}`;

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

export { getTotalPerPortfolio };

async function getTotalPerPortfolioGroupedByTimestamp(portfolioId){
    const url = `http://${import.meta.env.VITE_BACKEND_URL}/GetTotalPerPortfolioGroupedByTimestamp/${portfolioId}`;

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

export { getTotalPerPortfolioGroupedByTimestamp };

/* ----------------- coin ----------------- */

