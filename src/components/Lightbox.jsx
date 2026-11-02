import { useEffect, useRef } from "react";
import { asset } from "../lib";
import { ArrowUpRight } from "./Icons";

// Native <dialog>: gives focus trapping, Escape and an inert background for free.
export default function Lightbox({ item, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dlg = ref.current;
    const trigger = document.activeElement;
    dlg.showModal();
    document.body.classList.add("lock");
    return () => {
      document.body.classList.remove("lock");
      dlg.close(); // release the modal's inert state so focus can return to the trigger
      if (trigger instanceof HTMLElement) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item.caption || item.alt}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close image viewer">
        <span aria-hidden="true">Close ✕</span>
      </button>
      <figure className={"lightbox__fig" + (item.diagram ? " lightbox__fig--diagram" : "")}>
        <img src={asset(item.src)} alt={item.alt} />
        {(item.caption || item.pdf) && (
          <figcaption>
            <span>{item.caption}</span>
            {item.pdf && (
              <a href={asset(item.pdf)} target="_blank" rel="noreferrer">
                Open original PDF <ArrowUpRight />
              </a>
            )}
          </figcaption>
        )}
      </figure>
    </dialog>
  );
}
