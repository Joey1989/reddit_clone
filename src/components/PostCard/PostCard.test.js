import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import { mockPost } from "../../shared/mocks";

import PostCard from './PostCard';
import { RedditContext } from '../../providers/RedditProvider';

const useReddits = jest.fn();

describe('<PostCard />', () => {
    function setup(post) {
        render(
            <Router>
                <RedditContext.Provider value={useReddits}>
                    <PostCard post={post} />
                </RedditContext.Provider>
            </Router>
        );
    }

    test('renders <PlaceHolder /> if post props is empty', () => {
        setup({});
    
        const placeHolderElement = screen.getByTestId('PlaceHolder');
        expect(placeHolderElement).toBeInTheDocument();
    });

    test("renders PostCard if post props is valid", () => {
        const post = {data: mockPost};
        setup(post.data);
    
        const avatarElement = screen.getByTestId('post-avatar');
        expect(avatarElement).toBeInTheDocument();
        expect(avatarElement).toHaveTextContent('r/memes');
    
        const titleElement = screen.getByTestId('post-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('RIP Queen Elizabeth II - A meme icon has sadly passed. Memes honouring her death will be allowed, but disrespectful memes will be removed.');
    
        const imageElement = screen.getByTestId('post-image');
        expect(imageElement).toBeInTheDocument();
        const postImageStyle = window.getComputedStyle(imageElement);
        expect(postImageStyle.backgroundImage).toBe('url(https://preview.redd.it/vbu5itkgcom91.jpg?auto=webp&s=23476c97e9888747f5dc99b5bb62aa3979a46d8c)');
    
        const authorElement = screen.getByTestId('post-author');
        expect(authorElement).toBeInTheDocument();
        expect(authorElement).toHaveTextContent('By elch3w · 5d');
    });

    test("renders vote score", () => {
        const post = {data: mockPost};
        setup(post.data);

        const voteElement = screen.getByTestId('post-vote');
        expect(voteElement).toBeInTheDocument();
        expect(voteElement).toHaveTextContent('888');
    });

    test("renders comments number", () => {
        const post = {data: mockPost};
        setup(post.data);

        const commentsElement = screen.getByTestId('post-comments');
        expect(commentsElement).toBeInTheDocument();
        expect(commentsElement).toHaveTextContent('1.4 K');
    });

    test("renders share section", () => {
        const post = {data: mockPost};
        setup(post.data);

        const shareElement = screen.getByTestId('post-share');
        expect(shareElement).toBeInTheDocument();
        expect(shareElement).toHaveTextContent('Share');
    });
});
