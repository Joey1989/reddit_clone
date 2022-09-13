import React, { useContext } from 'react';
import useRedditCollection from '../hooks/useRedditCollection';

export const RedditContext = React.createContext(undefined);

export const RedditProvider = ({children}) => {
    const [{posts, selectedPost, selectedComments}, redditDispatch] = useRedditCollection();

    return (
        <RedditContext.Provider value={{posts, selectedPost, selectedComments, redditDispatch}} >
            {children}
        </RedditContext.Provider>
    )
}

export const useReddits = () => {
    const redditsCtx = useContext(RedditContext);
    if (!redditsCtx) {
        throw new Error('Reddits cannot be loaded.');
    }
    return redditsCtx;
}
