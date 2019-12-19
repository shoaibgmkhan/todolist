import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateAuth } from '../actions';
import history from '../history';
import '../styles/Login.css';

import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            username_erorr: false,
            password: '',
            password_error: false,
            remember_me: false,
            login_failure: false
        }
    }

    doLogin() {
        const username = this.state.username;
        const password = this.state.password;
        if(!this.state.username) {
            this.setState({
                username_erorr: true
            });
            return;
        } else {
            this.setState({
                username_erorr: false
            });
        }
        if(!this.state.password) {
            this.setState({
                password_error: true
            });
            return;
        } else {
            this.setState({
                password_error: false
            });
        }
        axios.post(`http://127.0.0.1/rest-auth/login/`, { 
            username,
            password
        }).then(res => {
            if(res.status === 200) {
                const key = res.data.key;
                this.props.updateAuth(key);
            }
            
        }).catch(error => {
            console.log(error);
            this.setState({
                login_failure: true,
            });
        });
    }

    render() {
        return (
            !this.props.token ? 
            <div className="body">
                <div className="box">
                    <div className="title">
                        <i>todo.list</i>
                    </div>
                    <div className="helper">
                        {this.state.login_failure ? "Either your username or password is incorrect" : " "}
                    </div>
                    <div>
                        <input className={this.state.username_erorr ? "error" : null} value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} type="text" placeholder="Username" autoComplete="off" autoCorrect="off" />
                    </div>
                    <div className="helper">
                        {this.state.username_erorr ? "Username cannot be empty" : " "}
                    </div>
                    <div>
                        <input className={this.state.password_error ? "error" : null} value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} type="password" placeholder="Password" autoComplete="off" autoCorrect="off" />
                    </div>
                    <div className="helper">
                        {this.state.password_error ? "Password cannot be empty" : " "}
                    </div>
                    <div className="submitBox">
                        <Link to="/signup">Sign Up</Link>
                        <button onClick={() => this.doLogin()} className="button">Login</button>
                    </div>
                </div>
            </div> : 
            (history.push("/"))
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps, { updateAuth })(Login);
