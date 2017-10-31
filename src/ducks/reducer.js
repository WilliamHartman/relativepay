const initialState = {
    salaries: []
}

const UPDATE_SALARIES = 'UPDATE_SALARIES';

export function updateSalaries( results ){
    return {
        type: UPDATE_SALARIES,
        payload: results
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type){
        case UPDATE_SALARIES:
            return Object.assign({}, state, {salaries: action.payload});
    
        default: 
            return state;
    }
}