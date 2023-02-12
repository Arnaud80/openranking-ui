import React from "react";
import './Rank.css';
import {VtmnIcon, VtmnLoader} from "@vtmn/react";

class Rank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users : null,
            isLoaded: false,
            identity: props.identity,
            handleAddMatch: props.onAddMatch,
        };

        console.log("Rank states : ")
        console.log(this.state);
    }

    componentDidMount() {
        const token = this.state.identity.tokenType + " " + this.state.identity.accessToken;

        fetch("http://localhost:8080/api/v1/users/user-ranking", {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        users: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    render() {
        const users = this.state.users;
        const isLoaded = this.state.isLoaded;
        const handleAddMatch = this.state.handleAddMatch;

        let toDisplay = <VtmnLoader size="medium" />
        if(isLoaded) {
            toDisplay =
                <div className="rank">
                    <table className="rank-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>ELO Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) =>
                                    <tr key={user.userId}>
                                        <td>
                                            {user.firstName}
                                        </td>
                                        <td>
                                            {user.lastName}
                                        </td>
                                        <td>
                                            {user.eloScore}
                                        </td>
                                        <td>
                                            <VtmnIcon
                                                size={24}
                                                value="edit-line"
                                                variant="default"
                                                onClick={() => handleAddMatch(user.userId)}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
        }
        return (toDisplay);
    }
}

/*
<tr>
                        <td className="rank-tdheadtable">Rank</td>
                        <td className="rank-tdheadtable">Player</td>
                        <td className="rank-tdheadtable">Points</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Arnaud</td>
                        <td>5000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Cristina</td>
                        <td>3000</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Laura</td>
                        <td>2000</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Charlotte</td>
                        <td>1500</td>
                    </tr>
 */

export default Rank;
