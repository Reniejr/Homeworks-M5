import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/InfoBox.scss'
import {Row, Col, Container} from 'react-bootstrap'

export default class InfoBox extends PureComponent {

    passInfo = (infos)=>{
        this.props.passInfo(infos)
    }

    render() {
        let {info}=this.props
        return (
            <Container>
                <h2>About Me</h2>
                <button  onClick={()=>this.passInfo(info)}>
                    <i className="far fa-edit"></i>
                </button>
                <Row>
                    <Col xs={12} md={3}>
                        <ul>
                            <li><span>Birth</span>{info.birth}</li>
                            <li><span>E-mail</span>{info.email}</li>
                            <li><span>Id</span>{info.id}</li>
                        </ul>
                    </Col>
                    <Col xs={12} md={9}>
                        <Row>
                            <Col xs={2}>
                                <img src="" alt=""/>
                            </Col>
                            <Col xs={10}>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis ex mollitia deserunt vero et, eum repellat atque rem. Tempore ab ex quia praesentium amet! Obcaecati neque culpa, aperiam ullam laborum voluptas ea accusantium debitis nisi itaque dignissimos quidem, hic iste autem incidunt at ducimus necessitatibus, architecto a optio ut!</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}
