export const userLogin = (details) => {
    return (dispatch, getState) => {
        dispatch({            
            type: 'USER_LOGIN',
            details: details,        
        })
    }
};

export const userLogout = () => {
    return (dispatch, getState) => {
        dispatch({            
            type: 'USER_LOGOUT',        
        })
    }
}

export const userRegister = (details) => {
    return (dispatch, getState) => {
        dispatch({            
            type: 'USER_REGISTER',
            details: details,        
        })
    }
};



