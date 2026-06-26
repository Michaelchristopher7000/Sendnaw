// api/convert.js
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { from, to } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing from or to' });
    }

    // Your free API key (get it from exchangerate-api.com)
    const API_KEY = process.env.EXCHANGE_RATE_API_KEY; // set in Vercel Env
    if (!API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        // ExchangeRate-API endpoint – supports all currencies
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

        // The response structure is slightly different:
        // { base_code: "USD", conversion_rates: { "NGN": 1500, ... } }
        const rate = data.conversion_rates?.[to];
        if (!rate) {
            return res.status(404).json({ error: `Currency ${to} not supported` });
        }

        // Return in the same format as Frankfurter to keep frontend unchanged
        res.status(200).json({
            base: data.base_code,
            rates: { [to]: rate },
            date: data.time_last_update_utc
        });
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
}