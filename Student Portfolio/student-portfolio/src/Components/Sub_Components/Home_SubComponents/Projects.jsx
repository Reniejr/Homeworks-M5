import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/Project.scss'
import {Row, Container, Table} from 'react-bootstrap'

export default class Projects extends PureComponent {
    // url=process.env.URL_STUDENTS

    url='http://localhost:5000/students'

    state={
        list:[],
    }

    fetchGet=async(url, id)=>{
        let response = await fetch(url+`/${id}/projects`)
        let result = await response.json()
        this.setState({list: result[0].projectList})
        console.log(result[0].projectList)
    }

    fetchPost=async(url, id)=>{}

    componentDidMount(){
        this.fetchGet(this.url, this.props.id)
    }




    render() {
        return (
            <Row id='projects'>
                <Container>
                    <header>
                        <h2>Personal Projects</h2>
                        <button><i className="fas fa-plus"></i>Add Project</button>
                    </header>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Project Github URL</th>
                            <th>Project Live URL</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map((project, index)=>{
                                return(
                                    <tr key={project.id}>
                                        <th>{(index +1)}</th>
                                        <th>{project.name}</th>
                                        <th>{project.repoURL}</th>
                                        <th>{project.liveURL}</th>
                                        <th></th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </Row>
        )
    }
}
