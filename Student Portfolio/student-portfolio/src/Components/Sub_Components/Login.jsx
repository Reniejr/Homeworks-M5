import React, { PureComponent } from 'react'
import './Sub_Styles/Login.scss'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Login extends PureComponent {

    


    render() {
        let {stateLogin, showFunction, fillLoginFunction, loginBtn} = this.props
        return (
            <div 
            id='login'
            style={{
                width: stateLogin? '0px' : ''
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
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
                <Link to='/registration'>
                        Not register yet? Click me
                </Link>
            </div>
        )
    }
}
