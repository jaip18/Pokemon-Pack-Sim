import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css"; // Import your styles

function NavBar() {
    const [activeIndex, setActiveIndex] = useState(() => {
            return parseInt(localStorage.getItem('activeIndex')) || 0
        }
    )

    const location = useLocation();
    const currentPath = location.pathname;

    const routeMap = ["/", "/packs", "/mylist", "/pokedex"];
    const pageIndex = routeMap.indexOf(currentPath);

  // saves indicator index 
    localStorage.setItem('activeIndex', activeIndex)

  // Define sidebar items
    const navItems = [
        { name: "Home", icon: "fa-solid fa-house", path: "/" },
        { name: "Packs", icon: "fa-solid fa-box", path: "/packs" },
        { name: "My List", icon: "fa-solid fa-list", path: "/mylist" },
        { name: "Pokedex", icon: "fa-solid fa-dragon", path: "/pokedex" },
    ];


    return (
        <div className="navigation">
        <ul>
            {navItems.map((item, index) => (
            <li
                key={index}
                className={`list ${index === activeIndex ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(pageIndex)}
            >
                <Link to={item.path} className="nav-link">
                <span className="icon">
                    <i className={item.icon}></i>
                </span>
                
                </Link>
            </li>
            ))}

            <div
            className="indicator"
            style={{ transform: `translateY(calc(100px * ${activeIndex}))` }}
            ></div>
        </ul>
        </div>
    );
}

export default NavBar;
