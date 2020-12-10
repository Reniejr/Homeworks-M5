import React, { PureComponent } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import './Home_SubComponents_Styles/ProjectModal.scss'

export default class ProjectsModal extends PureComponent {

    toggleModal=()=>{this.props.toggleModal()}

    render() {
        let {projectState, fillUp, modalState, addProject}=this.props
        return (
            <Modal.Dialog
            style={{
                marginTop: modalState?'-100vh': ''
            }}
            >
                <Modal.Header closeButton onClick={()=>this.toggleModal()}>
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
                        placeholder="Project Title" 
                        onChange={fillUp}
                        value={projectState.name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='description'>Description</Form.Label>
                        <Form.Control 
                        required
                        id='description'
                        as='textarea' 
                        placeholder="Describe your project..."  
                        onChange={fillUp}
                        value={projectState.description}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='repoURL'>GitHub Repository Link</Form.Label>
                        <Form.Control 
                        required
                        id='repoURL'
                        type="text" 
                        placeholder="Link it with GitHub" 
                        onChange={fillUp} 
                        value={projectState.repoURL}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='liveURL'>Live Link</Form.Label>
                        <Form.Control 
                        required
                        id='liveURL'
                        type="text" 
                        placeholder="Is it online?..."  
                        onChange={fillUp}
                        value={projectState.liveURL}
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="button" onClick={addProject}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
