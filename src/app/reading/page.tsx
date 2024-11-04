"use client";

// import SentencePronunciation from "@/app/components/SentencePronunciation";
import ReadingAssistant from "@/app/components/ReadingAssistant";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const intitialText =
    "Sverige är ett land som ligger i norra Europa, på den östra delen av den skandinaviska halvön. Landet har en lång historia och är känt för sina vackra landskap, sina stora skogar och sina många sjöar. Sverige är det största landet i Norden, både till yta och befolkning, och gränsar till Norge i väster och Finland i öster.";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const swedishPrompt = `Svara på följande fråga på svenska: ${input}`; // Explicitly ask for a Swedish response
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: swedishPrompt }),
    });

    const data = await res.json();
    setResponse(data.response || intitialText); // Set response to initial text if no response
  };

  return (
    <main className="flex-grow overflow-auto">
      <section className="flex flex-col w-6/12 mx-auto mt-10 px-10 py-10">
        <h2 className="text-lg font-bold mb-2">Läs och uttala</h2>
        <p className="mb-20">
          Börja med att läsa texten och sedan uttala den. Om du gör fel, försök
          igen. Om du gör en paus, så resulterar betaversionen i ett
          felmeddelande. Ladda om sidan och försök igen. Hovra över texten för
          uttala ordet eller läsa in det igen.
        </p>
        {/* <SentencePronunciation sentence={sentence} />;<hr /> OLD */}

        <form className="flex flex-row mb-10" onSubmit={handleSubmit}>
          <input
            className="p-2 mr-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ange ditt tema..."
          />
          <Button
            type="submit"
            className="border-2 border-gray-300 rounded-md p-2"
          >
            Välj tema
          </Button>
        </form>

        <ReadingAssistant sentence={response || intitialText} />
      </section>
    </main>
  );
}
