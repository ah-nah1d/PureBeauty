import React from 'react';
import { ImStarFull, ImStarEmpty } from 'react-icons/im';

const StarRating = ({ rating, setRating }) => {
    const stars = [1, 2, 3, 4, 5];

    const handleRating = (value) => {
        setRating(value);
    };

    return (
        <div className="flex px-4 space-x-1">
            {stars.map((star) => (
                <div
                    key={star}
                    onClick={() => handleRating(star)}
                    className="cursor-pointer"
                >
                    {rating >= star ? (
                        <ImStarFull className="text-yellow-500" size={24} />
                    ) : (
                        <ImStarEmpty className="text-gray-400" size={24} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StarRating;
