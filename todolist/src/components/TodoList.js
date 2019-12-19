import React, { Component } from 'react';
import User from "./User";
import '../styles/TodoList.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TodoList extends Component {
    render() {
        return (
            <div className="body">
                <header>
                    <i>todo.list</i>
                    <div>
                        <Link to="/logout">Logout</Link>
                    </div>
                </header> 
                <User />          
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(TodoList);