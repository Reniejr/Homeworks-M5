import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/Jumbo.scss'
import {Row, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Jumbo extends PureComponent {
    render() {
        let {info} = this.props
        return (
            <Row className='jumbo'>
                <Container>
                    <h1>{info.name} {info.surname}</h1>
                    <p>Role</p>
                    <button>
                        <Link to='/'>
                            Logout <i className="fas fa-sign-out-alt"></i>
                        </Link>
                    </button>
                </Container>
            </Row>
        )
    }
}
