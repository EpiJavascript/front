import React from 'react';
import { withRouter } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    if (!props.user) {
      this.props.history.push('/Register');
    }
  }

  render() {
    return (
      <div>
        <p>Home</p>
      </div>
    );
  }
}

export default withRouter(Home);
