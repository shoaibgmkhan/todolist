import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/User.css';

import axios from 'axios';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        if(this.props.token) {
            const token = "Token " + this.props.token;
            axios.get('http://127.0.0.1/rest-auth/user/',{
                headers: {
                    Authorization: token
                }
            }).then(res => {
                console.log(res.data);
                const user = res.data;
                this.setState({
                    user
                });
            });
        }
    }

    render() {
        return (
            this.state.user ? (
                <div className="lead">
                    Hi {this.state.user.username}
                </div>
            ) : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(User);