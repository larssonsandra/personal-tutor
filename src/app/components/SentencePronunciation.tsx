"use client";

import React, { useState, useCallback } from "react";
import useSpeechToText from "@/app/hooks/useSpeechToText"; // Adjust import path as necessary

interface SentencePronunciationProps {
  sentence: string;
}

const cleanWord = (word: string) => {
  // Remove punctuation and trim spaces
  return word
    .replace(/[.,?!;:]/g, "")
    .trim()
    .toLowerCase();
};

export default function SentencePronunciation({
  sentence,
}: SentencePronunciationProps) {
  const words = sentence.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [feedback, setFeedback] = useState<Array<boolean | null>>(
    Array(words.length).fill(null)
  );
  const [transcription, setTranscription] = useState("");

  // Callback function to handle transcription result
  const handleResult = useCallback(
    (spokenSentence: string) => {
      const transcribedSentence = cleanWord(spokenSentence);
      const targetSentence = cleanWord(sentence);
      //const targetWord = words[currentWordIndex].toLowerCase();

      console.log(`Spoken sentence: ${spokenSentence}`);
      console.log(`Transcribed sentence: ${transcribedSentence}`);
      console.log(`Target sentence: ${targetSentence}`);

      //   const isCorrect = transcribedSentence === targetSentence;
      //   const updatedFeedback = [...feedback];
      //   updatedFeedback[currentWordIndex] = isCorrect;

      const updatedFeedback = transcribedSentence
        .split(" ")
        .map((word, index) => {
          return word === targetSentence.split(" ")[index];
        });

      setFeedback(updatedFeedback);
      console.log("feedback", feedback);
    },
    [feedback, sentence]
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
