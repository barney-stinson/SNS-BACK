import React, {Component} from 'react';

import {Card, CardImg ,CardBody,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';

import ImageUploader from 'react-images-upload';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderProfile({user}){
    return(
        <div>
            <div className="row">
                <div className="col-12 col-md-6 offset-md-4 mb-3">
                    <h1><span className="fa fa-user"></span>   Your Profile</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-3 offset-md-1">
                    <Card>
                        <CardImg top src={user.image} alt={user.firstname} />
                    </Card>
                </div>
                <div className="col-12 col-md-7">
                    <Card>
                        <CardBody>
                            <div className="row">
                                <div className="col-12 col-md-4"><h4>Name:</h4></div>
                                <div className="col-12 col-md-8"><h4>{user.firstname} {user.lastname}</h4></div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-12 col-md-4"><h4>UserName:</h4></div>
                                <div className="col-12 col-md-8"><h4>{user.username} </h4></div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-12 col-md-4"><h4>Date of Birth:</h4></div>
                                <div className="col-12 col-md-8"><h4>{user.dateofbirth} </h4></div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-12 col-md-4"><h4>Bio:</h4></div>
                                <div className="col-12 col-md-8"><h4>{user.bio} </h4></div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
class ProfileForm extends Component{

    constructor(props) {
        super(props);
         this.state = { 
             pictures: [] 
            };
         this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-12 col-md-6 mt-5 mb-3">
                        <hr></hr>
                        <h1>Update your profile</h1>
                    </div>
                </div>
                <ImageUploader
                    withIcon={true}
                    buttonText='Upload Profile Picture'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <div className="row">
                    <div className="col-12 col-md-8">
                        <LocalForm>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                            />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                            />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="dateofbirth" md={2}>Date of birth</Label>
                                <Col md={10}>
                                    <Control.text model=".dateofbirth" id="dateofbirth" name="dateofbirth"
                                        placeholder="dd/mm/yyyy"
                                        className="form-control"
                                            />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="bio" md={2}>Your Bio</Label>
                                <Col md={10}>
                                    <Control.textarea model=".bio" id="bio" name="bio"
                                        rows="2"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Update Profile
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>


            </div>
        );
    }

}

function Profile(props){
    if (props.users.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.users.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.users.errMess}</h4>
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
                        <BreadcrumbItem active>Your Profile</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <RenderProfile user={props.users.users.filter((user) => user._id === "5eac095b9b7ef840902b93fb")[0]} />

                <LocalForm className="mt-5">
                    <Row className="form-group">
                        <Label htmlFor="firstname" md={{size:2, offset: 2}}>Search other Users</Label>
                        <Col md={6}>
                            <Control.text model=".search" id="search" name="search"
                                placeholder="enter username"
                                className="form-control"
                            />
                        </Col>
                        <Col md={{size:2}}>
                            <Button type="submit" color="primary">
                            Search
                            </Button>
                        </Col>
                    </Row>
                    <Row className="form-group">

                    </Row>
                </LocalForm>

                <ProfileForm />


            </div>
        );
}
export default Profile;
