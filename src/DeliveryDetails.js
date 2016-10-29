import React from 'react';

// Step 3 of 5 Delivery Details
var DeliveryDetails = React.createClass({
  getInitialState() {
    return (
      { deliveryOption: 'Primary' }
    );
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
      </div>

    );
  }
});

module.exports = DeliveryDetails;
