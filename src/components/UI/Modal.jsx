import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// BUILDING A FLEXIBLE MODAL WRAPPER COMPONENT THAT ACCEPTS CHILDREN SO ITS CONTENT IS CUSTOMIZABLE AND REUSABLE - THE MODAL USES A PORTAL TO DISPLAY A DIALOG WITH THE CONTENT PROVIDED AS CHILDREN WHERE IT IS USED

// adding className as an accepted prop on Modal incase we want to use classes on it where it's applied, but providing it with a default value of an empty string so it's not adding undefined if a className isn't used where it's called
export default function Modal({ children, open, className = "", onClose }) {
  //USE A REF TO REFERENCE THE MODAL (DIALOG HTML)
  const dialog = useRef();

  //USE EFFECT ALLOWS US TO AVOID PLACING OPEN DIRECTLY ON DIALOG, ALLOWING US TO KEEP SOME OF DIALOGS BUILT IN FEATURES - LIKE MAKING THE SCREEN BEHIND IT INACCESIBLE AND GREYED OUT - SO WE USE OPEN AS A DEPENDENCY ON USEEFFECT AND THEN THE BUILT IN SHOWMODAL METHOD WHEN OPEN IS TRUE
  useEffect(() => {
    // BEST PRACTICE IS TO CREATE A CONSTANT FOR THIS DIALOG REF
    const modal = dialog.current;

    // OPENS THE MODAL IF OPEN IS TRUE
    if (open) {
      modal.showModal();
    }

    //CLEANUP FUNCTION TO CLOSE THE MODAL WHEN OPEN CHANGES (TO FALSE)
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
