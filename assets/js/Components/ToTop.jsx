import React from 'react';

const ToTop = () => {
	const handleToTop = () =>{
		document.body.scrollTop=0;
		document.documentElement.scrollTop = 0;
	}

    return (
        <button className="btn btn-danger btn-sm toTop" onClick={handleToTop}>
        <i className="fas fa-arrow-up"></i>
        </button>
    );
};


export default ToTop;
