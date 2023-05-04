import React from 'react'
import KakaoMapComp from '../components/KakaoMapComp';
import JsonData from '../context/JsonData';
import { useContext } from 'react';
import { useParams } from 'react-router-dom'

export default function Board() {
  const { state } = useContext(JsonData);
  const { menuList, commentList } = state;
  const {id} = useParams();
  
  const oneMenu = menuList.find((menu)=>(menu.UC_SEQ === Number(id)))
  const comments = commentList.filter((c)=>(c.UC_SEQ === Number(id)))
  
  return (
    <div className='background'>
      <img src={oneMenu.MAIN_IMG_THUMB} alt={oneMenu.TITLE}/>
      <h1>주소</h1>
      <p>{oneMenu.ADDR1}</p>
      <KakaoMapComp obj={oneMenu} />
      <p>UC_SEQ: {id}</p>
      <p>{oneMenu.MAIN_TITLE}</p>
      <p>{oneMenu.RPRSNTV_MENU}</p>
      <hr />
      {                
        comments.map((comment)=>(
          <ul>
            <li>별점: {comment.rating}</li>
            <li>내용: {comment.text}</li>
          </ul>
        ))
      }
    </div>
  )
}
