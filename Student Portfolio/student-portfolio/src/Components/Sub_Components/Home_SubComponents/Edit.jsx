import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/Edit.scss'
import {Form, Button, Modal} from 'react-bootstrap'

export default class Edit extends PureComponent {
    url='http://localhost:5000/students'

    editFunc=(url, id, newObj)=>{
        this.props.editBtn(url, id, newObj)
        this.props.toggleModal()
    }

    deleteFunc=async(url, id)=>{
        this.props.delete(url, id)
    }

    render() {
        let {studentInfo, displayModal, fillUp, toggleModal}=this.props
        return (
               <Modal.Dialog style={{marginTop:displayModal?'-200%':''}}>
                    <Modal.Header closeButton onClick={toggleModal}>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form>
                    <Form.Group>
                        <Form.Label htmlFor='name'>Name</Form.Label>
                        <Form.Control 
                        required
                        id='name'
                        name='name'
                        type="text" 
                        placeholder="Enter Name" 
                        onChange={fillUp}
                        value={studentInfo.name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='surname'>Surname</Form.Label>
                        <Form.Control 
                        required
                        id='surname'
                        name='surname'
                        type="text" 
                        placeholder="Enter Surname" 
                        onChange={fillUp}
                        value={studentInfo.surname}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='Email'>Email</Form.Label>
                        <Form.Control 
                        required
                        id='email'
                        name='email'
                        type="email" 
                        placeholder="Enter Email" 
                        onChange={fillUp}
                        value={studentInfo.email}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='birth'>Birth</Form.Label>
                        <Form.Control 
                        required
                        id='birth'
                        name='birth'
                        type="date"
                        onChange={fillUp}
                        value={studentInfo.birth}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <Form.Control 
                        required
                        id='password'
                        name='password'
                        type="password"
                        onChange={fillUp}
                        value={studentInfo.password}
                        />
                    </Form.Group>
                        
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>this.deleteFunc(this.url, studentInfo.id)}>
                            Delete Me
                        </Button>
                        <Button variant="primary" onClick={()=>this.editFunc(this.url, studentInfo.id, studentInfo)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
        )
    }
}
