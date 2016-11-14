import React from 'react';
import BookList from './BookList';
import ShippingDetails from './ShippingDetails';
import DeliveryDetails from './DeliveryDetails';
import Confirmation from './Confirmation';
import Success from './Success';
import update from 'immutability-helper';

var BookStore = React.createClass({
  getInitialState() {
    return ({currentStep: 1, cartTimeout: 60 * 15,
      publisher: {
        details: {
          name: 'Prentice Hall',
          desc: 'this is description',
          links: [{
            id: 1,
            url: 'prenticehall.in'
          }, {
            id: 2,
            url: 'prenticehall.us'
          }]
        }
      }
    });
  },

  updatePublisher(newData) {
    console.log('updatePublisher links data:', JSON.stringify(newData));
    var currentData = this.state.publisher;
    console.log('updatePublisher currentData:', JSON.stringify(currentData));
    const updatedData = update(currentData, {
          details: {
              links: {
                  $set: newData
              }
          }
        });

    this.setState({publisher: updatedData});
    console.log('updatePublisher updatedData:',JSON.stringify(updatedData) );
  },

  alertCartTimeout(){
    this.setState({currentStep: 10});
  },

  updateCartTimeout(timeout) {
    console.log('timeout:',timeout);
    this.setState({cartTimeout: timeout});
  },

  updateFormData(formData) {
    console.log('updateFormData:', JSON.stringify(formData));
    var formValues = Object.assign({}, this.state.formValues, formData);
    this.setState({formValues: formValues});
  },

  getFormValues() {
    return this.state.formValues;
  },

  updateStep(currentStep) {
    console.log('currentStep:',currentStep);
    this.setState({currentStep: currentStep});
  },

  render() {
    switch (this.state.currentStep) {
      case 1:
        return <BookList parentUpdateFormData={this.updateFormData}
                         updateStep={this.updateStep}
                         updatePublisher={this.updatePublisher}
                         title='Step 1' />;
      case 2:
        return <ShippingDetails parentUpdateFormData={this.updateFormData}
                                getFormValues={this.getFormValues}
                                updateStep={this.updateStep}
                                cartTimeout={this.state.cartTimeout}
                                updateCartTimeout={this.updateCartTimeout}
                                alertCartTimeout={this.alertCartTimeout}
                                title='Step 2' />;
      case 3:
        return <DeliveryDetails parentUpdateFormData={this.updateFormData}
                                getFormValues={this.getFormValues}
                                updateStep={this.updateStep}
                                cartTimeout={this.state.cartTimeout}
                                updateCartTimeout={this.updateCartTimeout}
                                alertCartTimeout={this.alertCartTimeout}
                                title='Step 3' />;
      case 4:
        return <Confirmation parentUpdateFormData={this.updateFormData} data={this.state.formValues} updateStep={this.updateStep} title='Step 4' />;
      case 5:
        return <Success data={this.state.formValues} updateStep={this.updateStep} />;
      case 10:
       /* Handle the case of Cart timeout */
        return <div><h2>Your cart timed out, Please try again!</h2></div>;
      default:
        return <BookList parentUpdateFormData={this.updateFormData} />;
    }
  }
});

module.exports = BookStore;
