import React from 'react';

function Label({ className, children, somelabel, isRequired }) {
    return (
        <div>
            <label
                className={`ml-1 ${className}`}
                somelabel={somelabel}
            >
                {children} {isRequired && <span className='text-red-600'>*</span>}
            </label>
        </div>
    );
}
export default Label;