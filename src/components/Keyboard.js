import React, {Component} from 'react';
import {connect} from "react-redux";
import {getKeyboard} from "../redux/keyboardActions";
import PropTypes from "prop-types"
import Loading from "./Loading";

class Keyboard extends Component {
    
    componentDidMount(){
        this.props.getKeyboard();
    }


    render(){
        const {keyboard} = this.props.keyboard;
        return(
            <div>
                <div className="container">
                  {(keyboard.length === 0) ? <Loading/> : <>
                <div className="row">
                {keyboard.map((k,i) => {
                    return(
                        <div className="card mb-2 mt-4 col-4" key={i} style={{backgroundColor:"black"}}>
                        <div className="card-body" style={{backgroundColor:"black"}} >
                            
                        <h5 className="card-title" style={{color:"white"}}>Title: {k.title}</h5>
                        <p className="card-text" style={{color:"white"}}>Description: {k.description}</p>
                        <hr style={{backgroundColor: "aqua"}}/>
                        <p className="card-text" style={{color:"white"}}>Rs. {k.price}</p>
                        <img alt="ProductImage" src={`http://localhost:3001/static/img/${k.imageName}`} style={{height:"150px", width:"180px"}}></img>
                        <br/> <br/>
                        
                       
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

Keyboard.propTypes = {
    getKeyboard: PropTypes.func.isRequired,
    keyboard: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    keyboard: state.keyboard
})

export default connect(mapStateToProps, {getKeyboard})(Keyboard);