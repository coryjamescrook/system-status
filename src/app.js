import React, { Component } from 'react';
import $ from 'jquery'; // jQuery imported for simple AJAX API Call, Basic Animations, etc...
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
                    close_at: "2017-12-16T16:00:00.000000-05:00"
                },
                system_time: "2017-12-16T09:44:08.246774-05:00",
                direct_signup_allowed: true
            }
        };
    }
    
    doTime(time) {
        // Split time up into hours and minutes - for 12 hour time formatting
        var hour = time.split(":")[0];
        var minutes = time.split(":")[1];
        var amPM = (hour > 11) ? " pm" : " am";
        if(hour > 12) {
            hour -= 12;
        } else if(hour === 0) {
            hour = "12";
        }
        return hour + ":" + minutes + amPM;
    }
    
    doUpdate() {
        // Update the state with data from API endpoint
        $.ajax({
            url: 'https://app.akira.md/api/system_status',
            dataType: 'json',
            cache: false,
            success: function(response) {
                // Update state w/ system status api response
                this.setState({systemStatus: response});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }
    
    componentDidMount() {
        // Initial run of doUpdate()
        var self = this;
        this.doUpdate();
        // Run doUpdate() every 5 seconds to check for changes in API data
        setInterval(function() {
            self.doUpdate();
        }, 5000);
    }
    
    render() {
        // Set variable data to systemStatus object from state
        let data = this.state.systemStatus;
        let slice1 = 11;
        let slice2 = 16;
        let systemTime = this.doTime(data.system_time.slice(slice1, slice2));
        let openTime = this.doTime(data.open_hours_today.open_at.slice(slice1, slice2));
        let closeTime = this.doTime(data.open_hours_today.close_at.slice(slice1, slice2));
        let openClosed = "";
        // Determine if open or closed, set openClosed to values, and set colour class to open-closed h2 element
        if(data.is_open_for_business) {
            openClosed = "We're Open";
            $("#open-closed").attr("class","green");
        } else {
            openClosed = "We're Closed";
            $("#open-closed").attr("class","red");
        }
        
        return (
            <div className="App">
                <div className="header">
                    <img className="logo" src="./img/logo.png" alt="AKIRA"/>
                </div>
                <div className="container">
                    <div className="system-time">
                        <div>
                            <h2 id="open-closed">{openClosed}</h2>
                        </div>
                        <div>
                            <h1>{systemTime}</h1>
                        </div>
                    </div>
                    
                    <div className="open-hours">
                        <h3>Today's Hours:</h3>
                        <p className="time">
                            {openTime}
                        </p>
                        <p>to</p>
                        <p className="time">
                            {closeTime}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;