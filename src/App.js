import React from "react";
import Login from './components/Login.js'
import Card from './components/Card.js'
import Rank from './components/Rank.js'
import {VtmnNavbar, VtmnButton, VtmnSearch} from "@vtmn/react";
import './App.css';
import Logo from "./components/Logo";
import '@vtmn/icons/dist/vitamix/font/vitamix.css';
import FormMatch from "./components/FormMatch";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            userIdentity: {},
            player2_firstName: "PLAYER2",
            player2_id: null,
        };
    }

    handleConnected(response) {
        this.setState({
            isConnected: true,
            userIdentity: response,
        });
        console.log("userIdentity : ")
        console.log(this.state.userIdentity);
    }

    handleClickOnDisconnect() {
        this.setState({
            isConnected: false,
            userIdentity: {},
        })
    }

    handleAddMatch = (userId) => {
        alert(userId);
    }

    render() {
        const isConnected = this.state.isConnected;
        const identity = this.state.userIdentity;
        console.log("identity = ");
        console.log(identity);
        //const firstName2 = "this.state.player2_firstName";
        return (
            isConnected ?
                <div className="App">
                    <VtmnNavbar
                        logo={<Logo />}
                        logoHref="#"
                        middleArea={<VtmnSearch />}
                        rightNav={
                            <div className="block">
                                <p className="vtmx-firstname">{identity.firstname}</p>
                                <VtmnButton
                                    iconAlone="user-line"
                                    size="medium"
                                    variant="primary-reversed"
                                />
                                <VtmnButton
                                    iconAlone="shut-down-line"
                                    size="medium"
                                    variant="primary-reversed"
                                    onClick={() => this.handleClickOnDisconnect()}
                                />
                                {/*<VtmnButton
                                    variant="primary"
                                    size="medium"
                                    iconAlone="menu-fill"
                                />*/}
                            </div>
                        }
                    />
                    <div className='action-cards'>
                        <table width="100%">
                            <tr>
                                <td align="center">
                                    <Card image="./hand_shake300x200.jpg" title="Saisir un match"/>
                                </td>
                                <td align="center">
                                    <Card image="./hand_shake300x200.jpg" title="Autre action"/>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="rank-screen">
                        <Rank identity={identity} onAddMatch={this.handleAddMatch}></Rank>
                    </div>
                    <div className="form-match">
                        <FormMatch ></FormMatch>
                    </div>
                </div>
            :
                <div>
                    <Login onConnected={(response) => this.handleConnected(response)} test='test'/>
                </div>
        );
    }
}

export default App;
