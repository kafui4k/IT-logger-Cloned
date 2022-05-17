import {
    GET_TECHS,
    ADD_TECH,
    DELETE_TECH,
    TECHS_ERROR,
    SET_LOADING,
} from './types';

// Get Techs from Server
export const getTechs = () => {
    return async (dispatch) => {
        try {
            setLoading();

            const res = await fetch('/techs');
            const data = await res.json();

            dispatch({
                type: GET_TECHS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: TECHS_ERROR,
                payload: error.response.statusText,
            });
        }
    };
};

// Add Tech
export const addTech = (tech) => {
    return async (dispatch) => {
        try {
            setLoading();

            const res = await fetch('/techs', {
                method: 'POST',
                body: JSON.stringify(tech),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            dispatch({
                type: ADD_TECH,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: TECHS_ERROR,
                payload: error.response.statusText,
            });
        }
    };
};

// Delete Tech
export const deleteTech = (id) => {
    return async (dispatch) => {
        try {
            setLoading();

            await fetch(`/techs/${id}`, {
                method: 'DELETE',
            });

            dispatch({
                type: DELETE_TECH,
                payload: id,
            });
        } catch (error) {
            dispatch({
                type: TECHS_ERROR,
                payload: error.response.statusText,
            });
        }
    };
};

// Set Loading
export const setLoading = () => {
    return {
        type: SET_LOADING,
    };
};
