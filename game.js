class App extends React.Component {
    state = {
        isCircle: true,
        progressGame: ["", "", "", "", "", "", "", "", ""],
        isWinner: false,
        isRemis: false,
        buttonResetVisible: false,
        whosTurn: true,
        winnerGame: []
    }

    handleClick = (e) => {
        let temp = e.target.id;
        const nArray = [...this.state.progressGame];
        nArray[temp] = this.state.isCircle === true ? "O" : "X"

        let pGame = nArray;
        let winner = false;
        let remis = false;
        let notEmptyField = 0;

        //let first = true;

        pGame.forEach((item) => {
            if (item !== "") {
                notEmptyField++;
            }
        })

        if ((pGame[0] !== "" && pGame[0] === pGame[1] && pGame[1] === pGame[2]) ||
            (pGame[3] !== "" && pGame[3] === pGame[4] && pGame[4] === pGame[5]) ||
            (pGame[6] !== "" && pGame[6] === pGame[7] && pGame[7] === pGame[8]) ||
            (pGame[0] !== "" && pGame[0] === pGame[3] && pGame[3] === pGame[6]) ||
            (pGame[1] !== "" && pGame[1] === pGame[4] && pGame[4] === pGame[7]) ||
            (pGame[2] !== "" && pGame[2] === pGame[5] && pGame[5] === pGame[8]) ||
            (pGame[0] !== "" && pGame[0] === pGame[4] && pGame[4] === pGame[8]) ||
            (pGame[2] !== "" && pGame[2] === pGame[4] && pGame[4] === pGame[6])
        ) {

            this.state.isCircle === true ? winner = "o" : winner = "x"
            this.setState({
                isCircle: !this.state.isCircle,
                progressGame: nArray,
                isWinner: winner,
                buttonResetVisible: true,
                winnerGame: [...this.state.winnerGame, winner]
            })
            return

        }
        else if (notEmptyField == 9) {
            winner = "r";
            this.setState({
                // isCircle: !this.state.isCircle,
                isCircle: this.state.progressGame[0] == "O" ? false : true,
                progressGame: nArray,
                isWinner: false,
                buttonResetVisible: true,
                isRemis: true,
                winnerGame: [...this.state.winnerGame, winner]
            })
            return

        }

        this.setState({
            isCircle: !this.state.isCircle,
            progressGame: nArray,
            isWinner: winner
        })

    }

    drawBoards() {
        const squares = this.state.progressGame.map((item, index) => {
            return <SingleSquare
                key={index}
                id={index}
                content={item}
                click={this.handleClick}
                isDisabled={this.state.progressGame[index] !== "" ? true : false} />
        })
        return squares;
    }


    reset() {
        this.setState({
            isCircle: this.state.progressGame[0] == "O" ? false : true,
            //isCircle: !this.state.isCircle,
            progressGame: ["", "", "", "", "", "", "", "", ""],
            isWinner: false,
            isRemis: false,
            buttonResetVisible: false
        })
    }

    render() {
        return (
            <div className="container">
                <div className="information">
                    <ScoreBoard
                        class={this.state.isWinner === true ? "none" : `boardScore ${this.state.isCircle === true ? "o" : "x"}`}
                        winner0={(this.state.winnerGame.filter(item => item === "o")).length}
                        winnerX={(this.state.winnerGame.filter(item => item === "x")).length}
                    />
                    <Winner class={this.state.isWinner ? "block winner" : "none"} winnerPlayer={this.state.isCircle === true ? "X" : "O"} />
                    <Remis class={this.state.isRemis ? "block remis" : "none"} />
                    <ResetButton class={this.state.buttonResetVisible ? "resetButton" : "none"} click={this.reset.bind(this)} />
                </div>
                <ContainerToSquares
                    isDisabled={this.state.isWinner || this.state.isRemis}
                    content={this.drawBoards()}
                />

            </div>
        )
    }
}

const ResetButton = props => {
    return (
        <button className={props.class} onClick={props.click}>Zacznij jeszcze raz</button>
    )
}

const SingleSquare = props => {
    let classes = ["single-square"];
    if (props.isDisabled) {
        classes.push("disabled")
    }

    return (
        <div id={props.id} onClick={props.click} className={classes.join(" ")}>{props.content}</div>
    )
}

const ContainerToSquares = props => {
    let classes = ["squareContainer"];
    if (props.isDisabled) {
        classes.push("disabled")
    }

    return (
        <div className={classes.join(" ")}>{props.content}</div>
    )
}


const ScoreBoard = props => {
    return (
        <div className={props.class}>
            <div className={"circle"}><span>O</span> <span className="sign">: </span>{props.winner0}</div>
            <div className={"cross"}><span>X</span> <span className="sign">:</span> {props.winnerX}</div>
        </div >
    )
}

const Winner = props => {
    return (
        <div className={props.class}>
            Wygrał: <span>{props.winnerPlayer}</span>
        </div>
    )
}

const Remis = props => {
    return (
        <div className={props.class}>REMIS</div>
    )
}


ReactDOM.render(<App />, document.getElementById("root"))