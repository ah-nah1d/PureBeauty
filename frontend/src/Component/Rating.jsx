import React from 'react';
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';

function Rating({ value, text, color = '#f8e825' }) {
  const renderStar = (starValue) => {
    let StarIcon; 

    if (value >= starValue) {
      StarIcon = ImStarFull;
    } else if (value >= starValue - 0.5) {
      StarIcon = ImStarHalf;
    } else {
      StarIcon = ImStarEmpty;
    }

    return <StarIcon style={{ color }} />;
  };

  return (
    <div className='flex items-center space-x-1'>
      {renderStar(1)}
      {renderStar(2)}
      {renderStar(3)}
      {renderStar(4)}
      {renderStar(5)}
      {text && <span className="ml-2 text-sm text-gray-700">{text}</span>}
    </div>
  );
}

export default Rating;
