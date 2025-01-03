"use client";

import React, { useState, useCallback } from "react";
import useSpeechToText from "@/app/hooks/useSpeechToText"; // Adjust import path as necessary

interface PronunciationProps {
  sentence: string;
}

const cleanWord = (word: string) => {
  // Remove punctuation and trim spaces
  return word
    .replace(/[.,?!;:]/g, "")
    .trim()
    .toLowerCase();
};

export default function WordPronunciation({ sentence }: PronunciationProps) {
  const words = sentence.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [feedback, setFeedback] = useState<Array<boolean | null>>(
    Array(words.length).fill(null)
  );
  const [transcription, setTranscription] = useState("");

  // Callback function to handle transcription result
  const handleResult = useCallback(
    (transcribedText: string) => {
      const spokenWord = cleanWord(transcribedText);
      const targetWord = words[currentWordIndex].toLowerCase();

      console.log(`Target word: ${transcribedText}`);
      console.log(`Spoken word: ${spokenWord}`);
      console.log(`Target word: ${targetWord}`);

      const isCorrect = spokenWord === targetWord;
      const updatedFeedback = [...feedback];
      updatedFeedback[currentWordIndex] = isCorrect;

      setFeedback(updatedFeedback);

      if (isCorrect) {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }
    },
    [currentWordIndex, feedback, words]
  );

  // Using the custom hook to manage recording
  const { isRecording, startRecording } = useSpeechToText(handleResult);

  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            backgroundColor:
              feedback[index] === null
                ? "transparent"
                : feedback[index]
                ? "green"
                : "red",
            color: feedback[index] !== null ? "white" : "black",
            marginRight: "8px",
            cursor: index === currentWordIndex ? "pointer" : "default",
            transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transitions
          }}
        >
          {word}
          {index === currentWordIndex && feedback[index] === null && (
            <button
              style={{ marginLeft: "8px" }}
              onClick={startRecording}
              disabled={isRecording}
            >
              {isRecording ? "Listening..." : "Pronounce"}
            </button>
          )}
        </span>
      ))}
      <p>Transcription: {transcription}</p>
    </div>
  );
}
