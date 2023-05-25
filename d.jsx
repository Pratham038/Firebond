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
          <label>
            Variable Name 1:
            <select>
              {inputs.map((input, index) => (
                <option key={index} value={input.variableName}>
                  {input.variableName}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Variable Name 2:
            <select>
              {inputs.map((input, index) => (
                <option key={index} value={input.variableName}>
                  {input.variableName}
                </option>
              ))}
            </select>
          </label>
          <br />
        </>
      );
    }
    return null;
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
      {renderAdditionalDropdowns()}
      <select value={selectedInput} onChange={handleSelectChange}>
        {inputs.map((input, index) => (
          <option key={index} value={`${input.variableName}:${input.dropdownValue}`}>
            {input.variableName} - {input.dropdownValue}
          </option>
        ))}
        <option value="">Select</option>
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>
      <button onClick={handleResetDropdown} disabled={!selectedInput && resetDropdown}>
        Reset Dropdown
      </button>
      <br />
      <br />
      <button onClick={handleAddInput}>Add Input</button>
      <div>Last Dropdown Value: {getLastDropdownValue()}</div>
    </div>
  );
};

export default MyComponent; now in the last line , show boolean value
, if and is selected perform and operation on values of Variable Name 1 and Variable Name 2 ,if or is selected perform or operation on values of Variable Name 1 and Variable Name 2 