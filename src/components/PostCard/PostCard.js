import React from 'react';

import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

import { useReddits } from '../../providers/RedditProvider';
import { LoadingPlaceholder } from '../../shared/components';
import { daysAgo, getShortNumbers, decodeHtmlEntity } from '../../shared/utils';
import { ACTION_TYPE, FAKE_AUTH_INFO } from '../../constants';
import IconRedditLogo from '../../images/IconRedditLogo';

export default function PostCard({post}) {
    const { redditDispatch } = useReddits();
    const navigate = useNavigate();

    let mediaType = null;
    let mediaData;
    const medias = post?.preview?.images;
    let galleryItems = [];

    // Check for carousel -> Gif -> Map4 -> image
    if (post?.media_metadata?.length > 0) {
        mediaType = 'Carousel';
        for (let i in post.media_metadata) {
            if(post?.media_metadata[i]?.e === 'Image') {
                let mediaArr = post.media_metadata[i].p;
                galleryItems.push(mediaArr[mediaArr.length - 1].u);
            }
        }
    } else if (medias?.length > 0) {
        if (medias[0]?.variants?.gif) {
            mediaType = 'Image';
            mediaData = decodeHtmlEntity(medias[0].variants.gif.source?.url);
        } else if (medias[0]?.variants?.mp4) {
            mediaType = 'Image';
            mediaData = decodeHtmlEntity(medias[0].variants.mp4.source?.url);
        } else if(medias[0]?.source?.url) {
            mediaType = 'Image';
            mediaData = decodeHtmlEntity(medias[0].source?.url);
        }
    }

    function upVoteHandler() {
        redditDispatch({type: ACTION_TYPE.UP_VOTE, payload: {id: post.id}});
    }

    function downVoteHandler() {
        redditDispatch({type: ACTION_TYPE.DOWN_VOTE, payload: {id: post.id}});
    }

    function goToCommentsPage() {
        // Preselect the post to render the <Postcard /> on comments page.
        redditDispatch({
            type: ACTION_TYPE.SET_SELECTED_POST,
            payload: {
                id: post.id
            }
        });
        navigate(post.permalink);
    }
    
    return post?.id ? (
        <div className='PostCard'>
            <div className='PostHead'>
                {post.subreddit_name_prefixed && (
                    <div data-testid='post-avatar' className='PostAvatar'>
                        <IconRedditLogo />
                        <p className='PostSubRedditName'>{post.subreddit_name_prefixed}</p>
                    </div>
                )}
            </div>
            <div className='PostBody'>
                {post.title && <h3 data-testid='post-title' className={`PostTitle ${mediaType ? 'OmitText' : ''}`}>{post.title}</h3>}
                {mediaType==='Image' && (
                    <div data-testid='post-image' className='PostImageWrapper' style={{backgroundImage: `url(${decodeHtmlEntity(mediaData)})`}}>
                    </div>
                )}
                {!mediaType && post.selftext && <p className='PostSelfText'>{post.selftext}</p>}
                {galleryItems?.length > 0 && (
                    <div data-testid='post-carousel'>
                        <Carousel >
                            {galleryItems.map(gallery => (
                                <Carousel.Item>
                                    <img
                                        className="CaroselImg d-block w-100"
                                        src={decodeHtmlEntity(gallery)}
                                        alt="slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>First slide</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                )}
                {post.author && (
                    <p data-testid='post-author' className='PostAuthorName'>
                        By {post.author}{FAKE_AUTH_INFO.AUTHOR === post.author && '(You)'} · {daysAgo(post.created)}
                    </p>
                )}
            </div>
            <div className='PostFooter'>
                <div data-testid='post-vote' className='PostVote'>
                    <i onClick={upVoteHandler} className={`bi bi-arrow-up ${post.upVoted ? 'text-reddit' : ''}`}></i>
                    <span className={post.upVoted ? 'text-reddit' : ''}>{getShortNumbers(post.score)}</span>
                    <i onClick={downVoteHandler} className={`bi bi-arrow-down ${post.downVoted ? 'text-primary' : ''}`}></i>
                </div>
                <div data-testid='post-comments' className='PostComment'>
                    <i onClick={goToCommentsPage} className="bi bi-chat-left-dots text-muted"></i>
                    {getShortNumbers(post.num_comments)}
                </div>
                <div data-testid='post-share' className='PostShare'>
                    <i className="bi bi-share text-muted"></i> Share
                </div>
            </div>
        </div>
    ) : (
        <div className='PostCard'>
            <LoadingPlaceholder />
        </div>
    )
}
