import axios from 'axios';

export async function queryGrok(input: string, apiKey?: string): Promise<string> {
    const key = apiKey || process.env.GROK_API_KEY || ''; 
    if (!key) {return 'API key missing';}
    try {
        const response = await axios.post(
            'https://api.x.ai/v1/chat/completions',
            { model: 'grok-2', messages: [{ role: 'user', content: input }] },
            { headers: { Authorization: `Bearer ${key}` } }
        );
        return response.data.choices[0].message.content;
    } catch (error: any) {
        console.error(error);
        return `Error: ${error.message}`;
    }
}
