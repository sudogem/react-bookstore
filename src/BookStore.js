import React from 'react';
import BookList from './BookList';
import ShippingDetails from './ShippingDetails';
import DeliveryDetails from './DeliveryDetails';
import Confirmation from './Confirmation';
import Success from './Success';

var BookStore = React.createClass({
  getInitialState() {
    return ({ currentStep: 1 });
  },

  updateFormData(formData) {
    console.log('updateFormData:', JSON.stringify(formData));
    var formValues = Object.assign({}, this.state.formValues, formData);
    this.setState({formValues: formValues});
  },

  updateStep(currentStep) {
    console.log('currentStep:',currentStep);
    this.setState({currentStep: currentStep});
  },

  render() {
    switch (this.state.currentStep) {
      case 1:
        return <BookList parentUpdateFormData={this.updateFormData} updateStep={this.updateStep} title='Step 1' />;
      case 2:
        return <ShippingDetails parentUpdateFormData={this.updateFormData} updateStep={this.updateStep} title='Step 2' />;
      case 3:
        return <DeliveryDetails parentUpdateFormData={this.updateFormData} updateStep={this.updateStep} title='Step 3' />;
      case 4:
        return <Confirmation parentUpdateFormData={this.updateFormData} data={this.state.formValues} updateStep={this.updateStep} title='Step 4' />;
      case 5:
        return <Success data={this.state.formValues} />;
      default:
        return <BookList parentUpdateFormData={this.updateFormData} />;
    }
  }
});

module.exports = BookStore;
