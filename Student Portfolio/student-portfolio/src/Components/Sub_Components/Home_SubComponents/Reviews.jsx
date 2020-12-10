import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/Reviews.scss'
import {Row, Col} from 'react-bootstrap'

export default class Reviews extends PureComponent {
    url='http://localhost:5000/reviews/'

    state={
        list:[]
    }

    fetchGet=async(url, id)=>{
        let response = await fetch(url+id)
        let result = await response.json()
        if(result[0]){
            this.setState({list: result[0].reviews})
        }
        else{
            this.setState({list:[]})
        }
        console.log(result)
    }

    componentDidMount(){
        this.fetchGet(this.url, this.props.id)
    }


    render() {
        let {showState, index}=this.props
        return (
            <Row 
            id='reviews'
            style={{
                height: showState.includes(index)? '': '0px'
            }}
            
            >
                <div className="reviews-container">
                    {this.state.list.map(review=>{
                        return(
                            <Col xs={3} className="slider-review">
                                <div className="reviewer">
                                    <img src="" alt=""/>
                                    <p>{review.reviewer}</p>
                                </div>
                                <div className="message">
                                    <p>{review.name}</p>
                                    <p>{review.text}</p>
                                </div>
                                <p>Posted At:</p>
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.createdAt.substring(11, 19)}</p>
                            </Col>
                        )
                    })}
                </div>
            </Row>
        )
    }
}
