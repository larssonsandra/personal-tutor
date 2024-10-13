// useSpeechToText.ts
import { useState } from "react";

const useSpeechToText = (onResult: (transcription: string) => void) => {
  
 const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {

    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setIsRecording(false);

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        try {
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const result = await response.json();
          console.log("result", result.transcription)
          onResult(result.transcription);
        } catch (error) {
          console.error("Transcription error:", error);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 4000); // Stop recording after 3 seconds
    } catch (error) {
      console.error("Microphone access error:", error);
      setIsRecording(false);
    }
  };
  return { isRecording, startRecording };
};

export default useSpeechToText;