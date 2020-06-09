      const handleImage = (id) =>{

        const img = document.getElementById('prod-pic-'+id);
       // console.log(img, id)
         //img.style.transform = 'scale(1.1)';
        // img.style.transition = 'transform 0.5s';
      
        function off() {
         //  img.style.transform = 'scale(1)';
        }
        setTimeout(off, 1000);

      }
       
      
   

       
       export{
        handleImage,
       }