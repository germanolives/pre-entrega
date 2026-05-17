import { Button } from "./Button";
import * as Icons from "../Icons";


export const ScrollControllsWithWhatsapp = () => {
  const scrollToUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToDown = () => {
    const height = document.documentElement.scrollHeight;
    window.scrollTo({ top: height, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col border-2 border-gray-300 rounded-sm fixed bottom-5 right-5.5 z-50">
      <span className="flex items-center mb-2 opacity-70 hover:opacity-100">
        <a
          href="https://wa.me/5493575123456?text=Hello,%20I'm%20comming%20from%20the%20web"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <Icons.WhatsAppIcon className="bg-green-600 w-8 h-8 text-white p-1 rounded-sm" />
        </a>
      </span>
      <Button className= "opacity-50 hover:opacity-100" variant="ghost" onClick={scrollToUp}>
        🔼
      </Button>
      <Button className= "opacity-50 hover:opacity-100" variant="ghost" onClick={scrollToDown}>
        🔽
      </Button>
    </div>
  );
};
