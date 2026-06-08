import React from 'react'
import {
  faBookOpen,
  faFlask,
  faTableCells,
  faUserGroup,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className='sidecontainer'>
        <div className="firstsec pt-2">
            <div className="sparkle d-flex justify-content-center align-items-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 10L20.9375 6.5625L17.5 5L20.9375 3.4375L22.5 0L24.0625 3.4375L27.5 5L24.0625 6.5625L22.5 10ZM22.5 27.5L20.9375 24.0625L17.5 22.5L20.9375 20.9375L22.5 17.5L24.0625 20.9375L27.5 22.5L24.0625 24.0625L22.5 27.5ZM10 23.75L6.875 16.875L0 13.75L6.875 10.625L10 3.75L13.125 10.625L20 13.75L13.125 16.875L10 23.75Z" fill="#FFB95F"/>
            </svg>
            </div>
            <h6 className='head pt-2 gold'>Registry</h6>
            <p className='grey pt-2 ministry'>Ministry of Alchemical Records</p>
        </div>
<div className="secondsec">
  {[
    { icon: faTableCells, label: "Dashboard", href: "/dashboard" },
    { icon: faUserGroup, label: "Wizards", href: "/wizards" },
    { icon: faFlask, label: "Elixirs", href: "/elixirs" },
    { icon: faBookOpen, label: "Archives", href: "/archives" },
  ].map(({ icon, label, href }) => (
    <Link
      href={href}
      key={label}
      className="sidebar-link"
    >
      <div   className={`sidebar-item ${
    pathname === href ? "active-sidebar-item" : ""
  }`}>
        <span className="sidebar-icon">
          <FontAwesomeIcon icon={icon} />
        </span>

        <span className="sidebar-label">
          {label}
        </span>
      </div>
    </Link>
  ))}
</div>

 <div className="sidebar-bottom pt-5">

        <button className="new-elixir-btn">
          <FontAwesomeIcon icon={faPlus} />
          <span>New Elixir</span>
        </button>

        <div className="bottom-links">

          <button className="bottom-btn">
            <FontAwesomeIcon icon={faGear} />
            <span>Settings</span>
          </button>

          <button className="bottom-btn">
            <FontAwesomeIcon icon={faCircleQuestion} />
            <span>Support</span>
          </button>

        </div>
      </div>
    </div>
  )
}
