import React, {Component} from 'react';
import {connect} from "react-redux";
import {getMousepad} from "../redux/mousepadActions";
import PropTypes from "prop-types"
import Loading from "./Loading"

class Mousepad extends Component {
    
    componentDidMount(){
        this.props.getMousepad();
    }



    render(){
        const {mousepad} = this.props.mousepad;
        return(
            <div>
                <div className="container">
                {(mousepad.length === 0) ? <Loading/> : <>
                <div className="row">
                {mousepad.map((m,i) => {
                    return(
                        <div className="card mb-2 mt-4 col-4" key={i} style={{backgroundColor:"black"}}>
                        <div className="card-body" style={{backgroundColor:"black"}} >
                            
                        <h5 className="card-title" style={{color:"white"}}>Title: {m.title}</h5>
                        <p className="card-text" style={{color:"white"}}>Description: {m.description}</p>
                        <hr style={{backgroundColor: "aqua"}}/>
                        <p className="card-text" style={{color:"white"}}>Rs. {m.price}</p>
                        <img alt="ProductImage" src={`http://localhost:3001/static/img/${m.imageName}`} style={{height:"150px", width:"180px"}}></img>
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

Mousepad.propTypes = {
    getMousepad: PropTypes.func.isRequired,
    mousepad: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    mousepad: state.mousepad
})

export default connect(mapStateToProps, {getMousepad})(Mousepad);