import React from 'react';
import Drawer from '../components/drawer';
class Homepage extends React.Component {
    logout = () => {
        this.props.history.push('/');
        sessionStorage.clear();
    }
    render() {
        return (
            <div>
                <Drawer isadmin={false} logout={this.logout}></Drawer>
            </div>
        )
    }
}
export default Homepage;