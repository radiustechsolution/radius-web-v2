import { FaWhatsapp } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";

const handleJoinWhatsApp = () => {
  // WhatsApp group invite link
  window.open("https://chat.whatsapp.com/DslsaOuS0qBHjHRprlPzYg", "_blank");
};

const GameCard = () => (
  <div className="bg-card px-3 rounded-lg py-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="leading-4">
          <h1 className="text-[14px] font-medium">Play Guess Game</h1>
          <p className="text-[11px] opacity-65">Get busy with Radius Game 👍</p>
        </div>
      </div>
      <div
        role="presentation"
        onClick={handleJoinWhatsApp} // Trigger WhatsApp invite link
        className="rounded-lg bg-red-50 flex items-center gap-1 px-[14px] py-[7px] cursor-pointer"
      >
        <FaGamepad className="text-red-500" />
        <p className="text-[12px] text-red-500 font-medium">Play</p>
      </div>
    </div>
  </div>
);

export default GameCard;
