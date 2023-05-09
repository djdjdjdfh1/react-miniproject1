import React, { useEffect, useContext, useState } from 'react'
import KakaoMapComp from '../components/KakaoMapComp';
import JsonData from '../context/JsonData';
import { useParams } from 'react-router-dom'
import '../css/board.css'
import StarRating from '../components/StarRating';
import ShowRating from '../components/ShowRating';

export default function Board() {
  const { state, action, func } = useContext(JsonData);
  const { menuList, commentList, num, likelist } = state;
  const { setCommentList, setNum, setLikelist } = action;
  const { getMenu } = func;
  const [oneMenu, setOneMenu] = useState("");
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const [text, setText] = useState("");

  useEffect(()=>{getMenu()},[])
  useEffect(()=>{
    if(menuList.length>0) {
      const menu = menuList.find((menu)=>(menu.UC_SEQ === Number(id)))
      setOneMenu(menu);
      setLoading(true);
    }
  }, [menuList])
  
  const comments = commentList.filter((c)=>(c.UC_SEQ === Number(id)))
  
  const addComment = (id) => {
    const newComment = {
      cid : num,
      UC_SEQ : id,
      text : text,
      rating : rating
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
        address: item.GUGUN_NM,
        menu: item.RPRSNTV_MENU
      })
      setLikelist(addList);
    }
  }
  
  const [rating, setRating] = useState(null); 

  const handleStar = (star) => {
    setRating(star);
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
        <p className='review'>음식점 리뷰</p>  
      {                
        comments.map((comment)=>(
          <ul className='comment'>
            <li>
              <ShowRating rating={comment.rating}/>
            </li>
            <li>작성자: 익명</li>
            <li>내용: {comment.text}</li>
          </ul>
        ))
      }

      {/* 코멘트 작성양식 */}
      <h1 className='review-write'>리뷰작성</h1>
      <form 
        className='comment-form'
        onSubmit={(e)=>{
          e.preventDefault();
          addComment(oneMenu.UC_SEQ);
          setText("");
        }}
      > 
        {/* 별점평가 */}
        <p style={{paddingTop: '10px'}}>리뷰</p>
        <textarea
          style={{marginTop: "20px"}}
          type="text"
          onChange={(e)=>(setText(e.target.value))}
          value={text}
          rows={8}
          cols={80}
          placeholder='리뷰를 작성하세요.'
          required
        >
        </textarea> 
        <p>별점</p>
        <StarRating value={handleStar}/>
        <input type="submit" value="등록" />
      </form>
      </div>
    </div>
  )
}
