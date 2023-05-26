import React, { useState } from 'react';
import './styles.css';

const MyComponent = () => {
  const [inputs, setInputs] = useState([{ variableName: 'Myarg', dropdownValue: 'false' }]);
  const [selectedInput, setSelectedInput] = useState('');
  const [resetDropdown, setResetDropdown] = useState(true);

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
    setSelectedInput(e.target.value);
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

  const handleResetDropdown = () => {
    setSelectedInput('');
    setResetDropdown(true);
  };

  const renderAdditionalDropdowns = () => {
    if (selectedInput === 'and' || selectedInput === 'or') {
      return (
        <>
          <div className="input-group">
            <label className="label">Variable Name 1:</label>
            <select className="dropdown">
              {inputs.map((input, index) => (
                <option key={index} value={input.variableName}>
                  {input.variableName}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label className="label">Variable Name 2:</label>
            <select className="dropdown">
              {inputs.map((input, index) => (
                <option key={index} value={input.variableName}>
                  {input.variableName}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    }
    return null;
  };

  const performOperation = () => {
    if (selectedInput === 'and') {
      const variableName1 = inputs[0]?.dropdownValue === 'true';
      const variableName2 = inputs[1]?.dropdownValue === 'true';
      // Perform AND operation on variableName1 and variableName2
      const result = variableName1 && variableName2;
      return result.toString(); // Return true or false as a string
    }
    if (selectedInput === 'or') {
      const variableName1 = inputs[0]?.dropdownValue === 'true';
      const variableName2 = inputs[1]?.dropdownValue === 'true';
      // Perform OR operation on variableName1 and variableName2
      const result = variableName1 || variableName2;
      return result.toString(); // Return true or false as a string
    }
    return null;
  };

  return (
    <div className="container">
      {inputs.map((input, index) => (
        <div className="input-group" key={index}>
          <label className="label">Variable Name:</label>
          <input
            type="text"
            className="input-field"
            value={input.variableName}
            onChange={(e) => handleVariableNameChange(e, index)}
          />
          <br />
          <label className="label">Dropdown:</label>
          <select
            className="dropdown"
            value={input.dropdownValue}
            onChange={(e) => handleDropdownChange(e, index)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <hr />
        </div>
      ))}
      {renderAdditionalDropdowns()}
      <select className="dropdown" value={selectedInput} onChange={handleSelectChange}>
        {inputs.map((input, index) => (
          <option key={index} value={`${input.variableName}:${input.dropdownValue}`}>
            {input.variableName} - {input.dropdownValue}
          </option>
        ))}
        <option value="">Select</option>
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>
      <button className="button" onClick={handleResetDropdown} disabled={!selectedInput && resetDropdown}>
        Reset Dropdown
      </button>
      <br />
      <br />
      <button className="button" onClick={handleAddInput}>Add Input</button>
      {/* <div>Last Dropdown Value: {getLastDropdownValue()}</div> */}
      <div className="result">Result: {performOperation()}</div>
    </div>
  );
};

export default MyComponent;
