import React, {Component} from 'react';
import {connect} from "react-redux";
import {getMouse} from "../redux/mouseActions";
import PropTypes from "prop-types"
import Loading from "./Loading";

class Mouse extends Component {
    
    componentDidMount(){
        this.props.getMouse();
    }

    render(){
        const {mouse} = this.props.mouse;
        return(
            <div>
                <div className="container">
                {(mouse.length === 0) ? <Loading/> : <>
                <div className="row">
                {mouse.map((m,i) => {
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

Mouse.propTypes = {
    getMouse: PropTypes.func.isRequired,
    mouse: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    mouse: state.mouse
})

export default connect(mapStateToProps, {getMouse})(Mouse);