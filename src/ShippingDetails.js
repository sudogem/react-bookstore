import React from 'react';
import SetIntervalMixin from './mixins/SetIntervalMixin';
import CartTimeoutMixin from './mixins/CartTimeoutMixin';

// Step 2 of 3 Shipping Details
var ShippingDetails = React.createClass({
  propTypes: {
    alertCartTimeout: React.PropTypes.func.isRequired,
    updateCartTimeout: React.PropTypes.func.isRequired,
    cartTimeout: React.PropTypes.number.isRequired
  },
  mixins: [SetIntervalMixin, CartTimeoutMixin],

  getInitialState() {
    return ({
      fullName: this.props.getFormValues().fullName || '',
      contactNumber: this.props.getFormValues().contactNumber || '',
      shippingAddress: this.props.getFormValues().shippingAddress || '',
      error:false,
      cartTimeout: this.props.cartTimeout
    });
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
      this.setState({error: 'Please enter full name'});
    } else if (this.state.contactNumber === '') {
      this.setState({error: 'Please enter contact number'});
    } else if (this.state.shippingAddress === '') {
      this.setState({error: 'Please enter shipping address'});
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
    if (this._validateInput()) {
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
    var minutes = Math.floor(this.state.cartTimeout / 60);
    var seconds = this.state.cartTimeout - minutes * 60;
    return (
      <div className='wrapper'>
        <span><a href="#" onClick={this.updateStep} className='Floatright' >&laquo; Back to Step 1</a></span>
        <h2>{this.props.title}</h2>
        <h1>Enter your shipping information.</h1>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Full name</label>
            <input className="form-control" type="text" value={this.state.fullName} onChange={(event) => this.handleChange(event, 'fullName')} />
          </div>

          <div className="form-group">
            <label>Contact no.</label>
            <input className="form-control" type="text" value={this.state.contactNumber} onChange={(event) => this.handleChange(event, 'contactNumber')}/>
          </div>

          <div className="form-group">
            <label>Shipping address</label>
            <textarea className="form-control" type="text" onChange={(event) => this.handleChange(event, 'shippingAddress')} value={this.state.shippingAddress} ></textarea>
          </div>

          <div className="form-group">
            <button type="submit"
                    ref="submit"
                    className="btn btn-success" value="Submit">
              Submit
            </button>
          </div>
        </form>
        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds, before confirming order
        </div>
      </div>
    );
  }
});

module.exports = ShippingDetails;
