import React, {useState, useEffect} from 'react';
import throttle from 'lodash.throttle';

 const Test = () =>{
   const [ok, setOk] = useState(0);

    const fie = () =>{
    	throttle(()=>{
    console.log("hi iam in")
  	setOk(100)}, 1500)
    }

 	return <div id="component">
 	{ fie() }
 	Test
  <h1>
    {ok}
</h1>
 	</div>
 }
 export default Test;