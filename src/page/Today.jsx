import React, { useContext, useEffect, useState } from 'react'
import '../css/menu.css'
import JsonData from '../context/JsonData'

export default function Today() {
  const value = useContext(JsonData);
  const {state, func, action} = value;
  const {menuList, likelist, commentList, num} = state;
  const {getMenu} = func;
  const {setLikelist, setCommentList, setNum} = action;
  const [preComment, setPreComment] = useState("");
  const [star, setStar] = useState(null);
  const [lightimg, setLightimg] = useState();
  const [text, setText] = useState("");

  const [ranMenu, setRanMenu] = useState([]); 

  const [loading, setLoading] = useState(false);

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

  useEffect(()=>{getMenu()}, []);
  useEffect(()=>{
    if(menuList.length>0) {
        setLoading(true);
    }
    
    const oneMenu = menuList[Math.floor(Math.random()*menuList.length)]
    setRanMenu([oneMenu]);
  }, [menuList])

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
    <div className='background'>
        <h1 style={{textAlign: "center", padding: "20px"}}>오늘의 메뉴 추천</h1>       
        <div className='box-wrap'>
          {loading && ranMenu.map((item)=>(
            <div
            style={{margin: "auto", display: "block"}} 
            key={item.UC_SEQ}
            className='img-box'
            > 
              {/* 좋아요 이모티콘 */}
              <div 
              className={ likelist.find((like)=>(like.UC_SEQ === item.UC_SEQ)) ? "click-like" : "like"}
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
                  className="btn"
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
                  {loading && showComment(preComment).map((comment, i)=>(
                    <p key={i}>익명 : {comment.text} / 별점: {comment.rating}</p>
                  ))}
                </div> 
              </div>

              {/* 미니창 */}
              <div className= 'img' 
              style={{backgroundImage: `url(${item.MAIN_IMG_THUMB})`}}
              onClick={()=>{
                setLightimg(item.MAIN_IMG_THUMB)
                setPreComment(item.UC_SEQ)
              }}              
              >
              </div>
              <h3>{item.MAIN_TITLE}</h3>
              <p>{item.ADDR1}</p>
              <p>{item.USAGE_DAY_WEEK_AND_TIME}</p>
            </div>
          ))}
        <button
        style={{display:"block", margin: "auto", marginTop: "10px"}}
        onClick={()=>{
          const oneMenu = menuList[Math.floor(Math.random()*menuList.length)]
          setRanMenu([oneMenu]);
        }}
        >
          리셋
        </button>
        </div>
    </div>
  )
}
