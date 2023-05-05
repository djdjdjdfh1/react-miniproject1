import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/menu.css'
import JsonData from '../context/JsonData';
import StarRating from '../components/StarRating';

export default function Like() {
  const { state, action } = useContext(JsonData);
  const { likelist, commentList, num } = state;
  const { setLikelist, setCommentList, setNum } = action;

  return (
    <div className='background' style={{minHeight: "100vh"}}>
        <h1 style={{padding: "20px"}}>Like</h1>
        <p style={{padding: "20px"}}>좋아요를 누른 가게가 표시됩니다</p>

        <div className='box-wrap'>
          {likelist.map((item)=>(
            <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
              <div 
              key={item.UC_SEQ}
              className='img-box'
              > 
                <div className= 'img' 
                style={{backgroundImage: `url(${item.img})`}}              
                >
                </div>
                <StarRating />
                <h2>{item.title}</h2>
                <p>{item.address}</p>
                <p>대표메뉴</p>
                <p>{item.menu}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}
