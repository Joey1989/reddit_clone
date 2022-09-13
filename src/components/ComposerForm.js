import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { v4 as uuid } from 'uuid';
import { useReddits } from '../providers/RedditProvider'
import { ACTION_TYPE, FAKE_AUTH_INFO } from '../constants';

export default function ComposerForm({ replyToId, replyToAuthor }) {
    const { selectedComments, redditDispatch } = useReddits();
    const [ comment, setComment ] = useState('');
    let insertIndex = 0;

    function submitHandler(e) {
        e.preventDefault();
        let selectedCommentsCopy = [...selectedComments];

        selectedCommentsCopy.map((c, index) => {
            if (c.id === replyToId) insertIndex = index;
            return insertIndex;
        });

        const newComment = {
            id: uuid(),
            author: FAKE_AUTH_INFO.AUTHOR,
            content: comment,
            created: Date.now(),
            level: replyToId ? selectedCommentsCopy[insertIndex].level + 1 : 0
        };

        selectedCommentsCopy.splice(insertIndex + 1, 0, newComment)

        redditDispatch({
            type: ACTION_TYPE.GET_COMMENTS,
            payload: {
                comments: selectedCommentsCopy
            }
        });

        setComment('');
    }

    function fieldHandler(e) {
        setComment(e.target.value);
    }

    return (
        <div className='ComposerForm'>
            {replyToAuthor && (
                <span className='replyToAuthor'>Replying to: {replyToAuthor}</span>
            )}
            <Form onSubmit={submitHandler}>
                <Row className="align-items-center">
                    <Col xs={10} className="my-1">
                        <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                            Comment
                        </Form.Label>
                        <Form.Control value={comment} onChange={fieldHandler} id="inlineFormInputName" placeholder="Add a comment..." />
                    </Col>
                    <Col xs={1} className="my-1 px-0">
                        <Button type="submit"><i className="bi bi-send text-white"></i></Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
