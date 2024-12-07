import { useState } from "react";
export default function UserInput({ label, name, initValue, onValueChange }) {

    const [value, setValue] = useState(initValue);

    function handleInput(event) {
        setValue(event.target.value);

        onValueChange(name, event.target.value);
    }

    return (

        <p>
            
            <label>{label}</label>
          
            <input type="number" value={value} onChange={handleInput}/>
        </p>
    )
}