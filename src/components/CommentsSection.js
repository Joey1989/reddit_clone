import React, { useState } from 'react';
import CommentCard from './CommentCard';
import ComposerForm from './ComposerForm';
import {LoadingPlaceholder} from '../shared/components';

export default function CommentsSection({comments, isLoading}) {
    const [ replyToId, setReplyToId ] = useState(null);
    const [ replyToAuthor, setReplyToAuthor ] = useState(null);

    function replyClickHandler(id, author) {
        setReplyToId(id);
        setReplyToAuthor(author);
    }

    return comments.length && !isLoading ? (
        <div className='CommentsSection'>
            <h3>Best Comments</h3>
            <ComposerForm replyToId={replyToId} replyToAuthor={replyToAuthor} />
            {comments.map(comment =>
                <CommentCard
                    key={comment.id}
                    comment={comment}
                    replyClickHandler={replyClickHandler}
                    active={comment.id === replyToId}
                />)}
        </div>
    ) : (
        <div className='CommentsSection'>
            <LoadingPlaceholder />
        </div>
    );
}
