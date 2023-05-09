import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import '../css/main.css'
import { useContext } from 'react';
import JsonData from '../context/JsonData';

// Import Swiper styles
import "swiper/css";
// Import Swiper styles
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper";
import "../css/styles.css";

import {SectionsContainer, Section} from 'react-fullpage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Main() {

  let options = {
    anchors: ['one', 'two', 'three', 'four', 'five', 'six'],
  };

  const [ranMenu, setRanMenu] = useState([]);
  const { state } = useContext(JsonData);
  const { menuList, commentList } = state;
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    // menuList의 처음값이 빈값으로 들어감
    // 빈값이 아닌 값이 들어갔을때 화면에 출력
    if(menuList.length>0) {
        // 값이 들어왔다면 true로 바꿔서 화면출력
        setLoading(true);
    }
    
    function genRandom2() {
      const a = [];
      const mySet = new Set();  

      while(mySet.size<6 && menuList.length !== 0) {
        mySet.add(Math.floor(Math.random()*menuList.length))
      }
      mySet.forEach((n)=>a.push(menuList[n]))
      setRanMenu(a);
    }
    genRandom2();
  }, [menuList])

  return (
    <div>
      <SectionsContainer {...options}>
        <Section>
          <div className='background-img'></div>
        </Section>
        <Section>
          <div className='background2-img'></div>
        </Section>
        <Section>
          <div className='background3-img'></div>
        </Section>
        <Section>
          <div className='background4-img'></div>
        </Section>
        <Section>
          {/* 카드 슬라이드 */}
          <>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide> 
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
            </Swiper>
          </>
          <h1 className='slide-h1'>부산에 있는 다양한 음식들을 만나보세요</h1>
        </Section>
        <Section>
          {/* 랜덤음식박스 */}  
          <div className='box-wrap' style={{paddingTop: "140px"}}>
              {loading && ranMenu.map((item)=>{
                const commentItems = commentList.filter((comment) => comment.UC_SEQ === item.UC_SEQ);
                const ratingList = commentItems.map((comment) => comment.rating);
                const averageRating = ratingList.reduce((acc, cur) => acc + cur, 0) / ratingList.length;
                const ratingAvr = isNaN(averageRating) ? '평가중' : averageRating.toFixed(1);
                
                return(
                <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
                  <div 
                  key={item.UC_SEQ}
                  className='img-box'
                  > 
                    {/* 미니창 */}
                    <div 
                      className='img' 
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
                    </div>
                  </div>
                </Link>
                )
              })}
            </div>
        </Section>
      </SectionsContainer>
    </div>
  )
}
