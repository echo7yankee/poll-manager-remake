import React from "react";

import style from "./pollForm.module.css";
import pStyle from "./poll.module.css";
import { YES_NO, MULTIPLE_CHOICE, YES, NO } from "../utils/Types";
import { EditIcon, DeleteIcon } from "../imgAndSvg/SVG/icons";
import RadioInput from "../utils/RadioInput";

const Poll = ({
  poll,
  deletePoll,
  toggleEdit,
  showIcons,
  isDisabled,
  handleRadioInput,
  handleCheckboxInput,
  marginTop
}) => {
  return (
    <div className={`${pStyle.poll}`} style={{ marginTop }}>
      <span className={style.title}>
        {poll.required ? "*Question:" : "Question:"}
      </span>
      <span className={`${pStyle.text}`}>{poll.value}</span>
      <span className={`${style.title} ${pStyle.title}`}>Answers:</span>
      {showIcons && (
        <div className={pStyle.iconsContainer}>
          <span className="mr-2" onClick={() => toggleEdit(poll.id)}>
            <EditIcon icon="icon icon-green" />
          </span>
          <span onClick={() => deletePoll(poll.id)}>
            <DeleteIcon icon="icon icon-red" />
          </span>
        </div>
      )}
      <div className={style.inputGroup}>
        {poll.type === YES_NO ? (
          <div className="flex-align-center">
            {/* Reuse radioInput component */}

            <label className={`${pStyle.text} mr-1 flex-align-center`}>
              <RadioInput
                value={YES}
                checked={poll.radioValue === YES}
                onChange={e => handleRadioInput(poll.id, e.target.value)}
                name={poll.id}
                disabled={isDisabled}
              />
              Yes
            </label>

            <label className={`${pStyle.text} flex-align-center`}>
              <RadioInput
                value={NO}
                checked={poll.radioValue === NO}
                onChange={e => handleRadioInput(poll.id, e.target.value)}
                name={poll.id}
                disabled={isDisabled}
              />
              No
            </label>
          </div>
        ) : (
          <div className={`${pStyle.choices}`}>
            {/* MOVE THIS IN ANOTHER COMPONENT */}
            {poll.choices.map(choice => {
              //Extract logic in variables
              const checked =
                poll.type === MULTIPLE_CHOICE
                  ? null
                  : poll.radioValue === choice.value;
              const onChange =
                poll.type === MULTIPLE_CHOICE
                  ? e => handleCheckboxInput(poll.id, e)
                  : e => handleRadioInput(poll.id, e.target.value);
              return (
                <div key={choice.id} className="flex-align-center ">
                  <input
                    id={choice.value}
                    name={poll.id}
                    type={poll.type === MULTIPLE_CHOICE ? "checkbox" : "radio"}
                    className="mr-1"
                    value={choice.value}
                    checked={checked}
                    onChange={onChange}
                    disabled={isDisabled}
                  />
                  <label htmlFor={choice.value}>{choice.value}</label>
                </div>
              );
            })}
            {/* MOVE THIS IN ANOTHER COMPONENT */}
          </div>
        )}
      </div>
      {poll.showError && (
        <p className="error error-red justify-self-start">
          This question is required
        </p>
      )}
    </div>
  );
};

export default Poll;
