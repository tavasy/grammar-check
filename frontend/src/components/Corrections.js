import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faBolt,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Corrections = ({
  isLoading,
  hasSubmitted,
  corrections,
  originalText,
}) => {
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

  return (
    <div className="w-full pt-6 md:p-4 lg:p-6 xl:p-6 2xl:p-6 md:w-1/4 flex flex-col md:h-full overflow-auto border-t md:border-l md:border-t-0 border-gray-600 mb-12 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0">
      <p className="font-bold mb-3 md:mb-4 lg:mb-5 xl:mb-5 2xl:mb-5 text-white text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
        Corrections
      </p>
      <div className="flex-grow overflow-auto rounded-lg">
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
  );
};

export default Corrections;
