import { useState } from "react";

export const RadioInput = ({ children, id, className, ...props }) => {
  return (
    <>
      <input {...props} id={id} className={`appearance-none ${className}`} />
      <label htmlFor={id} aria-hidden>
        {children}
      </label>
    </>
  );
};
