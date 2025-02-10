"use client";
import { useState } from "react";
import "./alert.css";

const AlertComponent = ({ text, backc }: { text: string; backc: 'danger' | 'warning' | 'success' }) => {
  const [open, setOpen] = useState<boolean>(true);
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <div
      className={`alert-container-in-component ${backc} ${open ? "active" : "deactive"}`}
    >
      {" "}
      {text}{" "}
    </div>
  );
};

export default AlertComponent;
