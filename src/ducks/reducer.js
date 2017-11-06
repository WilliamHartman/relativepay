import axios from 'axios';

const initialState = {
    salaries: [],
    popularJobs: []
}
 
const UPDATE_SALARIES = 'UPDATE_SALARIES'; 
const REMOVE_SALARIES = 'REMOVE_SALARIES'; 
const GET_POPULAR_JOBS = 'GET_POPULAR_JOBS';
const GET_SALARIES_BY_STATE = 'GET_SALARIES_BY_STATE';
const GET_SALARIES_BY_RANK = 'GET_SALARIES_BY_RANK';
const GET_SALARIES_BY_CITY = 'GET_SALARIES_BY_CITY';


export function updateSalaries( searchTerm ){
    let stFixed = searchTerm.replace(/\s+/g, '-').toLowerCase();
    return {
        type: UPDATE_SALARIES,
        payload: axios.get(`/api/salaries/get/${stFixed}`).then( res => res.data)
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
        payload: axios.get(`/api/salaries/getpopularjobs`).then(res => res.data)
    }
}

export function getSalariesByState(searchTerm){
    let stFixed = searchTerm.replace(/\s+/g, '-').toLowerCase();
    return {
        type: GET_SALARIES_BY_STATE,
        payload: axios.get(`/api/salaries/getbystate/${stFixed}`).then(res => res.data)        
    }
}

export function getSalariesByRank(searchTerm){
    let stFixed = searchTerm.replace(/\s+/g, '-').toLowerCase();
    return {
        type: GET_SALARIES_BY_RANK,
        payload: axios.get(`/api/salaries/getbyrank/${stFixed}`).then(res => res.data)        
    }
}

export function getSalariesByCity(searchTerm){
    let stFixed = searchTerm.replace(/\s+/g, '-').toLowerCase();
    return {
        type: GET_SALARIES_BY_CITY,
        payload: axios.get(`/api/salaries/getbycity/${stFixed}`).then(res => res.data)        
    }
}

export default function reducer(state=initialState, action) {
    switch(action.type){
        case UPDATE_SALARIES + '_FULFILLED':
            return Object.assign({}, state, {salaries: action.payload});
        case REMOVE_SALARIES:
            return Object.assign({}, state, {salaries: action.payload});
        case GET_POPULAR_JOBS + '_FULFILLED':
            return Object.assign({}, state, {popularJobs: action.payload});
        case GET_SALARIES_BY_STATE + '_FULFILLED':
            return Object.assign({}, state, {salaries: action.payload});
        case GET_SALARIES_BY_RANK + '_FULFILLED':
            return Object.assign({}, state, {salaries: action.payload});
        case GET_SALARIES_BY_CITY + '_FULFILLED':
            return Object.assign({}, state, {salaries: action.payload});
        default: 
            return state;
    }
}