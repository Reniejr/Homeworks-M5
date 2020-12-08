import React, { PureComponent } from 'react'
import './Sub_Styles/Registration.scss'
import {Form, Button} from 'react-bootstrap'

export default class Registration extends PureComponent {
    render() {
        return (
            <div id='registration'>
                <Form onSubmit={this.registerStudent}>
                    <Form.Group>
                        <Form.Label htmlFor='name'>Name</Form.Label>
                        <Form.Control 
                        required
                        id='name'
                        name='name'
                        type="text" 
                        placeholder="Enter Name" 
                        onChange={this.fillUp}
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
                        onChange={this.fillUp}
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
                        onChange={this.fillUp}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='birth'>Name</Form.Label>
                        <Form.Control 
                        required
                        id='birth'
                        name='birth'
                        type="date"
                        onChange={this.fillUp}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        )
    }
}
