import React from 'react';

// Step 2 of 3 Shipping Details
var ShippingDetails = React.createClass({
  getInitialState() {
    return (
      {fullName:'', contactNumber:'', shippingAddress:'', error:false}
    );
  },

  _renderError() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      );
    }
  },

  _validateInput() {
    if (this.state.fullName === '') {
      this.setState({error: "Please enter full name"});
    } else if (this.state.contactNumber === '') {
      this.setState({error: "Please enter contact number"});
    } else if (this.state.shippingAddress === '') {
      this.setState({error: "Please enter shipping address"});
    } else {
      this.setState({error: false});
      return true;
    }
  },

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit this.state.currentStep:', this.state.currentStep);
    var formData = {
                    fullName: this.state.fullName,
                    contactNumber: this.state.contactNumber,
                    shippingAddress: this.state.shippingAddress
                  };
    if(this._validateInput()) {
      this.props.parentUpdateFormData(formData);
      this.props.updateStep(3);
    }
  },

  updateStep(event) {
    var selbooks = this.state.selectedBooks;
    console.log('Step 2 selectedBooks:', selbooks);
    this.props.parentUpdateFormData({selectedBooks: selbooks});
    this.props.updateStep(1);
  },

  handleChange(event, attributes) {
    var newState = this.state;
    newState[attributes] = event.target.value;
    // console.log('newState[attributes]:',newState[attributes], ' | attributes:',attributes);
    this.setState(newState);
  },

  render() {
    var errorMessage = this._renderError();
    return(
      <div className='wrapper'>
        <span><a href="#" onClick={this.updateStep} className='Floatright' >&laquo; Back to Step 1</a></span>
        <h2>{this.props.title}</h2>
        <h1>Enter your shipping information.</h1>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Full Name" value={this.state.fullName} onChange={(event) => this.handleChange(event, 'fullName')} />
          </div>

          <div className="form-group">
            <input className="form-control" type="text" placeholder="Contact number" value={this.state.contactNumber} onChange={(event) => this.handleChange(event, 'contactNumber')}/>
          </div>

          <div className="form-group">
            <input className="form-control" type="text" placeholder="Shipping Address" value={this.state.shippingAddress} onChange={(event) => this.handleChange(event, 'shippingAddress')} />
          </div>

          <div className="form-group">
            <button type="submit"
                    ref="submit"
                    className="btn btn-success" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </div>

    );
  }
});

module.exports = ShippingDetails;
