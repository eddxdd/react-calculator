import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import * as math from "mathjs";

class App extends Component {
  constructor(props) {
    // Call super to extend the component class
    super(props);

    this.state = {
      input: "0",
      lastOperation: null
    };
  }

  /* State Changers */

  // To update, append it to the previous state + val
  // This way it adds to the val on display instead of updating it
  addToInput = val => {
    this.setState({
      input: this.state.input === "0" ? val : this.state.input + val,
      lastOperation: null
    });
  };

  // Mathjs evaluates the expression
  handleEqual = () => {
    this.setState(currentState => {
      // Do nothing if the last input isNaN
      if (isNaN(currentState.lastOperation)) {
        return currentState;
      }

      // Otherwise, evaluate
      return {
        input: math.evaluate(this.state.input)
      };
    });
  };

  // If there's a "." do nothing. Otherwise, add "."
  inputDot = () => {
    if (this.state.input.indexOf(".") === -1) {
      this.setState({
        input: this.state.input + "."
      });
    }
  };

  inputPercent = () => {
    this.setState({
      input: this.state.input / 100
    });
  };

  performOperation = operator => {
    this.setState(currentState => {
      // If isNaN, do nothing
      if (isNaN(currentState.lastOperation)) {
        return currentState;
      }

      // Update input and last operation
      return {
        input: currentState.input + operator,
        lastOperation: operator
      };
    });
  };

  toggleSign() {
    const newValue = parseFloat(this.state.input) * -1;

    this.setState({
      input: String(newValue)
    });
  }

  backSpace = () => {
    this.setState({ input: String(this.state.input).slice(0, -1) });
  };

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input.toLocaleString()}></Input>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "0" })}>
              AC
            </ClearButton>
            <Button handleClick={() => this.backSpace()}>⌫</Button>
            <Button handleClick={() => this.toggleSign()}>±</Button>
            <Button handleClick={() => this.performOperation("/")}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={() => this.performOperation("*")}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={() => this.performOperation("-")}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={() => this.performOperation("+")}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.inputDot()}>.</Button>
            <Button handleClick={() => this.inputPercent()}>%</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
