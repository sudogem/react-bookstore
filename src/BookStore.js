import React from 'react';

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

// Step 1 of 5 List
var BookList = React.createClass({
  getInitialState() {
    console.log('BookList getInitialState...');
    return ( {
      books: [{ id:1, name: 'Zero to One', author: 'Peter Thiel' },
              { id:2, name: 'Monk who sold his Ferrari', author: 'Robin Sharma' },
              { id:3, name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }
            ],
              // selectedBooks: JSON.parse(localStorage.getItem('selectedBooks')) || [],
              selectedBooks: [],
              error: false
            }
    );
  },

  componentDidMount: function () {
    var selbooks = this.state.selectedBooks;
    console.log('QQQ componentDidMount selectedBooks:', selbooks);
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

  _renderBook(book) {
    return(
      <div className="checkbox" key={book.id}>
        <label>
          <input type="checkbox" value={book.name} onChange={this.handleSelectedBooks} /> {book.name} -- {book.author}
        </label>
      </div>
    );
  },

  handleSelectedBooks(event){
    var selbooks = this.state.selectedBooks;
    // console.log('QQQ selectedBooks:', selbooks);
    // console.log('handleSubmit this.state.currentStep:', this.state.currentStep);
    var index = selbooks.indexOf(event.target.value);
    if (event.target.checked) {
      if (index === -1) {
        selbooks.push(event.target.value);
      }
    } else {
      selbooks.splice(index, 1);
    }

    this.setState({selectedBooks: selbooks });
    // localStorage.setItem('selectedBooks', JSON.stringify(selbooks));
  },

  handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
    var selbooks = this.state.selectedBooks;
    console.log('QQQ selectedBooks:', selbooks);

    if (selbooks.length === 0) {
      this.setState({error: 'Please choose at least one book to continue'});
    } else {
      this.setState({error: false});
      this.props.parentUpdateFormData({selectedBooks: selbooks});
      this.props.updateStep(2);
    }
  },

  render() {
    var errorMessage = this._renderError();
    var styleForm = {
      'width': '500px',
      'border': '1px solid #ccc',
      'padding': '10px',
      'marginTop': '5em'
    };
    return(
      <div style={styleForm}>
        <h2>{this.props.title}</h2>
        <h3>Choose from wide variety of books available in our store.</h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {this.state.books.map((book) => {
             return this._renderBook(book); })
          }
          <input type="submit" className="btn btn-success" value="Submit" />
        </form>
      </div>
    );
  }
});

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
    var styleForm = {
      'width': '500px',
      'marginTop': '5em'
    };
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

// Step 3 of 3 Delivery Details
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
            <strong>Selected books</strong> : { this.props.data.selectedBooks.join(", ") }
          </div><br/>
          <button className="btn btn-success">Place order</button>
        </form>
      </div>
    );
  }
});

// Step 5 of 5 Success page
var Success = React.createClass({
  render() {
    var numberOfDays = "1 to 2 ";

    if (this.props.data.deliveryOption === 'Normal') {
      numberOfDays = "3 to 4 ";
    }
    return (
      <div className='successPage'>
        <h2>
          Thank you for shopping with us {this.props.data.fullName}.
        </h2>
        <h4>
          You will soon get {this.props.data.selectedBooks.join(", ")} at {this.props.data.shippingAddress} in approximately {numberOfDays} days.
        </h4>
      </div>
    );
  }
});

module.exports = BookStore;
