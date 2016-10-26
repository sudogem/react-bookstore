import React from 'react';

var BookStore = React.createClass({
  getInitialState() {
    return ({ currentStep: 1 });
  },

  updateFormData(formData) {
    console.log('updateFormData:', JSON.stringify(formData));
    var formValues = Object.assign({}, this.state.formValues, formData);

    var nextStep = this.state.currentStep + 1;
    this.setState({formValues: formValues, currentStep: nextStep});
  },

  render() {
    switch (this.state.currentStep) {
      case 1:
        return <BookList parentUpdateFormData={this.updateFormData} />;
      case 2:
        return <ShippingDetails updateFormData={this.updateFormData} />;
      case 3:
        return <DeliveryDetails updateFormData={this.updateFormData} />;
    }
  }
});

// Step 1 of 3
var BookList = React.createClass({
  getInitialState() {
    return ( {
      books: [{ id:1, name: 'Zero to One', author: 'Peter Thiel' },
              { id:2, name: 'Monk who sold his Ferrari', author: 'Robin Sharma' },
              { id:3, name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }
            ],
              selectedBooks: [],
              error: false
            }
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
    console.log('QQQ selectedBooks:', selbooks);
    var index = selbooks.indexOf(event.target.value);
    console.log('QQQ index:', index);
    if (event.target.checked) {
      console.log('checked!');
      if (index === -1) {
        selbooks.push(event.target.value);
      }
    } else {
      selbooks.splice(index, 1);
    }

    this.setState({selectedBooks: selbooks });
  },

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    console.log("Form submitted");
    var selbooks = this.state.selectedBooks;
    console.log('QQQ selectedBooks:', selbooks);
    if (selbooks.length === 0) {
      this.setState({error: 'Please choose at least one book to continue'});
    } else {
      this.setState({error: false});
      this.props.parentUpdateFormData({selectedBooks: this.state.selectedBooks});
    }

  },

  render() {
    var errorMessage = this._renderError();
    return(
      <div>
        <h3>Choose from wide variety of books available in our store.</h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {this.state.books.map((book) => {
             return this._renderBook(book); })
          }

          <input type="submit" className="btn btn-success" />
        </form>
      </div>

    );
  }
});

// Step 2 of 3
var ShippingDetails = React.createClass({
  render() {
    return(
      <h1>Enter your shipping information.</h1>
    );
  }
});

// Step 3 of 3
var DeliveryDetails = React.createClass({
  render() {
    return (
      <h1>Choose your delivery options here.</h1>
    );
  }
});

module.exports = BookStore;
