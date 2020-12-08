import React, { PureComponent } from 'react'
import './Main_Styles/LandingPage.scss'

export default class LandingPage extends PureComponent {
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

    getList = async ()=>{
        let response = await fetch(this.url)
        let result = await response.json()
        console.log(result)
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

    componentDidMount(){
        this.getList()
    }


    render() {
        return (
            <div id='landing-page'>
                <img src="https://i.ibb.co/TqjYLyt/bg.jpg" alt=""/>
            </div>
        )
    }
}
