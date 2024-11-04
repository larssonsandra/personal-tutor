// app/api/chatgpt/route.js
import axios from 'axios';

export async function POST(req: any) {
  const { message } = await req.json();

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo', // Use the cheapest model
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`, // Use environment variable for API key
        'Content-Type': 'application/json',
      },
    });

    return new Response(JSON.stringify({ response: response.data.choices[0].message.content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return new Response(JSON.stringify({ error: 'Error communicating with OpenAI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}