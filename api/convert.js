// api/convert.js
export default async function handler(req, res) {
    // 1. Set CORS headers for the response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Only allow GET requests.
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 4. Get query parameters
    const { from, to } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from or to parameter' });
    }

    try {
        // 5. Forward the request to Frankfurter API
        const response = await fetch(
            `https://api.frankfurter.app/latest?from=${from}&to=${to}`
        );

        if (!response.ok) {
            throw new Error(`Frankfurter API error: ${response.status}`);
        }

        const data = await response.json();

        // 6. Return the data with CORS headers already set
        res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({
            error: 'Failed to fetch exchange rate',
            details: error.message,
        });
    }
}