import React from "react";
import style from "./choices.module.css";
import { DeleteIcon } from "../../imgAndSvg/SVG/icons";

const ChoiceItem = ({ index, choice, handleChoiceInput, deleteChoice }) => {
  return (
    <div className={style.inputGroup}>
      <label htmlFor={`choice${index}`}>Choice #{index}:</label>
      <input
        id={`choice${index}`}
        name="choice"
        type="text"
        className="input"
        value={choice.value}
        onChange={e => handleChoiceInput(e.target.value, choice.id)}
      />
      {index >= 3 ? (
        <span onClick={() => deleteChoice(choice.id)}>
          <DeleteIcon icon="icon icon-red" />
        </span>
      ) : null}
    </div>
  );
};
export default ChoiceItem;
