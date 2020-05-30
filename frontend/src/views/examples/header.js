import React, { Component } from "react";
import { Link } from "react-router-dom";
 
class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3">
          <Link to="/"><h1 style={{fontSize:"48px",fontWeight:500,fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",textAlign:"center",color:"black",textDecoration:"none"}}>AI TRADE ANALYTICS<span className="badge badge-secondary">{this.props.totalItems}</span></h1></Link>
        </nav>
      </React.Fragment>
    );
  }
}
 
export default Header;