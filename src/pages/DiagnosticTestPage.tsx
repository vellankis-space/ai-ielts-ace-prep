import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DiagnosticTestPage = () => {
  const text = "Coming Soon...";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
      {/* Subtle Background Element */}
      <motion.div
        className="absolute inset-0 bg-primary opacity-10 rounded-full"
        initial={{ scale: 0, x: "-50%", y: "-50%" }}
        animate={{
          scale: [1, 1.2, 1],
          x: ["-50%", "-45%", "-50%"],
          y: ["-50%", "-55%", "-50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.h1 
        className="text-6xl font-extrabold tracking-tight sm:text-8xl md:text-9xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80"
      >
        <Link to="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default DiagnosticTestPage;
