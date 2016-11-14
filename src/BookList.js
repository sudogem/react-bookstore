import React from 'react';

// Step 1 of 5 BookList
var BookList = React.createClass({
  getInitialState() {
    console.log('BookList getInitialState...');
    return ( {
      books: [{id:1, name: 'Zero to One', author: 'Peter Thiel'},
              {id:2, name: 'Monk who sold his Ferrari', author: 'Robin Sharma'},
              {id:3, name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam'}
      ],
      // selectedBooks: JSON.parse(localStorage.getItem('selectedBooks')) || [],
      selectedBooks: [],
      error: false
    });
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
      this.props.parentUpdateFormData({
        selectedBooks: selbooks,
        fullName: '',
        contactNumber: '',
        shippingAddress: ''
      });
      this.props.updateStep(2);
      var linkData = [{
        "id": "58135e89f1ae872a107b7b0a",
        "url": "aaaa.com"
        }, {
        "id": "58135e89f1ae872a107b7b0b",
        "url": "bbbb.com"
        }];
      this.props.updatePublisher(linkData);
    }
  },

  render() {
    var errorMessage = this._renderError();
    return(
      <div className='wrapper'>
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

module.exports = BookList;
