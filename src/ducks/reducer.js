import axios from 'axios';

const initialState = {
    salaries: [],
    popularJobs: []
}

const UPDATE_SALARIES = 'UPDATE_SALARIES'; 
const REMOVE_SALARIES = 'REMOVE_SALARIES'; 
const GET_POPULAR_JOBS = 'GET_POPULAR_JOBS';


export function updateSalaries( searchTerm ){
    let stFixed = searchTerm.replace(/\s+/g, '-').toLowerCase();
    return {
        type: UPDATE_SALARIES,
        payload: axios.get(`http://localhost:8080/api/salaries/get/${stFixed}`).then( res => res.data)
    }
}

export function removeSalaries(){
    return {
        type: REMOVE_SALARIES,
        payload: []
    }
}

export function getPopularJobs(){
    return {
        type: GET_POPULAR_JOBS,
        payload: axios.get(`http://localhost:8080/api/salaries/getpopularjobs`).then(res => res.data)
    }
}


export default function reducer(state=initialState, action) {
    switch(action.type){
        case UPDATE_SALARIES + '_FULFILLED':
            console.log('payload: ', action.payload)
            return Object.assign({}, state, {salaries: action.payload});
        case REMOVE_SALARIES:
            return Object.assign({}, state, {salaries: action.payload});
        case GET_POPULAR_JOBS + '_FULFILLED':
            return Object.assign({}, state, {popularJobs: action.payload});

        default: 
            return state;
    }
}