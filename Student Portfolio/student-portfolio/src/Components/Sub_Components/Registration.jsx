import React, { PureComponent } from 'react'
import './Sub_Styles/Registration.scss'
import {Form, Button} from 'react-bootstrap'

export default class Registration extends PureComponent {
    url='http://localhost:5000/students'
    
    state={
        student:{
            name:'',
            surname: '',
            email:'',
            birth:''
        }
    }

    fillUp=(e)=>{
        let newStudent={...this.state.student}
        let currentId = e.currentTarget.id
        newStudent[currentId]=e.currentTarget.value
        this.setState({student: newStudent})
    }

    registerStudent = async (e)=>{
        e.preventDefault()
        let response = await fetch(this.url, {
            method:'POST',
            body:JSON.stringify(this.state.student),
            headers: new Headers({
                "Content-type":"application/json"
            })
        })
        let result = await response.json()
        console.log(result)
    }

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
                        <Form.Label htmlFor='birth'>Birth</Form.Label>
                        <Form.Control 
                        required
                        id='birth'
                        name='birth'
                        type="date"
                        onChange={this.fillUp}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <Form.Control 
                        required
                        id='password'
                        name='password'
                        type="password"
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
