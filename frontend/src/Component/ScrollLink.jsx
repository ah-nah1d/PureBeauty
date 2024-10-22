import React from 'react';
import { Link } from 'react-router-dom';

const ScrollLink = ({ to, children, className, ...props }) => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Link to={to} onClick={handleScrollToTop} className={className} {...props}>
            {children}
        </Link>
    );
};

export default ScrollLink;
