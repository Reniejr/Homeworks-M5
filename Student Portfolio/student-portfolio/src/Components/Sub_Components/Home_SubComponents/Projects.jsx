import React, { PureComponent } from 'react'
import './Home_SubComponents_Styles/Project.scss'
import {Row, Container, Col} from 'react-bootstrap'
import ProjectsModal from './ProjectsModal'
import Reviews from './Reviews'

export default class Projects extends PureComponent {
    // url=process.env.URL_STUDENTS

    url='http://localhost:5000/students'

    state={
        list:[],
        showDescList:[],
        project:{
            name:'',
            description:'',
            repoURL:'',
            liveURL:''
        },
        showModal:true
    }

    fetchGet=async(url, id)=>{
        let response = await fetch(url+`/${id}/projects`)
        let result = await response.json()
        if(result[0]){
            this.setState({list: result[0].projectList})
        }else{
            this.setState({list:[]})
        }
    }

    fetchPost=async(url, id, newObj)=>{
        let response = await fetch(url+`/${id}/projects`, {
            method:'POST',
            body:JSON.stringify(newObj),
            headers: new Headers({
                "content-type" : "application/json"
            })
        })
        let result = await response.json()
        console.log(result)
        this.fetchGet(url, id)
    }

    createProject = ()=>{
        this.fetchPost(this.url, this.props.id, this.state.project)
        this.toggleModal()
    }

    showDesc=(index)=>{
        this.setState({showDescList: [...this.state.showDescList, index]})
        
    }

    closeDesc=(index)=>{
        let close= this.state.showDescList.filter(descBox=> descBox !== index)
        this.setState({showDescList: close})
        
    }

    fillUp=(e)=>{
        let newProject = {...this.state.project}
        let currentId = e.currentTarget.id
        newProject[currentId]= e.currentTarget.value
        this.setState({project: newProject})
    }

    toggleModal=()=>{
        this.setState({showModal: !this.state.showModal})
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
                modalState={this.state.showModal}
                toggleModal={this.toggleModal}
                addProject={this.createProject}
                />
                <Container>
                    <header>
                        <h2>Personal Projects</h2>
                        <button onClick={()=>this.toggleModal()}><i className="fas fa-plus"></i>Add Project</button>
                    </header>
                    <Row className='headers'>
                        <Col xs={1}>#</Col>
                        <Col xs={3}>Project Name</Col>
                        <Col xs={3}>Created</Col>
                        <Col xs={3}>Updated</Col>
                        <Col xs={2}></Col>
                    </Row>
                    {this.state.list.map((project, index)=>{
                        let modifiedDate,modifiedTime;
                        if(project.modifiedAt){
                            modifiedDate=project.modifiedAt.substring(0, 10)
                            modifiedTime=project.modifiedAt.substring(11, 19)
                        }
                        return(
                            <div key={index}>
                                <Row className='project'>
                                    <Col xs={1}>{index}</Col>
                                    <Col xs={3}>
                                        <p>{project.name}</p>
                                        <p className='project-id'>{project.id}</p>  
                                    </Col>
                                    <Col xs={3}>
                                        <p>Date: {project.createdAt.substring(0, 10)}</p>
                                        <p>Time: {project.createdAt.substring(11, 19)}</p>
                                    </Col>
                                    <Col xs={3}>
                                        <p>Date: {modifiedDate}</p>
                                        <p>Time: {modifiedTime}</p>
                                    </Col>
                                    <Col xs={2}><button onClick={()=>this.showDesc(index)}>Show</button></Col>
                                </Row>
                                <Row 
                                className='project-info'
                                style={{
                                    height: this.state.showDescList.includes(index)? '': '0px'
                                }}
                                >
                                    <div className='info'>
                                        <button onClick={()=>this.closeDesc(index)}>x</button>
                                        <p><span>Description : </span>{project.description}</p>
                                        <p><span>Project Github URL : </span>{project.repoURL}</p>
                                        <p><span>Project Live URL : </span>{project.liveURL}</p>
                                    </div>
                                </Row>
                                <Reviews id={project.id} showState={this.state.showDescList} index={index}/>
                            </div>
                        )
                    })}
                </Container>
            </Row>
        )
    }
}
