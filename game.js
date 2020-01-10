class App extends React.Component {
    state = {
        isCircle: true,
        progressGame: ["", "", "", "", "", "", "", "", ""],
        isWinner: false,
        isRemis: false,
        winnerGame: []
    }

    handleClick = (e) => {
        let temp = e.target.id;
        const nArray = [...this.state.progressGame];
        nArray[temp] = this.state.isCircle === true ? "o" : "x"

        let pGame = nArray;
        let winner = false;
        let remis = false;
        let notEmptyField = 0;
        //let winner;

        pGame.forEach((item) => {
            if (item !== "") {
                notEmptyField++;
            }
        })

        if ((pGame[0] !== "" && pGame[0] === pGame[1] && pGame[1] === pGame[2]) ||
            (pGame[3] !== "" && pGame[3] === pGame[4] && pGame[4] === pGame[5]) ||
            (pGame[6] !== "" && pGame[6] === pGame[7] && pGame[7] === pGame[9]) ||
            (pGame[0] !== "" && pGame[0] === pGame[3] && pGame[3] === pGame[6]) ||
            (pGame[1] !== "" && pGame[1] === pGame[4] && pGame[4] === pGame[7]) ||
            (pGame[2] !== "" && pGame[2] === pGame[5] && pGame[5] === pGame[8]) ||
            (pGame[0] !== "" && pGame[0] === pGame[4] && pGame[4] === pGame[8]) ||
            (pGame[2] !== "" && pGame[2] === pGame[4] && pGame[4] === pGame[6])
        ) {
            //console.log(`wygrana dla ${this.state.isCircle === true ? "kółko" : "krzyżyk"}`)
            winner = true
            this.state.isCircle === true ? winner = "o" : winner = "x"
        } else if (notEmptyField == 2) {
            remis = true
            winner = "r"
        }
        console.log(notEmptyField)
        console.log(`remis ${remis}`)

        this.setState({
            isCircle: !this.state.isCircle,
            progressGame: nArray,
            isWinner: status,
            isRemis: remis
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
            isCircle: true,
            progressGame: ["", "", "", "", "", "", "", "", ""],
            isWinner: false,
            isRemis: false
        })
    }

    render() {
        return (
            <div className="container">
                <div className="information">
                    <ScoreBoard class={this.state.isWinner === true ? "none" : "boardScore"} player={this.state.isCircle === true ? "O" : "X"} />
                    <Winner class={this.state.isWinner ? "block winner" : "none"} winnerPlayer={this.state.isCircle === true ? "X" : "O"} />
                    <Remis class={this.state.isRemis ? "block remis" : "none"} />
                    <ResetButton class={this.state.isWinner ? "resetButton" : "none"} click={this.reset.bind(this)} />
                </div>
                <ContainerToSquares
                    isDisabled={this.state.isWinner}
                    content={this.drawBoards()}
                />

            </div>
        )
    }
}

const ResetButton = (props) => {
    return (
        <button className={props.class} onClick={props.click}>Zacznij jeszcze raz</button>
    )
}

const SingleSquare = (props) => {
    let classes = ["single-square"];
    if (props.isDisabled) {
        classes.push("disabled")
    }

    return (
        <div id={props.id} onClick={props.click} className={classes.join(" ")}>{props.content}</div>
    )
}

const ContainerToSquares = (props) => {
    let classes = ["squareContainer"];
    if (props.isDisabled) {
        classes.push("disabled")
    }

    return (
        <div className={classes.join(" ")}>{props.content}</div>
    )
}


const ScoreBoard = (props) => {
    return (
        <div className={props.class}>
            <span>{props.player} </span>-  Twój ruch!
        </div>
    )
}

const Winner = (props) => {
    return (
        <div className={props.class}>
            Wygrał: <span>{props.winnerPlayer}</span>
        </div>
    )
}

const Remis = (props) => {
    return (
        <div className={props.class}>REMIS</div>
    )
}


ReactDOM.render(<App />, document.getElementById("root"))