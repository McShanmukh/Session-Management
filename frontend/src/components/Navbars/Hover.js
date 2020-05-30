import React, { Component } from 'react';
import ProdDrop from 'views/examples/ProdDrop';

class Hover extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    return (
      <div>
        <div
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
        >
          Hover
        </div>
        {
          this.state.isHovering &&
          <div>
            <ProdDrop/>
          </div>
        }
      </div>
    );
  }
}

export default Hover;