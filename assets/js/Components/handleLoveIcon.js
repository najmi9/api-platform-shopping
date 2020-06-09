 
    const handleLove = async (id) =>{
   if (isAuthenticated) {
    	const icon = document.getElementById('js-love'+id);
    	const prod = products.filter(pro=>pro.id === id)[0];
    	if (icon.classList.contains('fas')) {
        	icon.classList.replace('fas', 'far')
       	  icon.classList.remove('btn-love')         
           try {
           await LikeAPI.deleteLike(id);                           
           } catch(e) {
             // statements
             console.log(e);
           }

          
       }else if(icon.classList.contains('far')){
       	    icon.classList.replace('far', 'fas')
         	icon.classList.add('btn-love') 
           try {
              await LikeAPI.createLike({
          "product":"http://localhost:8000/api/products/"+id
           });
           } catch(e) {
             // statements
             console.log(e);
           }
       } 
       setProducts(await ProductAPI.fetchProducts());
     }else{
      toast.info("Vous pouvez pas aimer si vous êtes déconnecté !")
     }
    }
    export{
      handleLove
    }