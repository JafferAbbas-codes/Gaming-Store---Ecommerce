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
import { signin } from '../redux/authActions';
import { clearErrors } from '../redux/errorActions';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types"

class Signin extends Component {
  
 state={
   modal: false,
   email:"",
   password:"",
   redirect: false,
   errors: ""
 }
  
 toggle = () => {
  this.setState({
    modal: !this.state.modal,
  });
};

onChange = (name) => (e) => {
  this.setState({ errors: "" });
  this.setState({ [name]: e.target.value });
  {this.props.clearErrors()}
};

onSubmit = (e) => {
  
  e.preventDefault();

  this.props.signin(this.state.email, this.state.password);
  
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
        Login
      </Button>

      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Login</ModalHeader>

        <div
          className="alert alert-info"
          style={{ display: this.props.error ? "" : "none" }}
        >
          {this.props.error}
        </div>

        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              
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
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
     </div>
 )
}
}

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  erroremail: PropTypes.string,
  errorpassword: PropTypes.string,
  clearErros: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user,
  erroremaill: state.error.emailerror,
  errorpassword: state.error.passworderror
});

export default connect(mapStateToProps, { signin, clearErrors })(Signin);

