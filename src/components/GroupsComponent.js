import React, {Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderGroups({groups}){
    const gro = groups.map((group) => {
        return(<div>
            <div key={group._id} className="row">
                <Link to={`/groups/${group._id}`}>
                    <Card className="col-12 mb-5">
                        <CardTitle><h3>{group.name}</h3>
                        <p>{group.description}</p>
                        </CardTitle>
                        <CardBody>
                        
                            
                        </CardBody>
                    </Card>
                </Link>
            </div>
        </div>
        );
    });
    return(
        <div>{gro}</div>
    );
}

class Groups extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if (this.props.groups.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.groups.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.groups.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Groups</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row mb-5 mt-3">
                    <h1><span className="fa fa-users"></span> Groups</h1>
                </div>
                <RenderGroups groups={this.props.groups.groups} />
                
            </div>
        );
    }
}
export default Groups;