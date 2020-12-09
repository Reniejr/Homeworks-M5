import React, { PureComponent } from 'react'
import './Sub_Styles/Registration.scss'
import {Form, Button, Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Registration extends PureComponent {
    url='http://localhost:5000/students'
    
    state={
        student:{
            name:'',
            surname: '',
            email:'',
            birth:''
        },
        list:[],
        alert:true
    }

    getList = async ()=>{
        let response = await fetch(this.url)
        let result = await response.json()
        this.setState({list:result})
        console.log(result)
    }

    fillUp=(e)=>{
        let newStudent={...this.state.student}
        let currentId = e.currentTarget.id
        newStudent[currentId]=e.currentTarget.value
        this.setState({student: newStudent})
    }

    postStudent=async()=>{
        let response = await fetch(this.url, {
            method:'POST',
            body:JSON.stringify(this.state.student),
            headers: new Headers({
                "Content-type":"application/json"
            })
        })
        let result = await response.json()
        console.log(result)
        let id = result.id
        window.location.assign(`/home/${id}`)
    }

    registerStudent = (e)=>{
        e.preventDefault()
        let filtered= this.state.list.filter(student=>student.email===this.state.student.email)
        console.log(filtered)
        filtered.length>0? this.setState({alert: false}) : this.postStudent()
    }

    componentDidMount(){
        this.getList()
    }

    render() {
        return (
            <div id='registration'>
                <div className="registration-form">
                <Alert 
                variant='danger'
                style={{
                    display: this.state.alert?'none':'block'
                }}
                >Another Student has registered with same email
                </Alert>
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
                    <Form.Group>
                        <Form.Check 
                        id='staff'
                        type="checkbox" 
                        label="School Staff" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                </div>
                
            </div>
        )
    }
}
