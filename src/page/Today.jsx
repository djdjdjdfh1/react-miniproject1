import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/menu.css'
import JsonData from '../context/JsonData'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Today() {
  const value = useContext(JsonData);
  const {state} = value;
  const {menuList, commentList} = state;

  const [ranMenu, setRanMenu] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(menuList.length>0) {
        setLoading(true);
    }
    const oneMenu = menuList[Math.floor(Math.random()*menuList.length)]
    setRanMenu([oneMenu]);
  }, [menuList])

  const commentItems = commentList.filter((comment) => comment.UC_SEQ === ranMenu[0]?.UC_SEQ);
  const reviewCount = commentItems.length;

  const ratingList = commentItems.map((comment) => comment.rating);
  const averageRating = ratingList.reduce((acc, cur) => acc + cur, 0) / ratingList.length;
  const ratingAvr = isNaN(averageRating) ? '평가중' : averageRating.toFixed(1);

  return (
    <div className='background'>
        <h1 style={{fontSize: "1.7rem", textAlign: "center", padding: "20px"}}>오늘의 메뉴 추천</h1>       
        <div>
          {loading && ranMenu.map((item)=>{
            
            return(
            <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
              <div
              style={{margin: "auto", display: "block"}} 
              key={item.UC_SEQ}
              className='img-box'
              >

                {/* 미니창 */}
                <div className= 'img' 
                style={{backgroundImage: `url(${item.MAIN_IMG_THUMB})`}}        
                >
                </div>
                {
                  isNaN(averageRating) ? <h2 style={{display:"inline", color: "#9e9e9e"}}>평가중</h2> : <>
                      <FontAwesomeIcon 
                        icon={faStar} 
                        color={"#ffc107"}
                        style={{fontSize: "2rem", display: "inline-block"}}
                      />
                      <h2 style={{display:"inline"}}>{ratingAvr}</h2>
                    </>
                }
                <h2>{item.MAIN_TITLE}</h2>
                <p>{item.GUGAN_NM}</p>
                <p>대표메뉴</p>
                <p>{item.RPRSNTV_MENU}</p>
                <p>리뷰: {reviewCount}</p>
              </div>
            </Link>
            )
          })}
        <button
        style={{display:"block", margin: "auto", marginTop: "10px"}}
        onClick={()=>{
          const oneMenu = menuList[Math.floor(Math.random()*menuList.length)]
          setRanMenu([oneMenu])
        }}
        >
          리셋
        </button>
        </div>
    </div>
  )
}
