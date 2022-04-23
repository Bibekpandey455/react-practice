/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });        
    }

    handleComment(event) {
        this.toggleModal();
        alert("Rating: " + this.rating.value + " Your Name: " + this.name.value +
        " Feedback: " + this.message.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className='container'>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-12'>
                                <LocalForm onSubmit={this.handleComment}>
                                    <Row className='form-group'>
                                        <Label htmlFor='rating' md={2} >Rating</Label>
                                    </Row>
                                    <Row className='form-group'>
                                        <Col md={{size: 12}}>
                                            <Control.select model='.rating' name='rating'
                                                className='form-control'>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className='form-group'>
                                        <Label htmlFor='name' md={2}>Your Name</Label>
                                    </Row>
                                    <Row className='form-group'>
                                        <Col md={12}>
                                            <Control.text model='.name' id='name' name='name'
                                                placeholder='Your Name'
                                                className='form-control' 
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".name"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    
                                    <Row className='form-group'>
                                        <Label htmlFor='message' md={2}>Your Feedback</Label>
                                    </Row>
                                    <Row className='form-group'>
                                        <Col md={12}>
                                            <Control.textarea model='.message' id='message' name='message'
                                                rows='5'
                                                className='form-control' />
                                        </Col>
                                    </Row>
                                    <Row className='form-group'>
                                        <Col md={{size: 10}}>
                                            <Button type='submit' color='primary'>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>

                                </LocalForm>
                            </div>
                        </div>
                    </ModalBody>
                    
                </Modal>
            </div>
        );
    }
}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments}) {
    const comment = comments.map((comment) => {
        return (
            <li>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        )
    });

    if (comments != null) {
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comment}
                    <Comment />
                </ul>
            </div>
        );
    } else {
        return(<div></div>);
    }
}

const DishDetail = (props) => {
    
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments = {props.comments} />
                    </div>
                </div>
            </div>
        );
    } else {
        return(<div></div>);
    }
    
}


export default DishDetail;


   
   
   /*

   function RenderDish(dish) {
        if (dish != null)
            return (
                <Card className="col-12 col-md-5 m-1">
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }
   function RenderComments(array, addComment, dishId) {
        if (array.length !== 0) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {array.map(comment => (
                        <ul className="list-unstyled">
                            <li>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        </ul>
                    )
                    )}
                </div>
            );
        }
        else {
            return (
                <div></div>
            );

        }
    }
    const DishDetail=(props)=> {
        console.log('DishDetail component  render is invoked');
        let dish;
        if (props.selectedDish) {
            dish = (
                <div className="row">
                    <RenderDish dish={props.selectedDish} />
                    <RenderComments comments= {props.selectedDish.comments} />
                </div>
            )
        } else {
            // eslint-disable-next-line no-unused-vars
            dish= ( <div></div> )
        }
        return (
           <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
                    </div>
                </div>
                </div>
            );
            
    }





export default DishDetail;
*/