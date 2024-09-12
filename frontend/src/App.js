import React, { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import HighlightedIssues from './components/HighlightedIssues';
import Corrections from './components/Corrections';

function App() {
  const [text, setText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [corrections, setCorrections] = useState([]);
  const [highlightedText, setHighlightedText] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sampleText = `Hello,\nMy name is Susan. I'm forteen and I life in Germany. My hobbys are to go discos, sometimes I listen music on the radio. I don't have any brothers or sisters. I take busses to scool. My birthday is on Friday. I hope I will have a new guitar.\nI'm looking forward to get a e-mail from you.\n\nYours,\nSusan`;

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSampleTextInsert = () => {
    setText(sampleText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSubmitted(true);
    setOriginalText(text);

    const response = await fetch(
      'https://grammar-check-server.onrender.com/grammar-check',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }
    );

    const result = await response.json();
    setCorrections(result.matches || []);

    if (result.matches.length === 0) {
      setHighlightedText('The text is correct!');
    } else {
      setHighlightedText(renderHighlightedText(text, result.matches || []));
    }

    setIsLoading(false);
  };

  const renderHighlightedText = (text, corrections) => {
    if (corrections.length === 0) return text;

    let processedText = [];
    let lastIndex = 0;

    corrections.forEach((match, index) => {
      const start = match.offset;
      const end = start + match.length;

      if (start > lastIndex) {
        processedText.push(text.slice(lastIndex, start));
      }

      processedText.push(
        <span
          key={index}
          style={{ textDecoration: 'underline', color: 'rgba(67, 56, 202)' }}
        >
          {text.slice(start, end)}
        </span>
      );

      lastIndex = end;
    });

    if (lastIndex < text.length) {
      processedText.push(text.slice(lastIndex));
    }

    return processedText;
  };

  return (
    <div
      className="App bg-indigo-900 bg-cover bg-center md:h-screen lg:h-screen xl:h-screen pt-12 pr-6 pl-6 pb-6 md:p-0 lg:p-0 xl:p-0 2xl:p-0"
      style={{
        backgroundImage: `url('/background.png')`,
      }}
    >
      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col h-full md:p-10 lg:p-14 xl:p-16 2xl:p-16">
          <Header />
          <TextInput
            text={text}
            handleTextChange={handleTextChange}
            handleSampleTextInsert={handleSampleTextInsert}
            handleSubmit={handleSubmit}
          />
        </div>
        <HighlightedIssues
          isLoading={isLoading}
          hasSubmitted={hasSubmitted}
          highlightedText={highlightedText}
        />
        <Corrections
          isLoading={isLoading}
          hasSubmitted={hasSubmitted}
          corrections={corrections}
          originalText={originalText}
        />
      </div>
    </div>
  );
}

export default App;
