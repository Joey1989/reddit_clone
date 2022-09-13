import React from 'react';
import { daysAgo } from '../shared/utils';
import { FAKE_AUTH_INFO } from '../constants';

import IconRedditLogo from '../images/IconRedditLogo';

export default function CommentCard({comment, active, replyClickHandler}) {
    const styles = {
        width: `calc(100% - ${comment.level * 15}px)`,
        marginTop: comment.level === 0 ? '1rem' : ''
    };

    return (
        <div
            className={`CommentCard ${active ? 'Active': ''}`}
            style={styles}
            onClick={() => replyClickHandler(comment.id, comment.author)}
        >
            <div className='PostAvatar' >
                <IconRedditLogo />
                <p className='CommentHeader'>
                    {comment.author}
                    {FAKE_AUTH_INFO.AUTHOR === comment.author && '(You)'} · {daysAgo(comment.created)}
                </p>
            </div>
            <p className="CommentContent">{comment.content}</p>
            <p className="CommentReply text-reddit">
                Reply
            </p>
        </div>
    )
}
