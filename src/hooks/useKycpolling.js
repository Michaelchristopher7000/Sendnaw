import { useState, useEffect, useCallback } from 'react';

export const useKycPolling = (initialTier, token) => {
    const [kycTier, setKycTier] = useState(initialTier);
    const [notification, setNotification] = useState(null);

    const fetchUser = useCallback(async () => {
        if (!token) return;
        try {
            const res = await fetch('/backend/api/user/get_user.php', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.status === 'success') {
                const newTier = data.data.kyc_tier;
                if (newTier !== kycTier && kycTier !== null) {
                    setNotification(`KYC upgraded to Tier ${newTier}`);
                }
                setKycTier(newTier);
            }
        } catch (err) {
            console.error('Polling error:', err);
        }
    }, [token, kycTier]);

    useEffect(() => {
        if (!token) return;
        fetchUser();
        const interval = setInterval(fetchUser, 15000);
        return () => clearInterval(interval);
    }, [token, fetchUser]);

    const manualRefresh = () => {
        fetchUser();
        setNotification('KYC status refreshed');
    };

    return { kycTier, notification, manualRefresh };
};