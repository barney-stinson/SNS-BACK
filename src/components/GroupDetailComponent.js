import React, {Component} from 'react';
import {Card, CardImg ,CardBody,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import GroupMembers from './GroupMembers';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class Messages extends Component{
    constructor(props){
        super(props);
    }
    render(){

        const mes = this.props.chat.map((message) => {
            return(
                <div classname="row">
                    <Card key={message._id}>
                        <CardBody>{message.message} by <strong>{message.user.username}</strong> on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(message.createdAt)))}</CardBody>
                    </Card>
                </div>
                
            );
        });


        return(
            <div>
                <h3>Messages</h3>
                <hr></hr>
                {mes}
            </div>
            
        );
    }
}
class AddMessage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <LocalForm className="mt-5">
                <Row className="form-group">
                    <Col md={{size:10, offset: 0}}>
                        <Control.text model=".newmessage" id="newmessage" name="newmessage"
                            placeholder="message"
                            className="form-control"
                        />
                    </Col>
                    <Col md={{size:2}}>
                        <Button type="submit" color="primary">
                        Send Message
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        );
    }
}

class GroupDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if (this.props.groupIsLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.groupErrMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.groupErrMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.props.groupchatIsLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.groupchatErrMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.groupchatErrMess}</h4>
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
                        <BreadcrumbItem><Link to="/groups">Groups</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.group.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <h1><span className="fa fa-users"></span> {this.props.group.name}</h1>
                </div>
                <div className="row">
                    <p>{this.props.group.description} </p>
                    
                </div>
                <div className="row mb-5">
                    <GroupMembers group={this.props.group}/>
                </div>
                <Messages chat={this.props.groupchat}/>
                <hr></hr>
                <AddMessage />
            </div>
        );
    }
}
export default GroupDetail;