import React from 'react';

var cartTimeoutMixin = {
  componentWillMount: function(){
    this.setInterval(this.decrementCartTimer, 1000);
  },

  componentWillUnmount(){
    this.props.updateCartTimeout(this.state.cartTimeout);
  },

  decrementCartTimer: function(){
    console.log('decrementCartTimer:',this.state.cartTimeout);
    if (this.state.cartTimeout == 0){
      this.props.alertCartTimeout();
      return;
    }
    this.setState({cartTimeout: this.state.cartTimeout - 1});
  }
};
