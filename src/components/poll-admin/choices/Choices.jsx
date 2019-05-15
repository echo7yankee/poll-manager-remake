import React from "react";

import style from "./choices.module.css";
import ChoiceItem from "./ChoiceItem";

const Choices = ({
  choices,
  handleChoiceInput,
  addChoice,
  deleteChoice,
  clearChoices
}) => {
  return (
    <div className={style.choices}>
      {choices.map((choice, index) => {
        return (
          <ChoiceItem
            key={choice.id}
            index={index + 1}
            choice={choice}
            handleChoiceInput={handleChoiceInput}
            deleteChoice={deleteChoice}
          />
        );
      })}

      <div className="container-center mt-2">
        <button
          type="button"
          className="btn btn-blue-text mr-3"
          onClick={addChoice}
        >
          + Add Choice
        </button>
        <button
          type="button"
          className="btn btn-blue-text"
          onClick={clearChoices}
        >
          - Clear Choices
        </button>
      </div>
    </div>
  );
};

export default Choices;
