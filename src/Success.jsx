import React from 'react';

// Step 5 of 5 Success page
var Success = React.createClass({
  updateStep(event) {
    this.props.updateStep(1);
  },

  render() {
    var numberOfDays = '1 to 2 ';
    if (this.props.data.deliveryOption === 'Normal') {
      numberOfDays = '3 to 4 ';
    }
    return (
      <div className='successPage'>
        <h2>
          Thank you for shopping with us {this.props.data.fullName}.
        </h2>
        <p>
          You will soon get {this.props.data.selectedBooks.join(', ')} at {this.props.data.shippingAddress} in approximately {numberOfDays} days.
        </p>
        <button onClick={this.updateStep}>Back to main page</button>
      </div>
    );
  }
});

module.exports = Success;
