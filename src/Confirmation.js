import React from 'react';

// Step 4 of 5 Confirmation step
var Confirmation = React.createClass({
  getInitialState() {
    console.log('Confirmation this.props:', JSON.stringify(this.props,null,1));
    return null;
  },

  handleSubmit(event) {
    event.preventDefault();
    this.props.parentUpdateFormData(this.props.data);
    this.props.updateStep(5);
  },

  updateStep(event) {
    this.props.updateStep(3);
  },

  render(){
    return (
      <div className='wrapper'>
        <span><a href="#" onClick={this.updateStep} className='Floatright' >&laquo; Back to Step 3</a></span>
        <h2>{this.props.title}</h2>
        <h4>Are you sure you want to submit?</h4>
        <form onSubmit={this.handleSubmit}>
          <div>
            <strong>Full Name</strong> : { this.props.data.fullName }
          </div><br/>
          <div>
            <strong>Contact Number</strong> : { this.props.data.contactNumber }
          </div><br/>
          <div>
            <strong>Shipping Address</strong> : { this.props.data.shippingAddress }
          </div><br/>
          <div>
            <strong>Selected books</strong> : { this.props.data.selectedBooks.join(', ') }
          </div><br/>
          <button className="btn btn-success">Place order</button>
        </form>
      </div>
    );
  }
});

module.exports = Confirmation;
