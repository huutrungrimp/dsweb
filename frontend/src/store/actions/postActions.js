export const createPost = (post) => {
    console.log(post)
    return (dispatch, getState) => {
        dispatch({            
            type: 'CREATE_POST',
            post: post,        
        })
    }
};

export const updatePost = (post) => {
    return (dispatch, getState) => {
        dispatch({            
            type: 'UPDATE_POST',  
            post: post               
        });
        console.log(post)
    }
};

export const deletePost = (postID) => {
    console.log(postID);
    return (dispatch, getState) => {
        dispatch({            
            type: 'DELETE_POST',    
            postID: postID
        })
    }
};
