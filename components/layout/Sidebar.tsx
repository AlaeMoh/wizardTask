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
  faStar,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";


export default function Sidebar() {
  return (
    <div className='sidecontainer'>
        <div className="firstsec pt-2">
            <div className="sparkle d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </div>
            <h6 className='head pt-2 gold'>Registry</h6>
            <p className='grey pt-2'>Ministry of Alchemical Records</p>
        </div>
<div className="secondsec">
  {[
    { icon: faTableCells, label: "Dashboard",  href: "/dashboard" },
    { icon: faUserGroup,  label: "Wizards",    href: "/wizards"   },
    { icon: faFlask,      label: "Elixirs",    href: "/elixirs"   },
    { icon: faBookOpen,   label: "Archives",   href: "/archives"  },
  ].map(({ icon, label, href }) => (
    <Link href={href} key={label} className="text-decoration-none">
      <button className="sidebutton grey w-100 d-flex align-items-center gap-2 px-1 py-2 border-0">
        <span style={{ width: "20px" }} className="d-flex justify-content-center">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span>{label}</span>
      </button>
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
