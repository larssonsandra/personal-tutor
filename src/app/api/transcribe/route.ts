import { NextResponse } from 'next/server';
import { FormData } from 'formdata-node';
import { fetch } from 'undici'; // Modern replacement for node-fetch

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parsing to handle FormData
  },
};

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    const audioBlob = formData.get('file') as Blob;

    if (!audioBlob) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Convert Blob to Buffer
    const audioBuffer = Buffer.from(await audioBlob.arrayBuffer());

    // Create FormData using formdata-node
    const formDataToSend = new FormData();
    formDataToSend.append('file', new File([audioBuffer], 'audio.webm', { type: 'audio/webm' }));
    formDataToSend.append('model', 'whisper-1');
    formDataToSend.append('language', 'sv');


    console.log('formDataToSend:', formDataToSend);

    // Send request to OpenAI API using undici
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
      body: formDataToSend as any, // Cast to any to handle type mismatches
    });

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
    }

    // Parse response
    const data = await response.json() as { text: string };; // Explicitly type the response
    return NextResponse.json({ transcription: data.text });
  } catch (error) {
    console.error('Error during transcription:', (error as Error).message || error);
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
  }
}