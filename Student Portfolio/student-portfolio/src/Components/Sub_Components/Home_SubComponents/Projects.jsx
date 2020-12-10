import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/Project.scss'
import {Row, Container, Table} from 'react-bootstrap'
import ProjectsModal from './ProjectsModal'

export default class Projects extends PureComponent {
    // url=process.env.URL_STUDENTS

    url='http://localhost:5000/students'

    state={
        list:[],
        showDesc: [],
        showDescList:[],
        project:{
            name:'',
            description:'',
            repoURL:'',
            liveURL:''
        }
    }

    fetchGet=async(url, id)=>{
        let response = await fetch(url+`/${id}/projects`)
        let result = await response.json()
        this.setState({list: result[0].projectList})
        console.log(result[0].projectList)
    }

    fetchPost=async(url, id)=>{
    }

    showDesc=(index)=>{
        this.setState({showDescList: [...this.state.showDescList, index]})
        setTimeout(()=>{
            this.setState({showDesc: [...this.state.showDesc, index]})
        }, 500)
    }

    closeDesc=(index)=>{
        let filtered = this.state.showDescList.filter(descBox=> descBox !== index)
        let close= this.state.showDesc.filter(descBox=> descBox !== index)
        this.setState({showDesc: close})
        setTimeout(()=>{
            this.setState({showDescList: filtered})
        }, 500)
    }

    fillUp=(e)=>{
        let newProject = {...this.state.project}
        let currentId = e.currentTarget.id
        newProject[currentId]= e.currentTarget.value
        this.setState({project: newProject})
    }

    componentDidMount(){
        this.fetchGet(this.url, this.props.id)
    }




    render() {
        return (
            <Row id='projects'>
                <ProjectsModal
                projectState={this.state.project}
                fillUp={this.fillUp}
                />
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
                                let modifiedDate,modifiedTime;
                                if(project.modifiedAt){
                                    modifiedDate=project.modifiedAt.substring(0, 10)
                                    modifiedTime=project.modifiedAt.substring(11, 19)
                                }
                                return(
                                    <>
                                        <tr key={project.id}>
                                            <td>{(index +1)}</td>
                                            <td>{project.name}</td>
                                            <td>
                                                <p>Date: {project.createdAt.substring(0, 10)}</p>
                                                <p>Time: {project.createdAt.substring(11, 19)}</p>
                                            </td>
                                            <td>
                                                <p>Date: {modifiedDate}</p>
                                                <p>Time: {modifiedTime}</p>
                                            </td>
                                            <td><button onClick={()=>this.showDesc(index)}>Show</button></td>
                                        </tr>
                                        <div 
                                        className='description'
                                        style={{
                                            display: this.state.showDescList.includes(index)?'block':'none',
                                            maxHeight: this.state.showDesc? '': '0px'
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
