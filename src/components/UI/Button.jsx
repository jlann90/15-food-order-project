export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  // ACCOUNTS FOR ANY ADDITIONAL CLASSES BEING SET ON WHERE THE BUTTON COMPONENT IS CALLED AND ADDS THEM TO THE CSSCLASSES WE SET UP ABOVE
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
