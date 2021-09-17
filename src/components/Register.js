import React from 'react';
import { withRouter } from 'react-router';
import { Form, Button } from 'react-bootstrap';
// import { register } from '../serviceWorker';

class Register extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.user) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <p>register page </p>
                <form>
                    <label>
                        Email:
                        <input type="email" name="Email"/>
                    </label>
                    <label>
                        Confirm your Email:
                        <input type="text" name="confirmEmail" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="Password" />
                    </label>
                    <input type="button" name="submit" />
                </form>
            </div>
        );
    };
}

// <Form>
//     <Form.Group className="dark-mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" />
//     </Form.Group>

//     <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" />
//     </Form.Group>
//     <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check type="checkbox" label="Check me out" />
//     </Form.Group>

//     <Button variant="primary" type="submit">
//         Submit
//     </Button>
// </Form>

export default withRouter(Register);