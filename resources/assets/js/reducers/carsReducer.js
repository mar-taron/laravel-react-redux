const initialState = {
    cars: [],
    car: null,
    fetched: false,
    error: null
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "FETCH_CARS_REJECTED":
            {
                return Object.assign({},
                state, {
                  fetched: false,
                  error: action.payload
                }); 
            }
        case "FETCH_CARS_FULFILLED":
            {
                return Object.assign({},
                state, {
                   fetched: true,
                    cars: action.payload,
                }); 
            }
        case "FETCH_CAR_REJECTED":
            {
                return Object.assign({},state, 
                {
                   fetched: false,
                   error: action.payload
                }); 
            }
        case "FETCH_CAR_FULFILLED":
            {
                return Object.assign({},state, 
                {
                    fetched: true,
                    car: action.payload
                }); 
            }
        default: return state;    
    }
    return state;
}