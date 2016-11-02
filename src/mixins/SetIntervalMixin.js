import React from 'react';

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },

  setInterval: function() {
    console.log('setInterval');
    this.intervals.push(setInterval.apply(null, arguments));
  },

  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

module.exports = SetIntervalMixin;
