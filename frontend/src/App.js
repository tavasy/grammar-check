import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faFileLines,
  faBolt,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function App() {
  const [text, setText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [corrections, setCorrections] = useState([]);
  const [highlightedText, setHighlightedText] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sampleText = `Hello,\nMy name is Susan. I'm forteen and I life in Germany. My hobbys are go to discos, sometimes I hear music in the radio. In the summer I go bathing in a lake. I haven't any brothers or sisters. We take busses to scool. I visit year 9 at my school. My birthday is on Friday. I hope I will become a new guitar.\nI'm looking forward to get a e-mail from you.\n\nYours,\nSusan`;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const gradientAnimation = {
    backgroundPosition: ['0% 50%', '100% 50%'],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
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
          <div className="mb-8 md:mb-10 lg:mb-12 xl:mb-12 2xl:mb-12">
            <motion.p
              className="font-extrabold mb-4 md:mb-5 lg:mb-6 xl:mb-6 2xl:mb-6 text-white text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl"
              style={{
                background:
                  'linear-gradient(270deg, white, #D5ACFF, white, #EF97FF, white, #C9A1FF, white, #EF97FF, white)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={gradientAnimation}
            >
              Grammar Correction Tool
            </motion.p>
          </div>

          <div className="mb-8 md:mb-10 lg:mb-12 xl:mb-12 2xl:mb-12 flex-grow">
            <p className="font-bold mb-2 md:mb-3 lg:mb-4 xl:mb-4 2xl:mb-4 text-white text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
              Your text
            </p>
            <div className="relative">
              <textarea
                spellCheck={false}
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here"
                rows="12"
                cols="50"
                className="w-full shadow-lg rounded-lg p-4 mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3 h-full text-sm md:text-base lg:text-base xl:text-base 2xl-text-base"
              />
              {text === '' && (
                <button
                  onClick={handleSampleTextInsert}
                  className="absolute bottom-6 left-4 mb-2 shadow-lg font-medium text-white px-5 py-2 bg-indigo-400 rounded-full text-sm md:text-base lg:text-base xl:text-base 2xl-text-base"
                >
                  <FontAwesomeIcon icon={faFileLines} className="mr-2" />
                  Insert Sample Text
                </button>
              )}
            </div>
            <motion.button
              onClick={handleSubmit}
              type="submit"
              whileHover={{ scale: text ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              className="w-full shadow-lg font-medium text-white px-5 py-3 bg-indigo-500 rounded-full text-sm md:text-base lg:text-base xl:text-base 2xl:text-base cursor-pointer"
              disabled={!text}
              style={{
                cursor: !text ? 'not-allowed' : 'pointer',
              }}
            >
              Check Grammar
            </motion.button>
          </div>
        </div>

        <div className="w-full pt-6 md:p-4 lg:p-6 xl:p-6 2xl:p-6 md:w-1/4 flex flex-col overflow-auto mb-8 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0 border-t md:border-l md:border-t-0 border-gray-600">
          <p className="font-bold mb-3 md:mb-4 lg:mb-5 xl:mb-5 2xl:mb-5 text-white text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
            Highlighted issues
          </p>
          <div className="flex-grow overflow-auto">
            {isLoading ? (
              <div>
                <div className="shadow-xs rounded-lg p-4 bg-customPurple border border-customLightPurple">
                  <p className="text-white text-sm md:text-base lg:text-base xl:text-base 2xl-text-base">
                    <FontAwesomeIcon icon={faSpinner} className="mr-2" />
                    Checking text...
                  </p>
                </div>
              </div>
            ) : !hasSubmitted ? (
              <div className="shadow-xs rounded-lg p-4 bg-customPurple border border-customLightPurple">
                <p className="text-white text-sm md:text-base lg:text-base xl:text-base 2xl-text-base">
                  <FontAwesomeIcon icon={faBolt} className="mr-2" />
                  Add text to check
                </p>
              </div>
            ) : highlightedText === 'The text is correct!' ? (
              <div className="shadow-xs rounded-lg p-4 bg-customPurple border border-customLightPurple">
                <p className="text-white text-sm md:text-base lg:text-base xl:text-base 2xl-text-base">
                  <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
                  {highlightedText}
                </p>
              </div>
            ) : (
              <motion.div
                className="shadow-lg rounded-lg p-4 bg-white text-sm md:text-base lg:text-base xl:text-base 2xl:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeIn' }}
              >
                {highlightedText}
              </motion.div>
            )}
          </div>
        </div>

        <div className="w-full pt-6 md:p-4 lg:p-6 xl:p-6 2xl:p-6 md:w-1/4 flex flex-col md:h-full overflow-auto border-t md:border-l md:border-t-0 border-gray-600 mb-12 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0">
          <p className="font-bold mb-3 md:mb-4 lg:mb-5 xl:mb-5 2xl:mb-5 text-white text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
            Corrections
          </p>
          <div className="flex-grow overflow-auto shadow-lg rounded-lg">
            {isLoading ? (
              <div>
                <div className="shadow-xs rounded-lg p-4 bg-customPurple border border-customLightPurple">
                  <p className="text-white text-sm md:text-base lg:text-base xl:text-base 2xl-text-base">
                    <FontAwesomeIcon icon={faSpinner} className="mr-2" />
                    Checking text...
                  </p>
                </div>
              </div>
            ) : !hasSubmitted ? (
              <div>
                <div className="shadow-xs rounded-lg p-4 bg-customPurple border border-customLightPurple">
                  <p className="text-white text-sm md:text-base lg:text-base xl:text-base 2xl-text-base">
                    <FontAwesomeIcon icon={faBolt} className="mr-2" />
                    Time to check your text
                  </p>
                </div>
              </div>
            ) : corrections.length > 0 ? (
              <motion.div
                className="flex flex-col space-y-4 h-64 md:h-80 lg:h-auto xl:h-auto 2xl:h-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {corrections.map((match, index) => (
                  <motion.div
                    key={index}
                    className="border-b bg-white p-4 shadow-sm rounded-lg text-sm md:text-base lg:text-base xl:text-base 2xl-text-base"
                    variants={childVariants}
                  >
                    <p className="font-bold text-indigo-600">
                      {originalText.substring(
                        match.offset,
                        match.offset + match.length
                      )}
                    </p>
                    <p>{match.message}</p>
                    <p className="text-green-600">
                      {match.replacements
                        .slice(0, 4)
                        .map((r) => r.value)
                        .join(', ')}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="shadow-xs rounded-lg p-4 bg-customPurple border border-customLightPurple">
                <p className="text-white text-sm md:text-base lg:text-base xl:text-base 2xl-text-base">
                  <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
                  No corrections found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
