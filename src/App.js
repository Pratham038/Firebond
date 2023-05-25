import React, { useState } from 'react';

const MyComponent = () => {
  const [inputs, setInputs] = useState([{ variableName: '', dropdownValue: 'false' }]);
  const [selectedInput, setSelectedInput] = useState('');
  const [showSelectedValues, setShowSelectedValues] = useState(false);

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
    setShowSelectedValues(true);
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
      {showSelectedValues ? (
        <div>
          Selected Input:
          <div>
            {selectedInput.split(':')[0]} - {selectedInput.split(':')[1]}
          </div>
        </div>
      ) : (
        <select value={selectedInput} onChange={handleSelectChange}>
          <option disabled value="">
            Select
          </option>
          {inputs.map((input, index) => (
            <option key={index} value={`${input.variableName}:${input.dropdownValue}`}>
              {input.variableName} - {input.dropdownValue}
            </option>
          ))}
        </select>
      )}
      <button onClick={handleAddInput}>Add Input</button>
    </div>
  );
};

export default MyComponent;
