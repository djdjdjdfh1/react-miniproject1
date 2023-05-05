import React, { useContext } from 'react'
import { useState } from 'react';
import '../css/menu.css'
import JsonData from '../context/JsonData';
import StarRating from '../components/StarRating';

export default function Like() {
  const { state, action } = useContext(JsonData);
  const { likelist, commentList, num } = state;
  const { setLikelist, setCommentList, setNum } = action;

  const [text, setText] = useState("");

  const [star, setStar] = useState(null);

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

  const showComment = (UC_SEQ) => {
    const cList = commentList.filter((a)=>(a.UC_SEQ === UC_SEQ))
    return cList; 
  }

  const handleLike = (item) => {
      const remainList = likelist.filter((l)=>(l.UC_SEQ !== item.UC_SEQ))
      setLikelist(remainList);
  }

  return (
    <div className='background' style={{minHeight: "100vh"}}>
        <h1 style={{padding: "20px"}}>Like</h1>
        <p style={{padding: "20px"}}>좋아요를 누른 가게가 표시됩니다</p>

        <div className='box-wrap'>
          {likelist.map((item)=>(
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
          ))}
        </div>
    </div>
  )
}
