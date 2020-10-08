import React from 'react';

const Carousel = () => {
    return (<div className="text-center" id="carousel">
        <div id="carouselExampleInterval"
         className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
     <div className="carousel-item text-center active" data-interval="1000">
      <img   id="pic-carousel"
      src="/media/5f0cbe6a9687e_camera.jpeg" 
      className="d-block  w-100" alt="Camera"/>
       <span id="carousel-details">
          4000 Dhs <br/>
      </span>
    </div>
    <div className="carousel-item  text-center" data-interval="1000">
      <img id="pic-carousel"
      src="/media/5f0cbe548e817_bycecle.png" 
      className="d-block w-100" alt="Bycicle"/>
      <span id="carousel-details">
          1100 Dhs <br/>
      </span>
    </div>
   
    <div className="carousel-item text-center" data-interval="1000">
      <img id="pic-carousel"
      src="/media/5f0cbea30566d_glases.jpeg" 
      className="d-block  w-100" alt="Glasses"/>
       <span id="carousel-details">
          50 Dhs <br/>
      </span>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon " ></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next " href="#carouselExampleInterval" role="button" data-slide="next">
    <span className="carousel-control-next-icon " ></span>
    <span className="sr-only">Next</span>
  </a>
</div>
  </div>  );
};

export default Carousel;
