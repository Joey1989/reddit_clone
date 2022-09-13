import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useReddits } from '../providers/RedditProvider';
import { ACTION_TYPE, FAKE_AUTH_INFO } from '../constants';

export default function ModalForm({ subreddit }) {
  const { redditDispatch } = useReddits();
  const [ show, setShow ] = useState(false);
  const [ title, setTitle ] = useState(''); 
  const [ description, setDescription ] = useState(''); 
  const [ imageUrl, setImageUrl ] = useState('');

  const handleClose = () => setShow(false);

  const handlePublish = () => {
    if (title.length > 0) setShow(false);
  }

  // Clear the input fields when modal is opened
  const handleShow = () => {
    setShow(true);
    setTitle('');
    setDescription('');
    setImageUrl('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (title.length > 0) {
      let newPost = {
        data: {
          id: uuid(),
          author: FAKE_AUTH_INFO.AUTHOR,
          title: title,
          selftext: description,
          subreddit_name_prefixed: `r/${subreddit}`,
          score: 0,
          num_comments: 0,
          preview: {
            images: [
              {
                source: {
                  url: imageUrl
                }
              }
            ]
          }
        }
      }
      
      redditDispatch({
        type: ACTION_TYPE.CREATE_POST,
        payload: {
            post: newPost
        }
      });

      setTitle('');
      setDescription('');
      setImageUrl('');
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className='btn-circle btn-xl btn-modal-trigger'>
        <i className="bi bi-plus-lg text-white"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="modalForm.ControlInput1">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add a title"
                value={title}
                onChange={e => {setTitle(e.target.value)}}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="modalForm.ControlTextarea1"
            >
              <Form.Label>Post Text(optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add body text"
                value={description}
                onChange={e => {setDescription(e.target.value)}}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalForm.ControlInput2">
              <Form.Label>Image URL(optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add image url"
                value={imageUrl}
                onChange={e => {setImageUrl(e.target.value)}}
                autoFocus
              />
            </Form.Group>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="btn-reddit" type="submit" variant="primary" onClick={handlePublish}>
              Publish
            </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
