import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import JsonData from '../context/JsonData';
import '../css/menu.css'
import { Link } from 'react-router-dom';


export default function Menu() {
  const {state, action, func} = useContext(JsonData);
  const {menuList, commentList, num, likelist} = state;
  const {setMenuList, setNum, setCommentList, setLikelist} = action;
  const {getMenu} = func;

  const [lightimg, setLightimg] = useState();
  const [text, setText] = useState("");
  const [preComment, setPreComment] = useState("");
  const [star, setStar] = useState(null);
  const [loading, setLoading] = useState(false);

  // cid라는 속성이 필요할까
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
  }, [menuList])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = menuList.slice(0, indexOfLastItem);
  
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  }

  useEffect(()=>{
    if (indexOfLastItem >= menuList.length) {
      document.getElementById("load-button").style.display = "none";
    }
  }, [indexOfLastItem, menuList.length])

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

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  
    if(value === 'review') {
      const sortedMenuList = menuList.sort((a, b) => {
        const aCommentCnt = commentList.filter(c => c.UC_SEQ === a.UC_SEQ).length;
        const bCommentCnt = commentList.filter(c => c.UC_SEQ === b.UC_SEQ).length;
        return bCommentCnt - aCommentCnt;
      });
      setMenuList(sortedMenuList);
    } 
  }

  return (
    <div className='background'>
        <div className='menu-header'>
          <h1>전체</h1>
          <select value={selectedValue} onChange={handleSelect}>
            <option value="index">기본순</option> 
            <option value="review">리뷰 많은 순</option>
          </select>
        </div>

        <div className='box-wrap'>
          {loading && currentItems.map((item)=>(
          <Link key={item.UC_SEQ} to={`/menu/${item.UC_SEQ}`}>
            <div
            className='img-box'
            > 
              {/* 좋아요 이모티콘 */}
              <div 
              className={ likelist.find((like)=>(like.UC_SEQ === item.UC_SEQ)) ? "click-like" : "like"}
              onClick={()=>{handleLike(item)}}
              >
              </div>
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

              {/* 미니창 */}
              <div className= 'img' 
              style={{backgroundImage: `url(${item.MAIN_IMG_THUMB})`}}
              >
              </div>
              <h3 style={{backgroundColor: "black"}}>{item.MAIN_TITLE}</h3>
              <p style={{backgroundColor: "black"}}>{item.ADDR1}</p>
              <p style={{backgroundColor: "black"}}>{item.USAGE_DAY_WEEK_AND_TIME}</p>
            </div>
          </Link>
          ))}
          { 
            currentItems && (
            <button 
            id="load-button"
            onClick={()=>{handleLoadMore()}}
            style={{display: "block", margin: "auto"}}
            >
              Load More
            </button>
            )      
          }
        </div>
    </div>
  )
}
