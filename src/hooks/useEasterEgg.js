import { useState, useEffect } from "react";

export function useEasterEgg(onTrigger) {
  const [keyBuffer, setKeyBuffer] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);

  const toggleTerminal = () => setTerminalOpen((prev) => !prev);
  const openTerminal = () => setTerminalOpen(true);
  const closeTerminal = () => setTerminalOpen(false);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      // Avoid intercepting inside text input elements
      if (
        ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      // Check Konami Code
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setTerminalOpen(true);
          if (onTrigger) onTrigger("konami");
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }

      // Check buffer words ('hello', 'sudo', 'matrix', 'terminal')
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        setKeyBuffer((prev) => {
          const next = (prev + e.key.toLowerCase()).slice(-10);
          if (next.endsWith("hello") || next.endsWith("sudo") || next.endsWith("matrix")) {
            setTerminalOpen(true);
            if (onTrigger) onTrigger(next);
          }
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTrigger]);

  return { terminalOpen, toggleTerminal, openTerminal, closeTerminal };
}
