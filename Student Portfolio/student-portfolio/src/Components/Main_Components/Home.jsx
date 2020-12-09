import React, { PureComponent } from 'react'
import Edit from '../Sub_Components/Home_SubComponents/Edit'
import './Main_Styles/Home.scss'
import {Row, Col, Container} from 'react-bootstrap'
import Jumbo from '../Sub_Components/Home_SubComponents/Jumbo'
import InfoBox from '../Sub_Components/Home_SubComponents/InfoBox'

export default class Home extends PureComponent {
    url='http://localhost:5000/students'

    state={
        list:[],
        info:{},
        studentInfo:{
            "name":"",
            "surname": "",
            "email":"",
            "birth":"",
            "password":"",
            "id":""
        },
        displayModal:true
    }

    fetchGet = async (url)=>{

        let response = await fetch(url)
        let result = await response.json()
        this.setState({list:result})
        console.log(result)
    }

    fetchGetSingle = async (url, id)=>{
        let response = await fetch(url+`/${id}`)
        let result = await response.json()
        this.setState({info:result[0]})
        console.log(result)
    }

    fetchPut = async (url, id, newObj) => {
        let response = await fetch(url+`/${id}`,{
            method:'PUT',
            body: JSON.stringify(newObj),
            headers: new Headers({
                "Content-Type" : "application/json"
            })

        })
        let result = await response.json();
        this.setState({studentInfo:result})
        console.log(result)
    }

    fetchDelete=async(url, id)=>{
        let response = await fetch(url+`/${id}`,{
            method:'DELETE'
        })
        let result= await response.json()
        console.log(`Student with id = ${id} has been deleted`, result)
        this.fetchGet(url)
    }

    deleteStudent =(url, id)=>{
        this.fetchDelete(url, id)
    }

    passInfo = (infos)=>{
        this.setState({studentInfo: infos, displayModal: !this.state.displayModal})
    }

    fillUp=(e)=>{
        let newStudent={...this.state.studentInfo}
        let currentId = e.currentTarget.id
        newStudent[currentId]=e.currentTarget.value
        this.setState({studentInfo: newStudent})
    }

    editBtn=async(url, id, newObj)=>{
        this.fetchPut(url, id, newObj)
    }

    toggleModal=()=>this.setState({displayModal: !this.state.displayModal})

    componentDidMount(){
        this.fetchGet(this.url)
        this.fetchGetSingle(this.url, this.props.match.params.id)
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(prevState.list !== this.state.list){
    //     }
    //     if(prevState.studentInfo !== this.state.studentInfo){
    //     }
    // }

    render() {
        return (
            <div id='home'>
                <Jumbo
                info={this.state.info}
                />
                
                <Row className='info-box'>
                    <InfoBox
                    info={this.state.info}
                    passInfo={this.passInfo}
                    />
                    <Container>
                        <h2>Skills</h2>
                        <Row>
                            <Col></Col>
                        </Row>
                    </Container>
                </Row>
                <Edit
                studentInfo={this.state.studentInfo}
                displayModal={this.state.displayModal}
                fillUp={this.fillUp}
                editBtn={this.editBtn}
                toggleModal={this.toggleModal}
                />
                
                <div className="others-info">
                    <h2>Other Infos</h2>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Birth</th>
                            <th>Email</th>
                            <th>Id</th>
                        </tr>
                        {this.state.list.filter(student=>student.id!==this.props.match.params.id).map((student, index)=>{
                            return(
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.surname}</td>
                                <td>{student.birth}</td>
                                <td>{student.email}</td>
                                <td>{student.id}</td>
                                <button onClick={()=>this.passInfo(student)}>Edit</button>
                                <button onClick={()=>this.deleteStudent(this.url, student.id)}>Delete</button>
                            </tr>

                            )
                        })}
                    </table>
                </div>
            </div>
        )
    }
}
