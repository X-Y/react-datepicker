/** @jsx React.DOM */

window.Calendar = React.createClass({
  getInitialState: function() {
    return {
      date: this.props.selected.clone()
    };
  },

  increaseMonth: function() {
    this.setState({
      date: this.state.date.addMonth()
    });
  },

  decreaseMonth: function() {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  },

  weeks: function() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  },

  renderWeek: function(weekStart, key) {
    if(! weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return (
      <div key={key} className="week">
        {this.days(weekStart)}
      </div>
    );
  },

  renderDay: function(day, key) {
    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        onSelect={this.props.onSelect}
        selected={this.props.selected} />
    );
  },

  days: function(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  },

  render: function() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <a className="calendar-header-navigation-left"
              onClick={this.decreaseMonth}>
            &laquo;
          </a>
          <span className="calendar-header-month">
            {this.state.date.format("MMMM YYYY")}
          </span>
          <a className="calendar-header-navigation-right"
              onClick={this.increaseMonth}>
            &raquo;
          </a>
          <div className="calendar-header-days">
            <div className="item">MO</div>
            <div className="item">TU</div>
            <div className="item">WE</div>
            <div className="item">TH</div>
            <div className="item">FR</div>
            <div className="item">SA</div>
            <div className="item">SU</div>
          </div>
        </div>
        <div className="calendar-month">
          {this.weeks()}
        </div>
      </div>
    );
  }
});
