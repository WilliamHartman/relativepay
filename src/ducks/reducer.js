import axios from 'axios';

const initialState = {
    salaries: []
}

const UPDATE_SALARIES = 'UPDATE_SALARIES'; 


export function updateSalaries( searchTerm ){
    let stFixed = searchTerm.replace(/\s+/g, '-').toLowerCase();
    return {
        type: UPDATE_SALARIES,
        payload: axios.get(`http://localhost:8080/api/salaries/get/${stFixed}`).then( res => res.data)
    }
}




export default function reducer(state=initialState, action) {
    switch(action.type){
        case UPDATE_SALARIES + '_FULFILLED':
            console.log('payload: ', action.payload)
            return Object.assign({}, state, {salaries: action.payload});


        default: 
            return state;
    }
}