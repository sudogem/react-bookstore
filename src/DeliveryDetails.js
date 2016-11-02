import React from 'react';
import SetIntervalMixin from './mixins/SetIntervalMixin';
import CartTimeoutMixin from './mixins/CartTimeoutMixin';

// Step 3 of 5 Delivery Details
var DeliveryDetails = React.createClass({
  propTypes: {
    alertCartTimeout: React.PropTypes.func.isRequired,
    updateCartTimeout: React.PropTypes.func.isRequired,
    cartTimeout: React.PropTypes.number.isRequired
  },
  mixins: [SetIntervalMixin, CartTimeoutMixin],

  getInitialState() {
    return (
      {deliveryOption: 'Primary', cartTimeout: this.props.cartTimeout}
    );
  },

  componentWillReceiveProps(newProps){
    this.setState({cartTimeout: newProps.cartTimeout});
  },

  handleChange(event) {
    this.setState({ deliveryOption: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();
    this.props.parentUpdateFormData(this.state);
    this.props.updateStep(4);
  },

  updateStep(event) {
    this.props.updateStep(2);
  },

  render() {
    var styleForm = {
      'width': '500px',
      'marginTop': '5em'
    };
    var minutes = Math.floor(this.state.cartTimeout / 60);
    var seconds = this.state.cartTimeout - minutes * 60;
    return (
      <div className='wrapper'>
        <span><a href="#" onClick={this.updateStep} className='Floatright' >&laquo; Back to Step 2</a></span>
        <h2>{this.props.title}</h2>
        <h1>Choose your delivery options here.</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="radio">
            <label>
              <input type="radio"
                     checked={this.state.deliveryOption === "Primary"}
                     value="Primary"
                     onChange={this.handleChange} />
              Primary -- Next day delivery
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio"
                     checked={this.state.deliveryOption === "Normal"}
                     value="Normal"
                     onChange={this.handleChange} />
              Normal -- 3-4 days
            </label>
          </div>
          <button className="btn btn-success">Submit</button>
        </form>

        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds, before confirming order
        </div>
      </div>

    );
  }
});

module.exports = DeliveryDetails;
