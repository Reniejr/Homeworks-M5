import React, { PureComponent } from 'react'
import './Main_Styles/Home.scss'
import {Modal, Button, Form} from 'react-bootstrap'

export default class Home extends PureComponent {
    url='http://localhost:5000/students'

    state={
        list:[],
        info:{},
        studentInfo:{
            name:'',
            surname: '',
            email:'',
            birth:'',
            password:'',
            id:''
        },
        displayModal:true
    }

    getList = async ()=>{
        let response = await fetch(this.url)
        let result = await response.json()
        this.setState({list:result})
        console.log(result)
    }

    getInfo = async ()=>{
        let response = await fetch(this.url+`/${this.props.match.params.id}`)
        let result = await response.json()
        this.setState({info:result[0]})
        console.log(result)
    }

    deleteStudent = async (id)=>{
        let response = await fetch(this.url+`/${id}`,{
            method:'DELETE'
        })
        let result= await response.json()
        console.log(`Student with id = ${id} has been deleted`, result)
        this.getList()

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

    editBtn= async(e)=>{
        e.preventDefault()
        let response = await fetch(this.url+`/${this.state.studentInfo.id}`,{
            method:'PUT',
            body: JSON.stringify(this.state.studentInfo),
            headers: new Headers({
                "Content-type" : "application/json"
            })

        })
        let result =await response.json()
        this.setState({displayModal: !this.state.displayModal})
    }


    componentDidMount(){
        this.getList()
        this.getInfo()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.list !== this.state.list){}
    }

    render() {
        console.log(this.props)
        return (
            <div id='home'>
                <Modal.Dialog style={{display:this.state.displayModal?'none':'block'}}>
                    <Modal.Header closeButton onClick={()=>this.setState({displayModal: !this.state.displayModal})}>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form onSubmit={(e)=>this.editBtn(e)}>
                    <Form.Group>
                        <Form.Label htmlFor='name'>Name</Form.Label>
                        <Form.Control 
                        required
                        id='name'
                        name='name'
                        type="text" 
                        placeholder="Enter Name" 
                        onChange={this.fillUp}
                        value={this.state.studentInfo.name}
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
                        value={this.state.studentInfo.surname}
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
                        value={this.state.studentInfo.email}
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
                        value={this.state.studentInfo.birth}
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
                        value={this.state.studentInfo.password}
                        />
                    </Form.Group>
                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>
                    </Modal.Body>
                </Modal.Dialog>
                <div className="personal-info">
                    <h2>Personal Infos</h2>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Birth</th>
                            <th>Email</th>
                            <th>Id</th>
                        </tr>
                        <tr>
                            <td>{this.state.info.name}</td>
                            <td>{this.state.info.surname}</td>
                            <td>{this.state.info.birth}</td>
                            <td>{this.state.info.email}</td>
                            <td>{this.state.info.id}</td>
                        </tr>
                    </table>
                </div>
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
                                <button onClick={()=>this.deleteStudent(student.id)}>Delete</button>
                            </tr>

                            )
                        })}
                    </table>
                </div>
            </div>
        )
    }
}
