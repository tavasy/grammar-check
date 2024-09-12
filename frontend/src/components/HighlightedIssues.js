import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faBolt,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const HighlightedIssues = ({ isLoading, hasSubmitted, highlightedText }) => {
  return (
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
  );
};

export default HighlightedIssues;
