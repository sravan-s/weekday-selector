Polymer({
  is: 'weekday-selector',

  properties: {

    /**
     * selected week day indices
     */
    value: {
      type: Array,
      value: [],
      notify: true
    },

    mappedValue: {
      type: Array,
      value: [],
      notify: true
    },

    /**
     * set this if the week indices should start with a different value
     */
    startIndex: {
      type: Number,
      value: 0
    },

    _weekDays: Array,

    map: {
      type: Array,
      value: [{
        index: 0,
        label: 'Sunday'
      }, {
        index: 1,
        label: 'Monday'
      }, {
        index: 2,
        label: 'Tuesday'
      }, {
        index: 3,
        label: 'Wednesday'
      }, {
        index: 4,
        label: 'Thursday'
      }, {
        index: 5,
        label: 'Friday'
      }, {
        index: 6,
        label: 'Saturday'
      }]
    }

  },

  observers: ['_valueChange(value, startIndex)'],

  _valueChange: function(value, startIndex) {
    var weekDays = [];
    var mapped = [];
    value = value || [];
    var i;
    for (i = startIndex; i < startIndex + 7; i += 1) {
      weekDays.push({
        i: i,
        checked: (value.indexOf(i) !== -1),
        label: moment.weekdays(i - startIndex)
      });
    }
    this.set('_weekDays', weekDays);
    for (i = startIndex; i < this.value.length; i++) {
      mapped.push(this.map[value[i].label]);
    }
    this.set('mappedValue', mapped);
  },

  _setValue: function() {
    var me = this;
    me.debounce('setValue', function() {
      var i;
      var value = [];
      for (i = 0; i < me._weekDays.length; i += 1) {
        if (me._weekDays[i].checked) {
          value.push(me._weekDays[i].i);
        }
      }
      me.set('value', value);
    }, 50);
  }
});
