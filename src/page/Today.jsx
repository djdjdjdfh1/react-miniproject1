import React, { useContext, useEffect, useState } from 'react'
import '../css/menu.css'
import JsonData from '../context/JsonData'

export default function Today() {
  const value = useContext(JsonData);
  const {state, func} = value;
  const {menuList, commentList} = state;
  const {getMenu} = func;

  const [ranMenu, setRanMenu] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(()=>{getMenu()}, []);
  useEffect(()=>{
    if(menuList.length>0) {
        setLoading(true);
    }
    const oneMenu = menuList[Math.floor(Math.random()*menuList.length)]
    setRanMenu([oneMenu]);
  }, [menuList])

  const commentItems = commentList.filter((comment) => comment.UC_SEQ === ranMenu[0]?.UC_SEQ);
  const reviewCount = commentItems.length;

  return (
    <div className='background'>
        <h1 style={{textAlign: "center", padding: "20px"}}>오늘의 메뉴 추천</h1>       
        <div>
          {loading && ranMenu.map((item)=>(
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
              <h2>{item.MAIN_TITLE}</h2>
              <p>{item.GUGAN_NM}</p>
              <p>대표메뉴</p>
              <p>{item.RPRSNTV_MENU}</p>
              <p>리뷰: {reviewCount}</p>
            </div>
          ))}
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
