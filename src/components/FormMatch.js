import React from "react";
import './Rank.css';
import {VtmnButton, VtmnTextInput} from "@vtmn/react";
//import axios from "axios";

class FormMatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstNamePlayer1 : 'Player1',
            firstNamePlayer2 : 'Player2',
            score: [
                Array(2),
                Array(2),
                Array(2)
            ]
        };
    }

    handleChangeSet(event, set, player) {
        let score = this.state.score;
        score[set - 1][player - 1] = event.target.value;

        alert(score);
        this.setState(score);
    }

    handleSubmitForm(event) {
        /*axios.post('http://localhost:8080/api/auth/signin', {
            username: this.state.username,
            password: this.state.password,
        })
            .then((response) => {
                this.props.onConnected(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();*/
        alert("form sent");
    }

    render() {
        //const users = this.state.users;
        //const isLoaded = this.state.isLoaded;

        let form =
            <div className="identity">
            <form onSubmit={(event) => this.handleSubmitForm(event)}>
                    <VtmnTextInput
                        identifier='set1-1'
                        type="text"
                        labelText={"Set 1 - " + this.state.firstNamePlayer1}
                        placeholder="0-7"
                        value={this.state.score[0][0]}
                        onChange={(event) => this.handleChangeSet(event,1, 1)}
                    />
                    <VtmnTextInput
                        identifier='set1-2'
                        type="text"
                        labelText={"Set 1 - " + this.state.firstNamePlayer2}
                        placeholder="0-7"
                        value={this.state.score[0][1]}
                        onChange={(event) => this.handleChangeSet(event,1, 2)}
                    />
                    <VtmnTextInput
                        identifier='set2-1'
                        type="text"
                        labelText={"Set 2 - " + this.state.firstNamePlayer1}
                        placeholder="0-7"
                        value={this.state.score[1][0]}
                        onChange={(event) => this.handleChangeSet(event, 2, 1)}
                    />
                    <VtmnTextInput
                        identifier='set2-2'
                        type="text"
                        labelText={"Set 2 - " + this.state.firstNamePlayer2}
                        placeholder="0-7"
                        value={this.state.score[1][1]}
                        onChange={(event) => this.handleChangeSet(event, 2, 2)}
                    />
                    <VtmnTextInput
                        identifier='set3-1'
                        type="text"
                        labelText={"Set 3 - " + this.state.firstNamePlayer1}
                        placeholder="0-7"
                        value={this.state.score[2][0]}
                        onChange={(event) => this.handleChangeSet(event, 3, 1)}
                    />
                    <VtmnTextInput
                        identifier='set3-2'
                        type="text"
                        labelText={"Set 3 - " + this.state.firstNamePlayer2}
                        placeholder="0-7"
                        value={this.state.score[2][1]}
                        onChange={(event) => this.handleChangeSet(event, 3, 2)}
                    />

                    <VtmnButton type="submit" value="Submit">Save</VtmnButton>
                </form>
            </div>
        return (form);
    }
}

export default FormMatch;
