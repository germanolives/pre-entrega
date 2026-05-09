import { Button } from "./Button";


export const ScrollControlls = () => {
  const scrollToUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToDown = () => {
    const height = document.documentElement.scrollHeight;
    window.scrollTo({ top: height, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col opacity-50 hover:opacity-100 border-2 border-gray-300 rounded-sm fixed bottom-5 right-5.5 z-50">
        <Button variant="ghost" onClick={scrollToUp}>🔼</Button>
        <Button variant="ghost" onClick={scrollToDown}>🔽</Button>
    </div>
  );
};
