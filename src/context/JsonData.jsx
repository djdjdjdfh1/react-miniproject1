import React, {useState} from 'react'
import data from '../data/dummy.json'

const JsonData = React.createContext("");

const JsonProvider = ({children}) => {
    const [menuList, setMenuList] = useState(data.getFoodKr.item);
    const [num, setNum] = useState(17);
    const [likelist, setLikelist] = useState([]);

    const [commentList, setCommentList] = useState(
        [
            {
                cid : 1,
                UC_SEQ : 70,
                text : "너무 맛도리에용",
                rating : 4
            },
            {
                cid : 2,
                UC_SEQ : 7,
                text : "별점5개드립니다",
                rating : 5
            },
            {
                cid : 3,
                UC_SEQ : 7,
                text : "맛이요",
                rating : 4
            },
            {
                cid : 4,
                UC_SEQ : 70,
                text : "개추요",
                rating : 5
            },
            {
                cid : 5,
                UC_SEQ : 72,
                text : "존맛탱이요",
                rating : 4
            },
            {
                cid : 6,
                UC_SEQ : 70,
                text : "소주가온나",
                rating : 4
            },
            {
                cid : 7,
                UC_SEQ : 124,
                text : "이재모 피자 뭐하다 이재모",
                rating : 4
            },
            {
                cid : 8,
                UC_SEQ : 141,
                text : "거대갈비 맛있어요",
                rating : 5
            },
            {
                cid : 9,
                UC_SEQ : 163,
                text : "맛이 힘들어요",
                rating : 2
            },
            {
                cid : 10,
                UC_SEQ : 72,
                text : "존맛탱이요",
                rating : 5
            },
            {
                cid : 11,
                UC_SEQ : 163,
                text : "스시는 화명이지",
                rating : 5
            },
            {
                cid : 12,
                UC_SEQ : 200,
                text : "맛이 좋네요",
                rating : 4
            },
            {
                cid : 13,
                UC_SEQ : 163,
                text : "내취향이다",
                rating : 5
            },
            {
                cid : 14,
                UC_SEQ : 203,
                text : "양곱창 땡겨서 먹었어요",
                rating : 4
            },
            {
                cid : 15,
                UC_SEQ : 252,
                text : "다시 방문하고 싶은곳",
                rating : 5
            },
            {
                cid : 16,
                UC_SEQ : 865,
                text : "피자가 끝내줍니다",
                rating : 3
            }
        ]
    );

    const value = {
        state : {menuList, commentList, num, likelist},
        action : {setMenuList, setCommentList, setNum, setLikelist},
    }

    return (
        <JsonData.Provider value={value}>
            {children}
        </JsonData.Provider>
    )
}

export {JsonProvider};
export default JsonData;