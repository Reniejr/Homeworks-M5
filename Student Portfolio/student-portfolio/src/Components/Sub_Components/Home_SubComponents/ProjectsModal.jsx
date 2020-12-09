import React, { PureComponent } from 'react'
import {Modal, Button} from 'react-bootstrap'

export default class ProjectsModal extends PureComponent {
    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
