"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ReadingAssistantProps {
  sentence: string;
}

const ReadingAssistant: React.FC<ReadingAssistantProps> = ({ sentence }) => {
  const [recognizedWords, setRecognizedWords] = useState<string[]>([]);
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isRecognitionStarted, setIsRecognitionStarted] = useState(false);

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
    console.log("targetWords", targetWords);
    console.log("recognizedWords", recognizedWords);
    console.log("isRecognitionStarted", isRecognitionStarted);

    const checkMicrophonePermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted.");
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    };

    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition API is not supported in this browser.");
      return; // Exit if not supported
    }
    checkMicrophonePermissions(); // Check for microphone permissions

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "sv-SE";

    // State to hold the full transcript
    let finalTranscript = "";

    recognition.onstart = () => {
      console.log("Recognition started");
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      console.log("event", event);
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + "";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      const combinedTranscript = finalTranscript + " " + interimTranscript;
      console.log("combinedTranscript", combinedTranscript);
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
  }, [isRecognitionStarted]);

  // Function to detect if a word is correct based on position
  const isWordCorrect = (index: number) => {
    if (recognizedWords[index] === undefined) {
      return null; // word has not been spoken yet
    }
    return recognizedWords[index] === targetWords[index];
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

  const stopPronunciation = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stopping = true;
      recognitionRef.current.stop();
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredWordIndex(index);
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredWordIndex(null);
  };

  const handlePronounceClick = (word: string) => {
    playPronunciation(word); // Play pronunciation when "Höra" is clicked
  };

  const handleStartRecognition = () => {
    setIsRecognitionStarted(true);
  };

  const handleEndReadingTutorial = () => {
    setIsRecognitionStarted(false);
  };

  return (
    <div className="border-2 border-gray-200 p-6 rounded-lg">
      {targetWords.map((word, index) => (
        <span
          className="relative"
          key={index}
          onMouseEnter={() => handleMouseEnter(index)} // Show tooltip on hover
          onMouseLeave={handleMouseLeave} // Hide tooltip on mouse leave
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
              className="flex flex-row justify-between"
              style={{
                position: "absolute",
                bottom: "110%",
                left: "0",
                width: "80px",
                height: "30px",
                backgroundColor: "rgba(0,0,0,0.75)",
                color: "white",
                borderRadius: "3px",
                whiteSpace: "nowrap",
                transform: "translateX(-5px)",
                zIndex: 1,
                cursor: "pointer",
                padding: "5px",
              }}
            >
              <span onClick={() => handlePronounceClick(word)}>Höra</span>{" "}
              {/* Play pronunciation */}
              {/* Play pronunciation */}
              <span>Läs</span>
            </div>
          )}
        </span>
      ))}

      {/* Buttons for Start and Play */}
      <div className="mt-4 flex flex-row gap-4">
        <Button onClick={handleStartRecognition}>Starta</Button>
        <Button
          onClick={handleEndReadingTutorial}
          disabled={hoveredWordIndex === null}
        >
          Sluta
        </Button>
      </div>
    </div>
  );
};

export default ReadingAssistant;
