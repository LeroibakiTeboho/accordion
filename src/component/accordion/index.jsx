import { useState } from "react";
import data from "./data";
import "./style.css";

function Accordian() {
  // || useStates
  const [selected, setSelected] = useState(null);
  const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
  const [multiple, setMutiple] = useState([]);

  // || handlers
  function handleSingleSection(id) {
    setSelected(id === selected ? null : id);
  }
  function HandleMultipleSelection(id) {
    const cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(id);

    if (findIndexOfCurrentId === -1) cpyMultiple.push(id);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    setMutiple(cpyMultiple);
  }

  return (
    // || wrapper
    <div className="acc-wrapper">
      {/* || button */}
      <button
        onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}
      >
        Enable Mult Selection
      </button>

      {/* || accordion */}
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              {/* || title */}
              <div
                onClick={
                  enableMultipleSelection
                    ? () => HandleMultipleSelection(dataItem.id)
                    : () => handleSingleSection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>
                  {enableMultipleSelection
                    ? multiple.includes(dataItem.id)
                      ? "-"
                      : "+"
                    : selected === dataItem.id
                    ? "-"
                    : "+"}
                </span>
              </div>
              {enableMultipleSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
