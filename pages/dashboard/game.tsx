import { useState } from "react";
import ServicesPageLayout from "@/layouts/servicespages";
import { motion } from "framer-motion"; // For animations
import useSound from "use-sound"; // For sounds

// Import the sound files (place these in your public folder)
const successSound = "/sounds/success.mp3";
const failSound = "/sounds/fail.mp3";
const resetSound = "/sounds/reset.mp3";

const GamePage = () => {
  const [guess, setGuess] = useState<number | "">(""); // To store user's guess
  const [targetNumber, setTargetNumber] = useState<number>(
    Math.floor(Math.random() * 10) + 1 // Random number between 1 and 10
  );
  const [message, setMessage] = useState<string>(""); // To store feedback message
  const [attempts, setAttempts] = useState<number>(0); // Track number of attempts

  // Sounds
  const [playSuccess] = useSound(successSound);
  const [playFail] = useSound(failSound);
  const [playReset] = useSound(resetSound);

  // Handle guess submission
  const handleGuess = () => {
    if (guess === "") {
      setMessage("Please enter a number.");
      return;
    }

    setAttempts(attempts + 1);

    if (guess < targetNumber) {
      playFail(); // Play fail sound
      setMessage("Too low! Try again.");
    } else if (guess > targetNumber) {
      playFail(); // Play fail sound
      setMessage("Too high! Try again.");
    } else {
      playSuccess(); // Play success sound
      setMessage(
        `🎉 Correct! You guessed the number in ${attempts + 1} attempts.`
      );
    }
  };

  // Handle reset game
  const resetGame = () => {
    playReset(); // Play reset sound
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full items-center justify-center gap-6">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 z-[-1]" />

        {/* Game Title with Animation */}
        <motion.h1
          className="text-4xl font-extrabold  text-center mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          🎮 Guess the Number
        </motion.h1>

        {/* Display Card for the game */}
        <motion.div
          className="w-full bg-card shadow-lg rounded-3xl p-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg  mb-4 text-center">
            Guess a number between{" "}
            <span className="font-bold text-blue-500">1</span> and{" "}
            <span className="font-bold text-blue-500">10</span>:
          </p>

          {/* Input without arrows */}
          <motion.input
            type="number"
            min="1"
            max="10"
            value={guess}
            onChange={(e) => setGuess(Number(e.target.value))}
            className="border-2 border-blue-500 p-3 rounded-lg w-full text-center text-xl mb-4 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 appearance-none"
            style={{ MozAppearance: "textfield" }} // Hide arrows on Firefox
            whileFocus={{ scale: 1.05 }}
          />
          {/* <style jsx>{`
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          `}</style> */}

          {/* Submit Button with Hover Effect */}
          <motion.button
            onClick={handleGuess}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg mt-2 w-full font-semibold text-lg tracking-wide shadow-lg hover:bg-blue-600 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Submit Guess
          </motion.button>

          {/* Reset Button with Hover Effect */}
          <motion.button
            onClick={resetGame}
            className="bg-red-500 text-white py-3 px-6 rounded-lg mt-4 w-full font-semibold text-lg tracking-wide shadow-lg hover:bg-red-600 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Reset Game
          </motion.button>

          {/* Display Message with Animation */}
          {message && (
            <motion.p
              className="mt-6 text-xl text-center text-gray-800 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.p>
          )}
        </motion.div>

        {/* Attempts Count with a Fun Look */}
        <p className=" text-lg font-semibold">
          Attempts: <span className="text-yellow-400">{attempts}</span>
        </p>
      </section>
    </ServicesPageLayout>
  );
};

export default GamePage;
