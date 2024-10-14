import { FaWhatsapp } from "react-icons/fa";

const handleJoinWhatsApp = () => {
  // WhatsApp group invite link
  window.open("https://chat.whatsapp.com/DslsaOuS0qBHjHRprlPzYg", "_blank");
};

const WhatsAppCard = () => (
  <div className="bg-card px-3 rounded-lg py-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="leading-4">
          <h1 className="text-[14px] font-medium">
            Connect with us on WhatsApp
          </h1>
          <p className="text-[11px] opacity-65">
            Let us know how we can help 👍
          </p>
        </div>
      </div>
      <div
        role="presentation"
        onClick={handleJoinWhatsApp} // Trigger WhatsApp invite link
        className="rounded-lg bg-green-50 flex items-center gap-1 px-[14px] py-[7px] cursor-pointer"
      >
        <FaWhatsapp className="text-green-500" />
        <p className="text-[12px] text-green-500 font-medium">Join</p>
      </div>
    </div>
  </div>
);

export default WhatsAppCard;
