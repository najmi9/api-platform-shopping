import reducer from '../reducers/rootReducer';
import { createStore } from 'redux';
import throttle from 'lodash.throttle';




const store = createStore(reducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     
   );


function saveState(state){
    localStorage.setItem('cart', JSON.stringify(state));
}

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 0.01));

//store.subscribe(saveState(store.getState()));

export default store;
