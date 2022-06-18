import React from "react";
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //image: './hand_shake300x200.jpg',
            /*<!--<img src={image} alt="Saisir un match" />-->*/
        };
    }

    render() {
        const image = this.props.image;
        const title = this.props.title;
        return (
            <div className="card" onClick={()=> {alert("test")}}>
                <div className="img_card">
                    <img src={image} alt="Saisir un match" />
                </div>
                <div className="card_title">
                    <p>{title}</p>
                </div>
            </div>
        );
    }
}

export default Card;
