import SentencePronunciation from "@/app/components/SentencePronunciation";
import ReadingAssistant from "@/app/components/ReadingAssistant";

export default function Home() {
  const sentence = "Stina ska läsa och hon är bäst i det";
  const anotherSentence =
    "Sverige är ett land som ligger i norra Europa, på den östra delen av den skandinaviska halvön. Landet har en lång historia och är känt för sina vackra landskap, sina stora skogar och sina många sjöar. Sverige är det största landet i Norden, både till yta och befolkning, och gränsar till Norge i väster och Finland i öster.";

  return (
    <div>
      <h1>Läs och uttala</h1>
      <SentencePronunciation sentence={sentence} />;<hr />
      <ReadingAssistant sentence={anotherSentence} />;
    </div>
  );
}
