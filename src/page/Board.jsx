import React, { useEffect } from 'react'
import KakaoMapComp from '../components/KakaoMapComp';
import JsonData from '../context/JsonData';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../css/board.css'

export default function Board() {
  const { state, action, func } = useContext(JsonData);
  const { menuList, commentList, num, likelist } = state;
  const { setCommentList, setNum, setLikelist } = action;
  const { getMenu } = func;
  const [oneMenu, setOneMenu] = useState("");
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  
  useEffect(()=>{getMenu()},[])
  useEffect(()=>{
    if(menuList.length>0) {
      const menu = menuList.find((menu)=>(menu.UC_SEQ === Number(id)))
      setOneMenu(menu);
      setLoading(true);
    }
  }, [menuList])
  
  const comments = commentList.filter((c)=>(c.UC_SEQ === Number(id)))

  const [text, setText] = useState("");
  const [star, setStar] = useState(null);
  
  // cid라는 속성이 필요할까
  const addComment = (id) => {
    const newComment = {
      cid : num,
      UC_SEQ : id,
      text : text,
      rating : star
    }
    setNum(num +1);
    const newList = commentList.concat(newComment);
    setCommentList(newList);
  }

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
    <div className='board-box'>
      <div className='board-title'>
        {/* 가게명 */}
        <h1>{oneMenu.MAIN_TITLE}</h1>
      </div>
      {/* 음식 이미지 */}
      <div className='board-img' style={{backgroundImage: `url(${oneMenu.MAIN_IMG_THUMB})`}}></div>
      {/* 가게 설명 */}
      <div className='board-desc'>
        
        {/* 좋아요 이모티콘 */}
        <div className='like-border'>
          <div 
            className={ likelist.find((like)=>(like.UC_SEQ === oneMenu.UC_SEQ)) ? "click-like" : "like"}
            onClick={()=>{handleLike(oneMenu)}}
            >
          </div>
          <p>좋아요</p>
        </div>
        <p className='bold' style={{marginTop:"20px"}}>가게명</p>
        <p>{oneMenu.MAIN_TITLE}</p>
        <p className='bold'>매장소개</p>
        <p>{oneMenu.ITEMCNTNTS}</p>
        <p className='bold'>대표메뉴</p>
        <p>{oneMenu.RPRSNTV_MENU}</p>
        <p className='bold'>운영시간</p>
        <p>{oneMenu.USAGE_DAY_WEEK_AND_TIME}</p>
        <p className='bold'>전화번호</p>
        <p>{oneMenu.CNTCT_TEL}</p>
        <p className='bold'>주소</p>
        <p style={{marginBottom: "20px"}}>부산광역시 {oneMenu.ADDR1}</p>
      </div>

      {/* 지도 */}
      {loading && <KakaoMapComp obj={oneMenu} />}
      
      {/* 코멘트리스트 */}
      <div>
        <p style={{padding: '20px'}}>음식점 리뷰</p>  
      {                
        comments.map((comment)=>(
          <ul className='comment'>
            <li>익명</li>
            <li>{comment.text}</li>
            <li>별점: {comment.rating}</li>
          </ul>
        ))
      }

      {/* 코멘트 작성양식 */}
      <form 
        onSubmit={(e)=>{
          e.preventDefault();
          addComment(oneMenu.UC_SEQ);
          setText("");
          setStar("");
        }}
      >
        <label htmlFor="">별점 </label>
        <input 
          type="number" 
          min={1} max={5} 
          placeholder="1~5사이의 정수를 입력하세요."
          style={{width: "190px"}}
          onChange={(e)=>{setStar(e.target.value)}}
          value={star}
          required
        />
        <br />
        <label htmlFor="">내용 </label>
        <input 
          type="text"
          onChange={(e)=>(setText(e.target.value))}
          value={text}
          placeholder='평가를 작성하세요.'
          required
        />
        <input type="submit" value="등록" />
      </form>
      </div>
    </div>
  )
}
