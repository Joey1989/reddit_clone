import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useReddits } from '../providers/RedditProvider';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PostCard from './PostCard';
import CommentsSection from './CommentsSection';
import GoBackLink from './GoBackLink';
import { ACTION_TYPE } from '../constants';

export default function CommentsPage() {
    const { posts, selectedPost, selectedComments, redditDispatch } = useReddits();
    const { subreddit, id, title } = useParams();
    const [ commentsLoading, setCommentsLoading ] = useState(false);

    // Fetch posts & post data and save in state
    useEffect(() => {
        if (posts.length === 0) {
            fetch(`https://www.reddit.com/r/${subreddit}.json`).then(res => {
                if (res.status !== 200) {
                    console.log('error');
                    return;
                }

                res.json().then(data => {
                    redditDispatch({
                        type: ACTION_TYPE.FETCH_POSTS,
                        payload: {
                            data: data.data.children
                        }
                    });
                });
            });
        }

        if (posts.length > 0) {
            fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/${title}.json`).then(res => {
                if (res.status !== 200) {
                    console.log('error');
                    return;
                }

                res.json().then(data => {
                    redditDispatch({
                        type: ACTION_TYPE.SET_SELECTED_POST,
                        payload: {
                            id: data[0].data.children[0].data.id,
                        }
                    });
                });
            });
        }
    }, [posts, subreddit, id, title, redditDispatch]);

    // Fetch comments for the current post and save to state
    useEffect(() => {
        setCommentsLoading(true);
        fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/${title}.json`).then(res => {
            if (res.status !== 200) {
                console.log('error');
                return;
            }

            res.json().then(data => {
                const commentsArr = data[1].data.children;
                const comments = generateCommentsArr([...commentsArr])
                redditDispatch({
                    type: ACTION_TYPE.GET_COMMENTS,
                    payload: {
                        comments: comments
                    }
                });
                setCommentsLoading(false);
            });
        });
    }, [subreddit, id, title, redditDispatch]);

    return (
        <div className='PageContainer'>
            <Container fluid="sm">
                <Row>
                    <Col sm={12}>
                        <GoBackLink destination={`/r/${subreddit}`} url={`/r/${subreddit}`} />
                        <PostCard post={selectedPost?.data} />
                        <CommentsSection comments={selectedComments} isLoading={commentsLoading}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const generateCommentsArr = (comments) => {
    let output = [];
    for (let i in comments) {
        dfs(comments[i].data, output, 0);
    }
    return output;
};

// Since the comments response object has a tree shape,
// doing a preorder traversal can generate the
// comments array in correct order.
function dfs(root, commentsArr, level) {
    if (root == null) return;
    if (root.body) {
        commentsArr.push({
            id: root.id,
            author: root.author,
            content: root.body,
            created: root.created,
            level: level
        });
    }

    for(let i in root.replies?.data?.children) {
        dfs(root.replies?.data?.children[i]?.data, commentsArr, level + 1);
    }
}
