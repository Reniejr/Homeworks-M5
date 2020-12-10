import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/Project.scss'
import {Row, Container, Table} from 'react-bootstrap'

export default class Projects extends PureComponent {
    // url=process.env.URL_STUDENTS

    url='http://localhost:5000/students'

    state={
        list:[],
        showDesc: null,
        showDescList:[]
    }

    fetchGet=async(url, id)=>{
        let response = await fetch(url+`/${id}/projects`)
        let result = await response.json()
        this.setState({list: result[0].projectList})
        console.log(result[0].projectList)
    }

    fetchPost=async(url, id)=>{}

    showDesc=(index)=>{
        this.setState({showDescList: [...this.state.showDescList, index]})
    }

    closeDesc=(index)=>{
        let filtered = this.state.showDescList.filter(descBox=> descBox !== index)
        this.setState({showDescList: filtered})
    }

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
                            <th>Created</th>
                            <th>Updated</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map((project, index)=>{
                                return(
                                    <>
                                        <tr key={project.id}>
                                            <td>{(index +1)}</td>
                                            <td>{project.name}</td>
                                            <td>{project.createdAt}</td>
                                            <td>{project.modifiedAt}</td>
                                            <td><button onClick={()=>this.showDesc(index)}>Show</button></td>
                                        </tr>
                                        <div 
                                        className='description'
                                        style={{
                                            display: this.state.showDescList.includes(index)?'block':'none'
                                        }}
                                        >
                                            <button onClick={()=>this.closeDesc(index)}>x</button>
                                            <p><span>Description : </span>{project.description}</p>
                                            <p><span>Project Github URL : </span>{project.repoURL}</p>
                                            <p><span>Project Live URL : </span>{project.liveURL}</p>

                                        </div>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </Row>
        )
    }
}
