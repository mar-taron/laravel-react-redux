const initialState = {
    cars: [],
    car: null,
    fetched: false,
    error: null
}


export default function reducer(state = initialState, action) {

    switch (action.type) {
        case "FETCH_CARS_REJECTED":
            {
                return {
                    ...state,
                    fetched: false,
                    error: action.payload
                }
            }
        case "FETCH_CARS_FULFILLED":
            {
                return {
                    ...state,
                    fetched: true,
                    cars: action.payload.data.CARs,
                }
            }
        case "FETCH_CAR_REJECTED":
            {
                return {
                    ...state,
                    fetched: false,
                    error: action.payload
                }
            }
        case "FETCH_CAR_FULFILLED":
            {
                return {
                    ...state,
                    fetched: true,
                    car: action.payload
                }
            }
    }
    return state;
}