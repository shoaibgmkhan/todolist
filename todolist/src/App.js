import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Login, TodoList } from "./components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        { this.props.token === null ? (
          <Login />
        ) : (
          <TodoList />
        ) }        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(App);
