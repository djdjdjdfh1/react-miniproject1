import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import JsonData from '../context/JsonData';
import '../css/menu.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

  const NextArrow = ({ onClick, style }) => { 
    return (
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={onClick}
        type='button'
        style={{ ...style, position: "absolute", display: "inline-block", color: "darkgray", zIndex: "10", cursor: "pointer", width:"40px", height:"40px", top: "180", right:"0%"}}
      >
      </FontAwesomeIcon>
    );
  };

  const PrevArrow = ({ onClick, style }) => {
    return (
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={onClick}
        type='button'
        style={{ ...style, position: "absolute", display: "inline-block", color: "darkgray", zIndex: "10", cursor: "pointer", width:"40px", height:"40px", top: "180", left:"0%"}}
      >
      </FontAwesomeIcon>
    );
  };

export default function Menu() {
  const {state, action} = useContext(JsonData);
  const {menuList, commentList} = state;
  const {setMenuList} = action;

  const [loading, setLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("부산전체");
  const region = ["부산전체", "강서구", "영도구", "연제구", "중구", "해운대구", "동구", "서구", "남구", "북구", "금정구", "동래구", "사하구", "사상구", "부산진구", "수영구", "기장군"];
    
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 500,
    rows: 2,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  useEffect(()=>{
    if(menuList.length>0) {
        setLoading(true);
    }
  }, [menuList])

  const filteredMenu = selectedMenu === "부산전체" ? menuList : menuList.filter((menu) => (menu.GUGUN_NM === selectedMenu));

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  
    if(value === 'review') {
      const sortedMenuList = menuList.sort((a, b) => {
        const aCommentCnt = commentList.filter(c => c.UC_SEQ === a.UC_SEQ).length;
        const bCommentCnt = commentList.filter(c => c.UC_SEQ === b.UC_SEQ).length;
        return bCommentCnt - aCommentCnt;
      });
      setMenuList(sortedMenuList);
    } else if(value === 'rating') {
      const sortedMenuList = menuList.sort((a, b) => {
        const aRatingList = commentList.filter(c => c.UC_SEQ === a.UC_SEQ).map(c => c.rating);
        const bRatingList = commentList.filter(c => c.UC_SEQ === b.UC_SEQ).map(c => c.rating);
        
        const aRatingAvg = 
        isNaN(aRatingList.reduce((acc, cur) => acc + cur, 0) / aRatingList.length) ? 0 : aRatingList.reduce((acc, cur) => acc + cur, 0) / aRatingList.length;
        
        const bRatingAvg = 
        isNaN(bRatingList.reduce((acc, cur) => acc + cur, 0) / bRatingList.length) ? 0 : bRatingList.reduce((acc, cur) => acc + cur, 0) / bRatingList.length;
        
        return bRatingAvg - aRatingAvg;
      });
      setMenuList(sortedMenuList);
    }
  }

  return (
    <div style={{paddingTop: "80px" }}>
        <div className='menu-header'>
          <h1>전체</h1>
          <select value={selectedValue} onChange={handleSelect}>
            <option value="index">기본순</option> 
            <option value="review">리뷰 많은 순</option>
            <option value="rating">별점 순</option>
          </select>
        </div>
        <div style={{textAlign: "center", paddingBottom: "30px"}}>
          {
            region.map((r, i)=>(
              <button 
              key={i}
              style={{margin: "3px"}} 
              onClick={()=>{setSelectedMenu(r)}}
              >
                {r}
              </button>
            ))
          }
        </div>

        <div className='box-wrap-ver2'>
          <Slider {...settings}>
            {loading && filteredMenu.map((item)=>{
              const commentItems = commentList.filter((comment) => comment.UC_SEQ === item.UC_SEQ);
              const reviewCount = commentItems.length;

              const ratingList = commentItems.map((comment) => comment.rating);
              const averageRating = ratingList.reduce((acc, cur) => acc + cur, 0) / ratingList.length;
              const ratingAvr = isNaN(averageRating) ? '평가중' : averageRating.toFixed(1);
              
              return(
                <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
                  <div
                  className='img-box'
                  > 
                    {/* 미니창 */}
                    <div className='img' 
                    style={{backgroundImage: `url(${item.MAIN_IMG_THUMB})`}}
                    >
                    </div>
                    <div className='description'>
                      {
                        isNaN(averageRating) ? <h2 style={{display:"inline", color: "#9e9e9e"}}>평가중</h2> : 
                          <>
                            <FontAwesomeIcon 
                              icon={faStar} 
                              color={"#ffc107"}
                              style={{fontSize: "2rem", display: "inline-block"}}
                            />
                            <h2 style={{display:"inline"}}>{ratingAvr}</h2>
                          </>
                      }
                      <h2>{item.MAIN_TITLE}</h2>
                      <p>{item.GUGUN_NM}</p>
                      <p>대표 메뉴</p>
                      <p>{item.RPRSNTV_MENU}</p>
                      <p>리뷰: {reviewCount}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </Slider>
        </div>
    </div>
  )
}
