import React,{ useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import '../css/reset.css'
import '../css/navlink.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";


export default function NavBar() { 

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // 스크롤 이벤트 핸들러 등록
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 0;
      setIsScrolled(isScrolled);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
    className='nav-box'
    style={{ backgroundColor: isScrolled || isHovered ? '#F9E1CF' : 'white'}}
    onMouseEnter={()=> setIsHovered(true)}
    onMouseLeave={()=> setIsHovered(false)}
    >   
        <div className='nav-home'>
          <FontAwesomeIcon icon={faUtensils} color='black' size='2x'/>
          <Link to={`/`}><h1>ENJOY FOOD</h1></Link>
        </div>
        <div className='nav-menu'>
          <Link to={`/today`}><span>TODAY'S MENU</span></Link>
          <Link to={`/menu`}><span>MENULIST</span></Link>
          <Link to={`/like`}><span>LIKE</span></Link>
        </div>
    </div>
  )
}
