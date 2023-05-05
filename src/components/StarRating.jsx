import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function StarRating() {
  const [rating, setRating] = useState(null);  
  const [hover, setHover] = useState(null);  

  return (
    <div>
        {[...Array(5)].map((star, i)=> {
            const ratingValue = i + 1;

            return (
                <label>
                    <input 
                        type="radio" 
                        name="rating" 
                        value="ratingValue" 
                        onClick={() => setRating(ratingValue)}
                    />  
                    <FontAwesomeIcon 
                    className='star'
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                    icon={faStar} 
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)} 
                    />
                </label>
            );
        })}
        <p>The rating is {rating}.</p>
    </div>
  )
}
