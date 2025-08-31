import { useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = '814OlaCAE0FStAEQReVWhzPAPnysnPIF';
    const fetchEvents = useCallback(async ({ keyword, city, id, size = 10 }) => {
        setLoading(true);
        setError('');

        const params = id
            ? { apikey: API_KEY }
            : { apikey: API_KEY, keyword, city, size };

        try {
            const response = await axios.get(url, { params });
            const result = id ? response.data : response.data._embedded?.events || [];
            setData(result);

        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [url]);


    return { data, loading, error, fetchEvents };
}