import React, {useState, useEffect} from 'react'
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

export default function Main() {

  let options = {
    anchors: ['one', 'two', 'three', 'four', 'five', 'six'],
  };

  const [ranMenu, setRanMenu] = useState([]);
  const {state, func, action} = useContext(JsonData);
  const {menuList, likelist} = state;
  const {getMenu} = func;
  const {setLikelist} = action;
  const [loading, setLoading] = useState(false);
  useEffect(()=>{getMenu()}, [])
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

      while(mySet.size<8 && menuList.length !== 0) {
        mySet.add(Math.floor(Math.random()*menuList.length))
      }
      mySet.forEach((n)=>a.push(menuList[n]))
      setRanMenu(a);
    }
    genRandom2();
    console.log(ranMenu);
  }, [menuList])

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

  return (
    <div style={{backgroundColor: "antiquewhite"}}>
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
          <div className='box-wrap' style={{paddingTop: "140px", minHeight: "100vh"}}>
              {loading && ranMenu.map((item)=>(
                <div 
                key={item.UC_SEQ}
                className='img-box'
                > 
                {/* 좋아요 이모티콘 */}
                  <div 
                  className={ likelist.find((like)=>(like.UC_SEQ === item.UC_SEQ)) ? "click-like" : "like"}
                  onClick={()=>{handleLike(item)}}
                  > 
                  </div>

                  {/* 작은사진 */}
                  <div className= 'img' 
                  style={{backgroundImage: `url(${item.MAIN_IMG_THUMB})`}}             
                  >
                  </div>
                  <h3>{item.MAIN_TITLE}</h3>
                  <p>{item.ADDR1}</p>
                  <p>{item.USAGE_DAY_WEEK_AND_TIME}</p>
                </div>
              ))}
            </div>
        </Section>
      </SectionsContainer>
    </div>
  )
}
