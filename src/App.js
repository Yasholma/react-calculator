import React from "react";

import "./App.css";
import Button from "./Button";
import logo from "./logo.png";

const buttons = {
    clear: "AC",
    divide: "/",
    multiply: "x",
    subtract: "-",
    add: "+",
    equals: "=",
    decimal: ".",
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
};

const computeResult = value => {
    // return;
    return eval(value);
};

function App() {
    const [mode, setMode] = React.useState(true);
    let [current, setCurrent] = React.useState("");
    let [oldResult, setOldResult] = React.useState(0);
    let [display, setDisplay] = React.useState("0");
    const [equalOpUsed, setEqualOpUsed] = React.useState(false);

    const getId = id => {
        let value = buttons[id];

        if (value === "x") {
            value = "*";
        }

        if (value === "AC") {
            setCurrent("");
            setDisplay("0");
            setOldResult(0);
        } else if (value === "=") {
            if (current.toString().search(/=/g) === -1) {
                let result = computeResult(current);
                setCurrent((current += `= ${result}`));
                setDisplay(result);
                setOldResult(result);
                setEqualOpUsed(true);
            }
            return;
        } else if (oldResult) {
            if (["+", "/", "*", "-"].includes(value)) {
                setCurrent(oldResult + value);
            } else if (value === ".") {
                return;
            } else {
                setCurrent(value);
            }
            setDisplay(value);
            setOldResult(0);
            setEqualOpUsed(false);
        } else {
            if ((current === "" && display === "0") || equalOpUsed) {
                if (["/", "*", "."].includes(value)) {
                    return;
                }
                setCurrent(value);
                setDisplay(value);
            } else {
                if (["+", "/", "*", "-"].includes(value)) {
                    if (
                        (display.toString().match(/\+|\*|\/|-/g) || []).length <
                        1
                    ) {
                        setCurrent((current += value.toString()));
                    }
                } else if (value === ".") {
                    if (display.toString().search(/\./g) === -1) {
                        setCurrent((current += value.toString()));
                    }
                } else {
                    setCurrent((current += value.toString()));
                }

                if (
                    ["+", "/", "*", "-"].includes(value) ||
                    ["+", "/", "*", "-"].includes(display)
                ) {
                    setDisplay(value);
                } else if (value === ".") {
                    if ((display.toString().match(/\./g) || []).length < 1) {
                        setDisplay((display += value.toString()));
                    }
                } else {
                    setDisplay((display += value.toString()));
                }
            }
            setEqualOpUsed(false);
        }
    };

    return (
        <div className={`App ${!mode ? "dark" : ""}`}>
            <div className="brand">
                <img src={logo} alt="reactCtech" />
                <p>
                    Coded By{" "}
                    <a
                        href="https://twitter.com/yasholma"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Cybertech Yasholma
                    </a>
                </p>
            </div>
            <div className={`calc-body ${!mode ? "dark" : ""}`}>
                <div className="display">
                    <div className="current">{current}</div>
                    <div id="display">{display}</div>
                </div>
                <div className="buttons">
                    {Object.keys(buttons).map(btn => (
                        <Button
                            key={buttons[btn]}
                            id={btn}
                            label={buttons[btn]}
                            clickCallback={getId}
                        />
                    ))}
                </div>
                <button
                    className={`mode ${!mode ? "dark" : ""}`}
                    onClick={() => setMode(!mode)}
                >
                    {mode ? "Light" : "Dark"}
                </button>
            </div>
        </div>
    );
}

export default App;
