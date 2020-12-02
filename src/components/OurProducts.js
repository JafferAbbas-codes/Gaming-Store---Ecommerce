import React, {Component} from 'react';
import {connect} from "react-redux";
import {getItems, deleteItem} from "../redux/productActions";
import PropTypes from "prop-types"
import AddProduct from './AddProduct';
import { Container,Button } from 'reactstrap';
import {addItem} from "./cartHelpers";
import Loading from "./Loading"
import { Redirect } from 'react-router-dom';
import Cart from "../images/cart.png";
import Wish from "../images/wish.png";

class OurProducts extends Component {
    
    componentDidMount(){
        this.props.getItems();
    }

    isAuthenticated = () => {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return null;
        }
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id, this.isAuthenticated().token);
        this.redirect();
    }

    redirect = () => {
        return (
            <Redirect to={"/products"}/>
        )
    }

    addToCart = (product) => {
        // console.log('added');
        addItem(product);
        alert("Item Added")
      };
    
    render(){
        const {products} = this.props.product;
        return(
            <div>
                <Container> 
                <AddProduct/>
                </Container>
                <div className="container mt-3">
                    {(products.length === 0) ? <Loading/> : <>
                <div className="row">
                {products.map((p,i) => {
                    return(
                        <div className="card mb-2 mt-4 col-md-4 " key={i} style={{backgroundColor:"black"}}>
                        <div className="card-body" style={{backgroundColor:"black"}} >
                            
                        <h5 className="card-title" style={{color:"white"}}>Title: {p.title}</h5>
                        <p className="card-text" style={{color:"white"}}>Description: {p.description}</p>
                        <hr style={{backgroundColor: "aqua"}}/>
                        <p className="card-text" style={{color:"white"}}>Rs. {p.price}</p>
                        <img alt="ProductImage" src={`http://localhost:3001/static/img/${p.imageName}`} style={{height:"150px", width:"180px"}}></img>
                        <br/> <br/>
                        {console.log("USER" + this.props.user + "ADMIN" + this.props.isAdmin )}
                        {this.props.user && this.props.isAdmin ?  <Button style={{backgroundColor:"red", height:"44px"}}
                        onClick={this.onDeleteClick.bind(this, p._id )}>Delete</Button>
                         : <> <Button outline onClick={this.addToCart.bind(this,p)}>  
                        <img src={Cart} alt="cart" width="40px" height="30px"/>
                        </Button>
                        &nbsp; &nbsp;
                        <Button outline style={{backgroundColor:"aqua"}} >  
                        <img src={Wish} alt="cart" width="30px" height="30px"/>
                        </Button> </>
                         }
                       </div>
                      </div>
                    )
                })}
                </div>
                </>}
                </div>
               
            </div>
        )
    }
}

OurProducts.propTypes = {
    getItems: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    isAdmin: PropTypes.bool
}

const mapStateToProps = (state) => ({
    product: state.product,
    user: state.user.user,
    isAdmin: state.user.role
})

export default connect(mapStateToProps, {getItems, deleteItem})(OurProducts);