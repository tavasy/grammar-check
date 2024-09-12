import { motion } from 'framer-motion';

const Header = () => {
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
  );
};

export default Header;
