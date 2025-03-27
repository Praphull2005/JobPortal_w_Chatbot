import { USER_API_END_POINT } from '@/constants/constant';
import axios from 'axios';

export const GetAIResponse = async (prompt, context) => {
    try {
        const response = await axios.post(
            `${USER_API_END_POINT}/ai/assist`, // Your backend endpoint
            { prompt, context },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Include if you're using cookies for auth
            }
        );

        return response.data.response;
    } catch (error) {
        console.error('Full OpenAI error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw new Error(error.response?.data?.error?.message || 'AI service unavailable');
    }
};