import React,{Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';

class GroupMembers extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    render(){

        const mem = this.props.group.users.map((user) => {
            return(
                <div className="container">
                    <div className="row" key={user._id}>
                        {user.username}
                    </div>
                </div>
            );
        });

        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-user"></span> members</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.group.name} members</ModalHeader>
                    <ModalBody>
                        {mem}
                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}
// function GroupMembers(props){
//     return(
//         <div>
//             {props.group.name}
//         </div>
//     );
// }
export default GroupMembers;