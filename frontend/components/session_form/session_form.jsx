import React from 'react';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import GreetingContainer from '../greeting/greeting_container';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
        this.usernameArray = "jimmbo_123".split("");
        this.passwordArray = "1234567".split("");
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    handleDemo(e){
        let { username } = this.state;
        let { password } = this.state;
        // e.preventDefault();
        if (this.usernameArray.length > 0) {
            this.setState(
                {username: username + this.usernameArray.shift() }, () => {
                    setTimeout(() => 
                    this.handleDemo(), 100);
                }
            );
        } else if (this.passwordArray.length > 0) {
            this.setState(
                {password: password + this.passwordArray.shift() }, () => {
                    setTimeout(() => 
                    this.handleDemo(), 100);
                }
            );
        }
        else {
            this.props.processForm(this.state).then(() => this.props.history.push("/users"));
        }
    }



    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        let guest = { username: "jimmbo_123", password: "1234567"}

        if (this.props.formType === "login"){
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    <div className="overall-form">

                        <h1 className="login-welcome">Log In to 365px</h1>

                        <div className="login-form">
                            <br />
                            <label className="login-username-label"> Username
                                <input type="text"
                                    value={this.state.username}
                                    onChange={this.update('username')}
                                    className="login-input"
                                />
                            </label>
                            <br />
                            <label className="login-password-label"> Password
                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="login-input"
                                />
                            </label>
                            <br />
                            <input className="login-button" type="submit" value="Log In" 
                                onClick={() => this.props.processForm(this.state).then(() => this.props.history.push("/users"))}/> 
                            <br />
                            <br />
                            <input className="guest-login-button" type="button" value="Log in as guest" 
                            onClick={this.handleDemo}/>
                            {/* onClick={() => this.props.processForm(guest).then(() => this.props.history.push("/users"))}/> */}
                            <div className="no-account-div">
                                <h5 className="no-account-msg">Don't have an account? </h5>
                                <Link to="/signup" className="no-account-signup-link">Sign Up</Link>
                            </div>
                            <div className="error-message">
                                <br />
                                {this.renderErrors()}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
        }
        else{
            return(
                <div className="signup-form-container">
                    <div className="signup-inner">
                        <form onSubmit={this.handleSubmit} className="signup-form-box">
                            <div className="message-div">
                                <h1 className="join-banner">
                                    Join 365px!
                                </h1>
                                <h2 className="join-message">
                                    Share your photos, get inspired, and grow your skills
                                </h2>
                            </div>
                            <br />
                            <div className="signup-form">
                                <br />
                                <label className="signup-labels">  Username:
                                    <input type="text"
                                        value={this.state.username}
                                        onChange={this.update('username')}
                                        // className="login-input"
                                        className="signup-input"
                                    />
                                </label >
                                <br />
                                <label className="signup-labels">  Password:
                                    <input type="password"
                                        value={this.state.password}
                                        onChange={this.update('password')}
                                        className="signup-input"
                                    />
                                </label>
                                <br />
                                <label className="signup-labels">Email:
                                    <input type="text"
                                        value={this.state.email}
                                        onChange={this.update('email')}
                                        className="signup-input"
                                    />
                                </label>
                                <br />
                                <label className="signup-labels">First Name:
                                    <input type="text"
                                        value={this.state.first_name}
                                        onChange={this.update('first_name')}
                                        className="signup-input"
                                    />
                                </label>
                                <br />
                                <label className="signup-labels">Last Name:
                                    <input type="text"
                                        value={this.state.last_name}
                                        onChange={this.update('last_name')}
                                        className="signup-input"
                                    />
                                </label>
                                <br />
                                <input className="session-submit-button" type="submit" value="Sign up"
                                    onClick={() => this.props.processForm(this.state).then(() => this.props.history.push("/users"))} /> 
                            </div>
                        </form>
                        <div className="bottom-terms-conatiner">
                            <div className="signup-tos-statement">
                                By Signing up, you agree to our Terms of Service. 
                            </div>
                            <div className="login-instead">
                                Already have an account? 
                                <Link to="/login" className="bottom-login">Log in</Link>
                            </div>
                            <div className="signup-form-errors">
                                {this.renderErrors()}
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
    }
}

export default SessionForm;
