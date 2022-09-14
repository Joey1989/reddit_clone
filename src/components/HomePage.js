import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { PostCard } from '.';
import ModalForm from './ModalForm';
import { LoadingPlaceholder } from '../shared/components';
import { useParams } from "react-router-dom";
import { useReddits } from '../providers/RedditProvider';
import { ACTION_TYPE } from '../constants';

export default function HomePage() {
    const { subreddit } = useParams();
    const { posts, redditDispatch } = useReddits();

    useEffect(() => {
        if (posts.length === 0) {
            fetch(`https://www.reddit.com/r/${subreddit}.json`).then(res => {
                if (res.status !== 200) return;

                res.json().then(data => {
                    redditDispatch({
                        type: ACTION_TYPE.FETCH_POSTS,
                        payload: {
                            data: data.data.children
                        }
                    });
                });
            })
        }
    }, [posts, subreddit, redditDispatch]);

    return (
        <div className='PageContainer'>
            <div className='PostContainer' >
                <Container fluid="sm">
                    <Row>
                        <Col sm={8}>
                            {posts.map(post => <PostCard 
                                key={post.data.id}
                                post={post.data}
                            />)}
                        </Col>
                        <Col sm={4} className='d-none d-sm-block'>
                            <LoadingPlaceholder />
                        </Col>
                    </Row>
                </Container>
            </div>
            <ModalForm subreddit={subreddit}/>
        </div>
    )
}
