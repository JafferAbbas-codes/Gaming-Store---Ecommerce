import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../redux/productActions";

class AddProduct extends Component {
        state = {
            modal: false,
            title: "",
            description: "",
            category: "",
            image: "",
            price: "",
          };

  

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

    const obj = {
      title : this.state.title,
      description : this.state.description,
      category : this.state.category,
      price : this.state.price,
      image : this.state.image
    }
    
    console.log("HELLO" + obj)
    this.props.addItem(obj);
    
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color="dark" onClick={this.toggle}>
          Add Product
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a new Product</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit} encType="multipart/form-data">
              <FormGroup>
                <Label for="title"> Title </Label>
                <Input
                  type="title"
                  name="title"
                  id="title"
                  placeholder="Enter Product Title"
                  onChange={this.onChange("title")}
                ></Input>

                <Label for="description"> Description </Label>
                <Input
                  type="description"
                  name="description"
                  id="description"
                  placeholder="Enter Product Description"
                  onChange={this.onChange("description")}
                ></Input>

                <Label for="category">Select a Category</Label>
                <Input
                type="select"
                id="category"
                name="category"
                onChange={this.onChange("category")}
                >
                    <option value="5f0d7e62bc0b571d609cf21f">Keyboard</option>
                    <option value="5f0d7e54bc0b571d609cf21e">Mouse</option>
                  
                </Input>

                <Label for="image"> Upload Image </Label>
                <Input
                  type="file"
                  accept="image"
                  name="image"
                  id="image"
                  placeholder="Enter Product Title"
                  onChange={this.onChange("image")}
                ></Input>
                
                <Label for="price"> Price </Label>
                <Input
                  type="price"
                  name="price"
                  id="price"
                  placeholder="Enter Product Price"
                  onChange={this.onChange("price")}
                ></Input>

                <Button className="mt-3" color="dark" block>
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { addItem })(AddProduct);
