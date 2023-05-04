import React, { useEffect } from 'react'
import JsonData from '../context/JsonData';
import { useContext } from 'react';

export default function KakaoMapComp({obj}) {
    const kakao = window.kakao;

    useEffect(()=>{
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(obj.LAT, obj.LNG), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 마커위치
        const markerPosition  = new kakao.maps.LatLng(obj.LAT, obj.LNG); 
        
        // 마커 생성
        const marker = new kakao.maps.Marker({
        position: markerPosition
        });        
        
        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);
    }, [])
    

  return (
    <div>
        <div id="map" style={{width:"500px", height:"400px"}}></div>
    </div>
  )
}
