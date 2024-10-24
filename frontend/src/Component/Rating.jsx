import React from 'react';
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';

function Rating({ value,starSize='1rem',textSize='1rem', text, color = '#f8e825' }) {
    const renderStar = (starValue) => {
        let StarIcon; 

        if (value >= starValue) {
        StarIcon = ImStarFull;
        } else if (value >= starValue - 0.5) {
        StarIcon = ImStarHalf;
        } else {
        StarIcon = ImStarEmpty;
        }

        return <StarIcon color={color} size={starSize}/>;
    };

    return (
        <div className='flex items-center space-x-1'>
        {renderStar(1)}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
        {renderStar(5)}
        {text && <span className="ml-2 text-gray-700"style={{ fontSize:textSize }}  >{text}</span>}
        </div>
    );
}

export default Rating;
