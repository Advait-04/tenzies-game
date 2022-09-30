import React from "react";
import Dice from "./components/Dice";

import "./App.css";
import "./components/dice.css";

import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
    const [dice, setDice] = React.useState(() => allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const fValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === fValue);
        if (allSameValue && allHeld) {
            setTenzies(true);
        }
    }, [dice]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    function rollDice() {
        if (!tenzies) {
            setDice((oldDie) =>
                oldDie.map((die) => {
                    return die.isHeld ? die : generateNewDie();
                })
            );
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    function holdDice(id) {
        setDice(
            dice.map((die) =>
                id === die.id
                    ? {
                          ...die,
                          isHeld: !die.isHeld,
                      }
                    : die
            )
        );
    }

    const diceElements = dice.map((die) => (
        <Dice
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    return (
        <main>
            {tenzies && <Confetti />}
            <div className="main-div">
                <div className="main-content">
                    <p className="title">Tenzies</p>
                    <p className="game-desc">
                        Roll until all dice are the same. Click each die to
                        freeze it at its current value between rolls.
                    </p>
                    <div className="dice-box">{diceElements}</div>
                    <button className="dice-roll" onClick={rollDice}>
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                </div>
            </div>
        </main>
    );
}

export default App;
