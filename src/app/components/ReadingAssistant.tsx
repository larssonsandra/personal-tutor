"use client";

import React, { useState, useEffect, useRef } from "react";

interface ReadingAssistantProps {
  sentence: string;
}

const ReadingAssistant: React.FC<ReadingAssistantProps> = ({ sentence }) => {
  const [recognizedWords, setRecognizedWords] = useState<string[]>([]);
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Function to normalize text by removing punctuation and converting to lowercase
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[.,!?;:()"'«»—–-]/g, "") // Remove common punctuation marks
      .split(/\s+/) // Split by any whitespace
      .filter(Boolean); // Remove empty strings
  };

  const targetWords = normalizeText(sentence);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>("");

  useEffect(() => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "sv-SE";

    // State to hold the full transcript
    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      const combinedTranscript = finalTranscript + " " + interimTranscript;
      const words = normalizeText(combinedTranscript);
      setRecognizedWords(words);
    };

    recognition.onend = () => {
      //Restart the recognition if it stops
      recognition.start();
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error detected: ", event.error);
      //Handle errors here, possibly restart the recognition
    };

    recognition.start();

    return () => {
      recognition.onend = null;
      recognition.onerror = null;
      recognition.stop();
    };
  }, []);

  // Function to detect if a word is correct based on position
  const isWordCorrect = (index: number) => {
    if (recognizedWords[index] === undefined) {
      return null; // word has not been spoken yet
    }
    return recognizedWords[index] === targetWords[index];
  };

  // Function to handle mouse enter on a word
  const handleMouseEnter = (index: number) => {
    if (isWordCorrect(index) === false) {
      setHoveredWordIndex(index);
      setTooltipVisible(true);
      playPronunciation(targetWords[index]);
    }
  };

  // Function to handle mouse leave on a word
  const handleMouseLeave = () => {
    setHoveredWordIndex(null);
    setTooltipVisible(false);
  };

  // Function to play pronunciation of a word
  const playPronunciation = (word: string) => {
    // Stop speech synthesis if it's already speaking
    if (recognitionRef.current) {
      recognitionRef.current.stopping = true;
      recognitionRef.current.stop();
    }

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "sv-SE";
    utterance.rate = 0.9;

    utterance.onend = () => {
      // Restart the recognition
      if (recognitionRef.current) {
        recognitionRef.current.stopping = false;
        recognitionRef.current.start();
      }
    };
    // Play the pronunciation
    window.speechSynthesis.speak(utterance);
  };

  const handleWordClick = (index: number) => {
    if (isWordCorrect(index) === false) {
      setHoveredWordIndex(index);
      setTooltipVisible(true);
      playPronunciation(targetWords[index]);

      setTimeout(() => {
        setTooltipVisible(false);
      }, 1000);
    }
  };

  return (
    <div>
      {targetWords.map((word, index) => (
        <span
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          style={{
            backgroundColor:
              recognizedWords[index]?.toLowerCase() === word.toLowerCase()
                ? "green"
                : recognizedWords[index]
                ? "red"
                : "transparent",
          }}
        >
          {word} {/*ToolTip*/}
          {tooltipVisible && hoveredWordIndex == index && (
            <div
              style={{
                position: "absolute",
                bottom: "100%",
                left: "0",
                backgroundColor: "rgba(0,0,0,0.75)",
                color: "white",
                borderRadius: "3px",
                whiteSpace: "nowrap",
                transform: "translateX(-5px)",
                zIndex: 1,
              }}
            >
              Höra läst
            </div>
          )}
        </span>
      ))}
    </div>
  );
};

export default ReadingAssistant;
