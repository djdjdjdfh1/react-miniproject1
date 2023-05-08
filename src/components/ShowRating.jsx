import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ShowRating(props) {
  return (
    <div>
        {[...Array(5)].map((star, i)=> {
                const ratingValue = i + 1;
                    return (
                        <label>
                            <input 
                                type="radio" 
                                name="rating" 
                                value={props.rating} 
                            />  
                            <FontAwesomeIcon 
                            className='star'
                            color={ratingValue <= props.rating ? "#ffc107" : "#e4e5e9"} 
                            icon={faStar}  
                            />
                        </label>
                    );
                })}
    </div>
  )
}
