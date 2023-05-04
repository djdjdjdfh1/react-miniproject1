import React, { useContext } from 'react'
import { useState } from 'react';
import '../css/menu.css'
import JsonData from '../context/JsonData';

export default function Like() {
  const { state, action } = useContext(JsonData);
  const { likelist, commentList, num } = state;
  const { setLikelist, setCommentList, setNum } = action;

  const [lightimg, setLightimg] = useState();

  const [text, setText] = useState("");
  const [preComment, setPreComment] = useState("");

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
            {/* 좋아요 이모티콘 */}
              <div 
              className= "click-like"
              onClick={()=>{handleLike(item)}}
              > 
              </div>

              {/* 모달창 */}
              <div className={lightimg ? 'light-box-on' : 'light-box-off'}> 
                <div >
                  <button
                  onClick={()=>{
                    setLightimg(null);
                  }}
                  className='btn'
                  >
                    X
                  </button>
                  <img src={lightimg}></img>
                  <br />
                  <br />
                  <form
                    onSubmit={(e)=>{
                      e.preventDefault();
                      addComment(preComment);
                      setText("");
                      setStar("");
                    }}
                  >
                    <label htmlFor="">내용 </label>
                    <input 
                    type="text" 
                    onChange={(e)=>(setText(e.target.value))}
                    value={text}
                    placeholder='평가를 작성하세요.'
                    required
                    />
                    <br />
                    <label htmlFor="">별점 </label>
                    <input 
                    type="number" 
                    min={1} max={5} 
                    placeholder="1~5사이의 정수를 입력하세요."
                    style={{width: "200px"}}
                    onChange={(e)=>{setStar(e.target.value)}}
                    value={star}
                    required
                    />
                    <br />
                    <input type="submit" value="등록" />
                  </form>
                  <hr />
                  {showComment(preComment).map((comment, i)=>(
                    <p key={i}>익명 : {comment.text} / 별점: {comment.rating}</p>
                  ))}
                </div> 
              </div>

              <div className= 'img' 
              style={{backgroundImage: `url(${item.img})`}}
              onClick={()=>{
                setLightimg(item.img);
                setPreComment(item.UC_SEQ);
              }}              
              >
              </div>
              <h3>{item.title}</h3>
              <p>{item.address}</p>
              <p>{item.time}</p>
            </div>
          ))}
        </div>
    </div>
  )
}
