import React from 'react';

function Message({ variant, children }) {
    const variantStyles = {
        success: 'bg-green-100 text-green-800 border border-green-400',
        error: 'bg-red-100 text-red-800 border border-red-400',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-400',
        info: 'bg-blue-100 text-blue-800 border border-blue-400',
    };

    return (
        <div className={`p-4 mb-4 rounded border-l-4 ${variantStyles[variant]}`}>
            {children}
        </div>
    );
}

export default Message;
