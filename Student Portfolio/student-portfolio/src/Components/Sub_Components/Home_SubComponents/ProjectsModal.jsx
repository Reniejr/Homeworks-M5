import React, { PureComponent } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

export default class ProjectsModal extends PureComponent {
    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor='name'>Project Title</Form.Label>
                        <Form.Control 
                        required
                        id='name'
                        type="text" 
                        placeholder="Project Title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='description'>Description</Form.Label>
                        <Form.Control 
                        required
                        id='description'
                        as='textarea' 
                        placeholder="Describe your project..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='repoURL'>GitHub Repository Link</Form.Label>
                        <Form.Control 
                        required
                        id='repoURL'
                        type="text" 
                        placeholder="Link it with GitHub" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='liveURL'>Live Link</Form.Label>
                        <Form.Control 
                        required
                        id='liveURL'
                        type="text" 
                        placeholder="Is it online?..." />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
