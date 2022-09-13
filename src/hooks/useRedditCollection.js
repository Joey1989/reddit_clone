import { useReducer } from 'react';
import { ACTION_TYPE } from '../constants';

export default function useRedditCollection() {
    const redditReducer = (state, action) => {
        let newPosts;
        let newSelectedPost;
        switch(action.type) {
            case ACTION_TYPE.FETCH_POSTS:
                return {...state, posts: action.payload.data}
            case ACTION_TYPE.GET_COMMENTS:
                return {...state, selectedComments: action.payload.comments};
            case ACTION_TYPE.SET_SELECTED_POST:
                newPosts = state.posts.filter(post => post.data.id === action.payload.id);
                return {...state, selectedPost: newPosts[0]};
            case ACTION_TYPE.UP_VOTE:
                newPosts = state.posts.map(post => {
                    if(post.data.id === action.payload.id) {
                        if (post.data.upVoted) {
                            newSelectedPost = {data:{...post.data, upVoted: false, score: post.data.score - 1}}
                        } else if (post.data.downVoted) {
                            newSelectedPost = {data:{...post.data, upVoted: true, downVoted: false, score: post.data.score + 2}}
                        } else {
                            newSelectedPost = {data:{...post.data, upVoted: true, downVoted: false, score: post.data.score + 1}};
                        }
                        return {...newSelectedPost};
                    } else return post;
                });
                return {...state, posts: newPosts, selectedPost: newSelectedPost};
            case ACTION_TYPE.DOWN_VOTE:
                newPosts = state.posts.map(post => {
                    if(post.data.id === action.payload.id) {
                        if (post.data.downVoted) {
                            return {data:{...post.data, downVoted: false, score: post.data.score + 1}};
                        } else if (post.data.upVoted) {
                            return {data:{...post.data, upVoted: false, downVoted: true, score: post.data.score - 2}};
                        } else {
                            return {data:{...post.data, upVoted: false, downVoted: true, score: post.data.score - 1}};
                        }
                    } else return post;
                });
                return {...state, posts: newPosts};
            case ACTION_TYPE.CREATE_POST:
                return {...state, posts: [action.payload.post, ...state.posts]};
            default:
                return {...state};
        }
    }

    const [state, dispatch] = useReducer(redditReducer, {
        posts: [],
        selectedPosts: {},
        selectedComments: []
    });

    return [state, dispatch];
}
