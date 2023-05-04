import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import JsonData from '../context/JsonData';
import '../css/menu.css'
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Menu() {
  const {state, action, func} = useContext(JsonData);
  const {menuList, commentList, num, likelist} = state;
  const {setMenuList, setNum, setCommentList, setLikelist} = action;
  const {getMenu} = func;

  const [text, setText] = useState("");
  const [star, setStar] = useState(null);
  const [loading, setLoading] = useState(false);

  // cid라는 속성이 필요할까
  const addComment = (c) => {
    const newComment = {
      cid : num,
      UC_SEQ : c,
      text : text,
      rating : star
    }
    setNum(num +1);
    const newList = commentList.concat(newComment);
    setCommentList(newList);
  }
  
  useEffect(()=>{getMenu()}, []);
  useEffect(()=>{
    if(menuList.length>0) {
        setLoading(true);
    }
  }, [menuList])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(150);
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = menuList.slice(0, indexOfLastItem);
  
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  }

  useEffect(()=>{
    if (indexOfLastItem >= menuList.length) {
      document.getElementById("load-button").style.display = "none";
    }
  }, [indexOfLastItem, menuList.length])

  const handleLike = (item) => {
    if(likelist.find((like)=>(like.UC_SEQ === item.UC_SEQ))) {
      const remainList = likelist.filter((l)=>(l.UC_SEQ !== item.UC_SEQ))
      setLikelist(remainList);
    } else {
      const addList = likelist.concat({
        UC_SEQ: item.UC_SEQ,
        img: item.MAIN_IMG_THUMB,
        title: item.MAIN_TITLE,
        address: item.ADDR1,
        time: item.USAGE_DAY_WEEK_AND_TIME
      })
      setLikelist(addList);
    }
  }  

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
    } 
  }

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    rows: 2,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className='background'>
        <div className='menu-header'>
          <h1>전체</h1>
          <select value={selectedValue} onChange={handleSelect}>
            <option value="index">기본순</option> 
            <option value="review">리뷰 많은 순</option>
          </select>
        </div>

        <div className='box-wrap'>
          <Slider {...settings}>
          {loading && currentItems.map((item)=>(
          <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
            <div
            className='img-box'
            > 
              {/* 좋아요 이모티콘 */}
              <div 
              className={ likelist.find((like)=>(like.UC_SEQ === item.UC_SEQ)) ? "click-like" : "like"}
              onClick={()=>{handleLike(item)}}
              >
              </div>

              {/* 미니창 */}
              <div className='img' 
              style={{backgroundImage: `url(${item.MAIN_IMG_THUMB})`}}
              >
              </div>
              <div className='description'>
                <h2>{item.MAIN_TITLE}</h2>
                <p>{item.GUGUN_NM}</p>
                <p>대표 메뉴</p>
                <p>{item.RPRSNTV_MENU}</p>
              </div>
            </div>
          </Link>
          ))}
          </Slider>
          { 
            currentItems && (
            <button 
            id="load-button"
            onClick={()=>{handleLoadMore()}}
            style={{display: "block", margin: "auto"}}
            >
              Load More
            </button>
            )      
          }
        </div>
    </div>
  )
}
