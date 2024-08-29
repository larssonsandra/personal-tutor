"use clients";

import { useState } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  //const [status, setStatus] = useState("");

  const targetWord = "hello"; // Example target word

  const startRecording = async () => {
    setIsRecording(true);
    //setStatus("Recording...");

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
        //setStatus("Processing...");
        console.log("Processing");

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          console.error("Error in response:", response.statusText);
          return; // Exit if the response is not OK
        }

        const result = await response.json().catch((error) => {
          console.error("Error parsing JSON:", error);
          return { transcription: "" }; // Default to empty transcription on error
        });

        console.log(result);
        setTranscription(result.transcription);

        // if (
        //   result.transcription.toLowerCase().includes(targetWord.toLowerCase())
        // ) {
        //   setStatus("Matched!");
        // } else {
        //   setStatus("Did not match.");
        // }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000); // Stop recording after 3 seconds
    } catch (error) {
      console.error("Error accessing microphone:", error);
      //setStatus("Error accessing microphone.");
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h1>Speech Recognition</h1>
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      {/* <p>Status: {status}</p> */}
      <p>Transcription: {transcription}</p>
    </div>
  );
}
