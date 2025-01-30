'use client';


import Link from "next/link";
import { usePathname } from "next/navigation"; 

const PanelItem = ({ title, icon, link }: { title: string; icon: string, link: string }) => {
  let path = usePathname(); 
  return (
    <Link href={link}>
      <div
      className="d-flex justify-content-between align-items-center px-2 py-4 border-bottom"
      style={path === link ? { cursor: "pointer", color: 'rgb(14, 165, 233)'} : { cursor: "pointer"}}
    >
      <div className="d-flex gap-3 align-items-center">
        <i className={`${icon} h5`}></i>
        <h6>{title}</h6>
      </div>
      <i className="fa-solid fa-chevron-left h6"></i>
    </div>
    </Link>
  );
};

export default PanelItem;
