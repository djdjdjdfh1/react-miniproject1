import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/menu.css'
import JsonData from '../context/JsonData';
import StarRating from '../components/StarRating';

export default function Like() {
  const { state } = useContext(JsonData);
  const { likelist, commentList } = state;

  const reviewCounts = likelist.map((item) => {
    const commentItems = commentList.filter((comment) => comment.UC_SEQ === item.UC_SEQ);
    return commentItems.length;
  });
  console.log(reviewCounts);

  return (
    <div className='background' style={{minHeight: "100vh"}}>
        <h1 style={{padding: "20px"}}>Like</h1>
        <p style={{padding: "20px"}}>좋아요를 누른 가게가 표시됩니다</p>

        <div className='box-wrap'>
          {likelist.map((item, index)=>(
            <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
              <div 
              key={item.UC_SEQ}
              className='img-box'
              > 
                <div className= 'img' 
                style={{backgroundImage: `url(${item.img})`}}              
                >
                </div>
                <h2>{item.title}</h2>
                <p>{item.address}</p>
                <p>대표메뉴</p>
                <p>{item.menu}</p>
                <p>리뷰: {reviewCounts[index]}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}
