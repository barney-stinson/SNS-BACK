import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem,Row,Col, Label,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm} from 'react-redux-form';

class Signup extends Component{

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
        };
    }

    handleSubmit(values) {
        this.props.postSignup(values.username, values.password,values.firstname, values.lastname, values.email, values.dateofbirth, values.bio, values.AAA, values.teacher);
    } 
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Sign Up</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row mt-5">
                    <h2>Create a new Account !</h2>
                </div>
                <hr></hr>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                            <Label htmlFor="username" md={2}>Username</Label>
                            <Col md={10}>
                                <Control.text model=".username" id="usrname" name="username"
                                    placeholder="Username"
                                    className="form-control"
                                        />
                            </Col>
                        </Row>
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
                            <Label htmlFor="password" md={2}>Password</Label>
                            <Col md={10}>
                                <Control.text model=".password" id="password" name="password"
                                    placeholder="Password"
                                    className="form-control"
                                        />
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
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".AAA" name="AAA"
                                                className="form-check-input"
                                                 /> {' '}
                                                <strong>AAA</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".teacher" name="teacher"
                                                className="form-check-input"
                                                 /> {' '}
                                                <strong>Teacher</strong>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="primary">
                                Sign up
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
            </div>
        );
    }
}
export default Signup;