import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// BUILDING A FLEXIBLE MODAL WRAPPER COMPONENT THAT ACCEPTS CHILDREN SO ITS CONTENT IS CUSTOMIZABLE AND REUSABLE - THE MODAL USES A PORTAL TO DISPLAY A DIALOG WITH THE CONTENT PROVIDED AS CHILDREN WHERE IT IS USED

// adding className as an accepted prop on Modal incase we want to use classes on it where it's applied, but providing it with a default value of an empty string so it's not adding undefined if a className isn't used where it's called
export default function Modal({ children, open, className = "" }) {
  //USE A REF TO REFERENCE THE MODAL (DIALOG HTML)
  const dialog = useRef();

  //USE EFFECT ALLOWS US TO AVOID PLACING OPEN DIRECTLY ON DIALOG, ALLOWING US TO KEEP SOME OF DIALOGS BUILT IN FEATURES - LIKE MAKING THE SCREEN BEHIND IT INACCESIBLE AND GREYED OUT - SO WE USE OPEN AS A DEPENDENCY ON USEEFFECT AND THEN THE BUILT IN SHOWMODAL METHOD WHEN OPEN IS TRUE
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
