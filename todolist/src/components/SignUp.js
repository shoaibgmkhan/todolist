import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateAuth } from '../actions';
import history from '../history';
import '../styles/Login.css';

import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            username_erorr: false,
            email: '',
            email_error: false,
            password: '',
            password_error: false,
            re_password: '',
            re_password_error: false,
            remember_me: false,
            login_failure: false
        }
    }

    doSignUp() {
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const re_password = this.state.re_password;
        if(!this.state.username) {
            this.setState({
                username_erorr: true
            }, function() {
                this.usernameField.focus();
            });
            return;
        } else {
            this.setState({
                username_erorr: false
            });
        }
        if(!this.state.email) {
            this.setState({
                email_error: "Email address cannot be empty"
            }, function() {
                this.emailField.focus();
            });
            return;
        } else {
            this.setState({
                email_error: false
            });
        }
        if(!this.state.password) {
            this.setState({
                password_error: "Password cannot be empty"
            });
            return;
        } else {
            this.setState({
                password_error: false
            });
        }
        if(!this.state.re_password) {
            this.setState({
                re_password_error: "Confirm the password again"
            }, function() {
                this.rePasswordField.focus();
            });
            return;
        } else {
            this.setState({
                re_password_error: false
            });
        }
        if(this.state.password !== this.state.re_password) {
            this.setState({
                re_password_error: "The password does not match"
            }, function() {
                this.rePasswordField.focus();
            });
            return;
        }
        axios.post(`http://127.0.0.1/rest-auth/registration/`, { 
            username,
            email,
            password1: password,
            password2: re_password
        }).then(res => {
            const key = res.data.key;
            this.props.updateAuth(key);
            history.push("/");            
        }).catch(error => {
            const res = error.response;
            if(res.data.username) {
                this.setState({
                    username_error: res.data.username[0]
                });
            }
            if(res.data.email) {
                this.setState({
                    email_error: res.data.email[0]
                });
            }
            if(res.data.password1) {
                this.setState({
                    password_error: res.data.password1[0]
                });
            }
            if(res.data.password2) {
                this.setState({
                    re_password_error: res.data.password2[0]
                });
            }
        });
    }

    setUsername(value) {
        this.setState({
            username: value,
            username_erorr: !value
        });
    }

    setEmailAddress(value) {
        this.setState({
            email: value,
            email_erorr: !value ? "Email address cannot be empty" : false
        });
    }

    setPassword(value) {
        this.setState({
            password: value,
            password_error: !value ? "Password cannot be empty" : false
        });
    }
    
    render() {
        return (
            !this.props.token ? 
                <div className="box">
                    <div className="title">
                        <i>todo.list</i>
                    </div>
                    <div className="helper">
                        {this.state.login_failure ? "Either your username or password is incorrect" : " "}
                    </div>
                    <div>
                        <input ref={(input) => { this.usernameField = input; }} className={this.state.username_erorr ? "error" : null} value={this.state.username} onChange={(event) => this.setUsername(event.target.value)} type="text" placeholder="Username" autoComplete="off" autoCorrect="off" />
                    </div>
                    <div className="helper">
                        {this.state.username_erorr ? "Username cannot be empty" : " "}
                    </div>
                    <div>
                        <input ref={(input) => { this.emailField = input; }} className={this.state.email_error ? "error" : null} value={this.state.email} onChange={(event) => this.setEmailAddress(event.target.value)} type="text" placeholder="Email Address" autoComplete="off" autoCorrect="off" />
                    </div>
                    <div className="helper">
                        {this.state.email_error ? this.state.email_error : " "}
                    </div>
                    <div>
                        <input ref={(input) => { this.passwordField = input; }} className={this.state.password_error ? "error" : null} value={this.state.password} onChange={(event) => this.setPassword(event.target.value)} type="password" placeholder="Password" autoComplete="off" autoCorrect="off" />
                    </div>
                    <div className="helper">
                        {this.state.password_error ? this.state.password_error : " "}
                    </div>
                    <div>
                        <input ref={(input) => { this.rePasswordField = input; }} className={this.state.re_password_error ? "error" : null} value={this.state.re_password} onChange={(event) => this.setState({re_password: event.target.value, re_password_error: false})} type="password" placeholder="Confirm Password" autoComplete="off" autoCorrect="off" />
                    </div>
                    <div className="helper">
                        {this.state.re_password_error ? this.state.re_password_error : " "}
                    </div>
                    <div className="submitBox">
                        <Link to="/login">Login</Link>
                        <button onClick={() => this.doSignUp()} className="button">Sign Up</button>
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

export default connect(mapStateToProps, { updateAuth })(SignUp);