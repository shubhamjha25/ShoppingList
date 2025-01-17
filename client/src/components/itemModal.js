import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import  { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        // Adding Item via the addItem Action
        this.props.addItem(newItem);

        // Close The Modal
        this.toggle();
    }

    render(){
        return(
            <div>
                {
                    this.props.isAuthenticated ?
                        <Button
                            color="dark"
                            style={{marginBottom: '2rem'}}
                            onClick={this.toggle}
                        >
                            Add Item 
                        </Button>
                        : <h3>PLEASE LOGIN/REGISTER</h3>
                }

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item"></Label>
                                <Input
                                    type="text" name="name" id="item" placeholder="Add To Shopping List ..."
                                    onChange={this.onChange}
                                >
                                </Input>
                                <Button color="dark" style={{ marginTop: '2rem'}} block >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal);