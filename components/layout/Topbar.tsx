"use client"
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'
import { faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "../../styles/styles.css"

export default function Topbar() {

      const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='nav d-flex pt-3 bgmain justify-content-between'>
        <div className="logo">
            <h5 className='ps-5'>Wizarding Registry</h5>
        </div>
        <div className="search">
          <input
            type="text"
            className="input"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="button">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="searchicon"
            />
          </button>
        </div>
        <div className="icons d-flex me-3 pb-3 ">
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faGear} />
        <FontAwesomeIcon icon={faUser} />

      </div>
    </div>
  )
}
