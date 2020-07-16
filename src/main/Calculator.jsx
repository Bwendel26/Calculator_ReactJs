import React, { Component } from "react"
import "./Calculator.css"

import Button from "./../components/Button"
import Display from "./../components/Display"

const initialState = {
   displayValue: "0", //initial
   clearDisplay: false,
   operation: null,
   values: [0, 0],
   current: 0 //change de index of the array above.
}

export default class Calculator extends Component {

   state = { ...initialState } //clone the initialState object and atributed to state

   constructor(props) {
      super(props)
      this.clearMemory = this.clearMemory.bind(this)
      this.setOperation = this.setOperation.bind(this)
      this.addDigit = this.addDigit.bind(this)
   }

   clearMemory(){
      this.setState({ ...initialState })
   }
   setOperation(operation){
      if(this.state.current === 0){
         this.setState({ operation, current: 1, clearDisplay: true })
      } // changing the number slot(index) by clicking any operation number.
      else{
         const equals = operation === "="
         const currentOperation = this.state.operation

         const values = [...this.state.values]
         //*change the eval...
         try { 
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            values[0] = values[0].toFixed(4)
         } catch(e) {
            values[0] = this.state.values[0]
            values[0] = values[0].toFixed(4)
         }
         values[1] = 0

         this.setState({
            displayValue : values[0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: !equals,
            values
         })
      }
   }
   addDigit(n){
      if (n === "." && this.state.displayValue.includes(".")){
         return //ignore if you try to add more than one "."
      }
      //rule to takeoff the left zeros:
      const clearDisplay = this.state.displayValue === "0"
         || this.state.clearDisplay 
      
      const currentValue = clearDisplay ? "" : this.state.displayValue
      const displayValue = currentValue + n
      this.setState({ displayValue, clearDisplay: false })
         //same that displayValue: displayValue

      if (n !== "."){
         const i = this.state.current //index
         const newValue = parseFloat(displayValue)
         const values = [...this.state.values]
         values[i] = newValue
         this.setState({ values })
            //same that values: values
      }
   }

   render() {
      return (
         <div className="calculator">
            <Display value={this.state.displayValue}/>
            <Button label="AC" click={this.clearMemory} triple/>
            <Button label="/" click={this.setOperation} operation/>
            <Button label="7" click={this.addDigit}/>
            <Button label="8" click={this.addDigit}/>
            <Button label="9" click={this.addDigit}/>
            <Button label="*" click={this.setOperation} operation/>
            <Button label="4" click={this.addDigit}/>
            <Button label="5" click={this.addDigit}/>
            <Button label="6" click={this.addDigit}/>
            <Button label="-" click={this.setOperation} operation/>
            <Button label="1" click={this.addDigit}/>
            <Button label="2" click={this.addDigit}/>
            <Button label="3" click={this.addDigit}/>
            <Button label="+" click={this.setOperation} operation/>
            <Button label="0" click={this.addDigit} double/>
            <Button label="." click={this.addDigit}/>
            <Button label="=" click={this.setOperation} operation/>

         </div>
      )
   }
}