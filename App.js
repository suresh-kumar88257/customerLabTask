import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newSchema, setNewSchema] = useState("");
  const [filters, setFilters] = useState({
    userTraits: "",
    groupTraits: "",
    addSchema: "",
  });

  const userTraitsOptions = [
    "First Name",
    "Last Name",
    "Gender",
    "Age",
    "Account Name",
    "City",
    "State",
  ];
  const groupTraitsOptions = [
    "Group Trait 1",
    "Group Trait 2",
    "Group Trait 3",
    "Group Trait 4",
    "Group Trait 5",
  ];

  const handleSaveSegment = () => {
    // Validate segment name and send data to the server
    const dataToSend = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.toLowerCase().replace(/\s+/g, "_")]: schema,
      })),
    };
    console.log(dataToSend);
  };

  const handleAddNewSchemaDropdown = () => {
    if (newSchema) {
      setSelectedSchemas([...selectedSchemas, newSchema]);
      setNewSchema("");
      setFilters({ ...filters, addSchema: "" });
    }
  };

  const handleRemoveSchema = (schemaToRemove) => {
    setSelectedSchemas(
      selectedSchemas.filter((schema) => schema !== schemaToRemove)
    );
  };

  const handleFilterTraits = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  return (
    <div className="App">
      <button className="saveButton" onClick={() => setShowPopup(true)}>
        Save Segment
      </button>
      {showPopup && (
        <div className="popup">
          <h4>Enter the name of the segment</h4>
          <input
            type="text"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name of the segment"
            className="segmentInput"
          />
          <div>
            To save your segment, you need to add the schemas to build the query
          </div>
          <div className="circleAlignment end">
            <div className="circleAlignment">
              <div className="circleUser"></div>
              <div>- User Traits</div>
            </div>
            <div className="circleAlignment">
              <div className="circleGroup"></div>
              <div>- Group Traits</div>
            </div>
          </div>
          <div className="dropdownContainer">
            <div className="trait-border">
              <div className="dropdown userTraits">
                <div className="circleUser traits"></div>
                <select
                  value={filters.userTraits}
                  onChange={(e) =>
                    handleFilterTraits("userTraits", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  {userTraitsOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {filters.userTraits && (
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="removeIcon"
                    onClick={() => setFilters({ ...filters, userTraits: "" })}
                  />
                )}
              </div>
              <div className="dropdown groupTraits">
                <div className="circleGroup traits"></div>
                <select
                  value={filters.groupTraits}
                  onChange={(e) =>
                    handleFilterTraits("groupTraits", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  {groupTraitsOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {filters.groupTraits && (
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="removeIcon"
                    onClick={() => setFilters({ ...filters, groupTraits: "" })}
                  />
                )}
              </div>
              {selectedSchemas.map((schema, index) => (
                <div key={index} className="">
                  <div className="dropdown addSchema">
                    <div className="addschemaCircle"></div>
                    <select value={schema}>
                      <option value={schema}>{schema}</option>
                    </select>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="removeIcon"
                      onClick={() => handleRemoveSchema(schema)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="addSchema-space">
              <div className="dropdown addSchema">
                <div className="addschemaCircle"></div>
                <select
                  value={newSchema}
                  onChange={(e) => setNewSchema(e.target.value)}
                >
                  <option value="">Select</option>
                  {[...userTraitsOptions, ...groupTraitsOptions]
                    .filter((option) => !selectedSchemas.includes(option))
                    .map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
                {newSchema && (
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="removeIcon"
                    onClick={() => setNewSchema("")}
                  />
                )}
              </div>
              <a
                href="#"
                onClick={handleAddNewSchemaDropdown}
                className="addSchemaLink"
              >
                + Add new schema
              </a>
            </div>
          </div>
          <div className="buttonsContainer">
            <button onClick={handleSaveSegment} className="saveSegmentButton">
              Save the Segment
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="cancelButton"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
