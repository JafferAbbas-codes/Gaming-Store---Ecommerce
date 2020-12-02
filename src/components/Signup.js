import React, { Component } from 'react';
import {
  Button, 
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {connect} from 'react-redux';
import { register } from '../redux/authActions';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types"

class Signup extends Component {
  
 state={
   modal: false,
   username:"",
   email:"",
   password:"",
   redirect: false,
 }
  
 toggle = () => {
  this.setState({
    modal: !this.state.modal,
  });
};

onChange = (name) => (e) => {
  const value = name === "image" ? e.target.files[0] : e.target.value;
  this.setState({ [name]: value });
};

onSubmit = (e) => {
  e.preventDefault();

  const newUser = {
    username: this.state.username, 
    email: this.state.email, 
    password: this.state.password
  }
  console.log(newUser);
  this.props.register(newUser);
  this.toggle();
  this.setState({redirect: true})
  
};

  render(){
    if(this.state.redirect){
      return(
      <Redirect to={"/products"}/>
      )
    }
      return (
    <div>
      <Button  outline onClick={this.toggle}>
        Register
      </Button>

      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Register</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
            <Label for="username">Username</Label>
              <Input
                type="username"
                name="username"
                id="username"
                placeholder="Username"
                className="mb-3"
                onChange={this.onChange("username")}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={this.onChange("email")}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={this.onChange("password")}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
     </div>
 )
}
}

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { register })(Signup);

