import React, { PureComponent } from 'react'

export default class Home extends PureComponent {
    url='http://localhost:5000/students'

    state={
        list:[],
        info:{}
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

    componentDidMount(){
        this.getList()
        this.getInfo()
        
    }

    render() {
        console.log(this.props)
        return (
            <div id='home'>
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
                            </tr>

                            )
                        })}
                    </table>
                </div>
            </div>
        )
    }
}