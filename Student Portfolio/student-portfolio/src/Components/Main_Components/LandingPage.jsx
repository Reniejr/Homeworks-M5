import React, { PureComponent } from 'react'
import Login from '../Sub_Components/Login'
import './Main_Styles/LandingPage.scss'

export default class LandingPage extends PureComponent {
    url='http://localhost:5000/students'

    state={
        showLogin:true,
        login:{
            name:'',
            password:''
        },
        list:[]
    }

    getList = async ()=>{
        let response = await fetch(this.url)
        let result = await response.json()
        this.setState({list:result})
        console.log(result)
    }

    fillUpLogin = (e)=>{
        e.preventDefault()
        let loginInfo={...this.state.login}
        let currentId=e.currentTarget.id
        loginInfo[currentId]=e.currentTarget.value
        this.setState({login: loginInfo})
    }

    loginToHome = (e)=>{
        e.preventDefault()
        let response=this.state.list.filter(user=>user.name===this.state.login.name && user.password===this.state.login.password)
        console.log(response)
        response.length>0? window.location.assign(`/home/${response[0].id}`): console.log('error')
    }

    
    componentDidMount(){
        this.getList()
    }

    showLoginBtn(){this.setState({showLogin: !this.state.showLogin})}


    render() {
        return (
            <div id='landing-page'>
                <img src="https://i.ibb.co/TqjYLyt/bg.jpg" alt=""/>
                <div className="title">
                    <h1>Welcome to the new Coding School</h1>
                   
                </div>
                <div 
                className="loginBtn"
                style={{
                    display:this.state.showLogin? 'block' : 'none'
                }}
                >
                    <button onClick={()=>this.showLoginBtn()}>Login</button>
                </div>
                <Login
                stateLogin={this.state.showLogin}
                showFunction={this.showLoginBtn.bind(this)}
                fillLoginFunction={this.fillUpLogin}
                loginBtn={this.loginToHome}
                />
            </div>
        )
    }
}
