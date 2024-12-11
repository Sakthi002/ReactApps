import { useState } from "react";
import Result from "./components/Result";
import UserInput from "./components/UserInput"
import { calculateInvestmentResults, formatter } from "./util/investment";

const initValues = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
}

function App() {

  function handleValues(name, value) {
    
    setValues((prevValues) => {

      const updatedValues = { ...prevValues };
      updatedValues[name] = parseFloat(value);

      return updatedValues;
    })
  }

  const [values, setValues] = useState(initValues);

  const investmentResults = calculateInvestmentResults(values);
  
  return (
    <>
      
      <section id="user-input">
        
        <div className="input-group">

          <UserInput label="INITIAL INVESTMENT" name="initialInvestment" initValue={values['initialInvestment']} onValueChange={handleValues}/>
          <UserInput label="ANNUAL INVESTMENT" name="annualInvestment" initValue={initValues['annualInvestment']} onValueChange={handleValues}/>
        </div>

        <div className="input-group">

          <UserInput label="EXPECTED RETURN" name="expectedReturn" initValue={values['expectedReturn']} onValueChange={handleValues}/>
          <UserInput label="DURATION" name="duration" initValue={values['duration']} onValueChange={handleValues}/>
        </div>
      </section>
    
      {investmentResults.length && <Result results={investmentResults}></Result>}
    </>
  )
}

export default App
