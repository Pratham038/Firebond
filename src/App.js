import React, { useState } from 'react';

const MyComponent = () => {
  const [inputs, setInputs] = useState([{ variableName: 'Myarg', dropdownValue: 'false' }]);
  const [selectedInput, setSelectedInput] = useState('');

  const handleAddInput = () => {
    setInputs([...inputs, { variableName: '', dropdownValue: 'false' }]);
  };

  const handleVariableNameChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].variableName = e.target.value;
    setInputs(newInputs);
  };

  const handleDropdownChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].dropdownValue = e.target.value;
    setInputs(newInputs);
  };

  const handleSelectChange = (e) => {
    setSelectedInput(e.target.value);
  };

  const getLastDropdownValue = () => {
    if (selectedInput) {
      const selectedValues = selectedInput.split(':');
      return selectedValues[1];
    }
    return '';
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <label>
            Variable Name:
            <input
              type="text"
              value={input.variableName}
              onChange={(e) => handleVariableNameChange(e, index)}
            />
          </label>
          <br />
          <label>
            Dropdown:
            <select
              value={input.dropdownValue}
              onChange={(e) => handleDropdownChange(e, index)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          <hr />
        </div>
      ))}
      <select value={selectedInput} onChange={handleSelectChange}>
        {inputs.map((input, index) => (
          <option key={index} value={`${input.variableName}:${input.dropdownValue}`}>
            {input.variableName} - {input.dropdownValue}
          </option>
        ))}
      </select>
      <br/>
      <br/>

      <button onClick={handleAddInput}>Add Input</button>
      <div>Last Dropdown Value: {getLastDropdownValue()}</div>
    </div>
  );
};

export default MyComponent;
