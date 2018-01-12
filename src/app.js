import React, { Component } from 'react';
import OpenHours from './components/OpenHours';
import SystemTime from './components/SystemTime';
import * as Api from './components/api.js';
import './index.css';

class App extends Component {
    constructor() {
        super();
        // SET A DEFAULT STATE
        this.state = {
            systemStatus: {
                online: false,
                is_open_for_business: false,
                open_hours_today: {
                    open_at: "2017-12-16T10:00:00.000000-05:00",
                    close_at: "2017-12-16T16:00:00.000000-10:00"
                },
                system_time: "2017-12-16T09:44:08.246774-05:00",
                direct_signup_allowed: true
            }
        };
    }
    
    async doStatus() {
        let currentStatus = await Api.getStatus();
        this.setState({systemStatus: currentStatus});
    }
    
    componentDidMount() {
        this.doStatus();
        
        setInterval(() => {
            this.doStatus();
        }, 5000);
    }
    
    render() {
        const status = this.state.systemStatus;
        
        return (
            <div className="App">
                <div className="header">
                    <img className="logo" src="./img/logo.png" alt="AKIRA"/>
                </div>
                <div className="container">
                    <SystemTime {...status} />
                    <OpenHours {...status} />
                </div>
            </div>
        );
    }
}

export default App;