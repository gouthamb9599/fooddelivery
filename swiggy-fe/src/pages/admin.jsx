import React from 'react';
import Drawer from '../components/drawer';
class Admin extends React.Component {
    logout = () => {
        this.props.history.push('/');
        sessionStorage.clear();
    }
    render() {
        return (
            <div>
                <Drawer isadmin={true} logout={this.logout}></Drawer>
            </div>
        )
    }
}
export default Admin;