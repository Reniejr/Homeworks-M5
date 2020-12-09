import React, { PureComponent } from 'react'
import './Sub_Styles/Login.scss'
import {Form, Button} from 'react-bootstrap'

export default class Login extends PureComponent {

    


    render() {
        let {stateLogin, showFunction, fillLoginFunction, loginBtn} = this.props
        return (
            <div 
            id='login'
            style={{
                marginLeft: stateLogin? '-200%' : ''
            }}
            >
                <button className='close' onClick={showFunction}>X</button>
                <Form onSubmit={(e)=>loginBtn(e)}>
                    <Form.Group>
                        <Form.Label htmlFor='name'>Name</Form.Label>
                        <Form.Control
                        required
                        id='name' 
                        type="text" 
                        placeholder="Name" 
                        onChange={(e)=>fillLoginFunction(e)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        required
                        id='password' 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e)=>fillLoginFunction(e)}
                        />
                    </Form.Group>
                    {/* <Form.Group >
                        <Form.Check 
                        id='staff'
                        type="checkbox" 
                        label="School Staff"/>
                    </Form.Group> */}
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
