import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../css/menu.css'
import JsonData from '../context/JsonData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Like() {
  const { state } = useContext(JsonData);
  const { likelist, commentList } = state;

  const reviewCounts = likelist.map((item) => {
    const commentItems = commentList.filter((comment) => comment.UC_SEQ === item.UC_SEQ);
    return commentItems.length;
  });

  return (
    <div className='background' style={{minHeight: "100vh"}}>
        <h1 style={{padding: "20px", fontSize: "2rem"}}>Like</h1>
        <p style={{padding: "20px", fontSize: "1.4rem"}}>좋아요를 누른 가게가 표시됩니다</p>

        <div className='box-wrap'>
          {likelist.map((item, index)=>{
            const commentItems = commentList.filter((comment) => comment.UC_SEQ === item.UC_SEQ);
            const ratingList = commentItems.map((comment) => comment.rating);
            const averageRating = ratingList.reduce((acc, cur) => acc + cur, 0) / ratingList.length;
            const ratingAvr = isNaN(averageRating) ? '평가중' : averageRating.toFixed(1);

            return (
            <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
              <div 
              key={item.UC_SEQ}
              className='img-box'
              > 
                <div className= 'img' 
                style={{backgroundImage: `url(${item.img})`, backgroundColor: 'gray'}}              
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
                <h2>{item.title}</h2>
                <p>{item.address}</p>
                <p>대표메뉴</p>
                <p>{item.menu}</p>
                <p>리뷰: {reviewCounts[index]}</p>
              </div>
            </Link>
            )
          })}
        </div>
    </div>
  )
}
