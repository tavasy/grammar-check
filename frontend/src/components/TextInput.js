import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const TextInput = ({
  text,
  handleTextChange,
  handleSampleTextInsert,
  handleSubmit,
}) => {
  return (
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
  );
};

export default TextInput;
