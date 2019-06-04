import React from "react";
import Input from "../utils/Input";
import {
  YES_NO,
  MULTIPLE_CHOICE,
  YES,
  NO,
  SINGLE_CHOICE,
  OTHER_CHOICE
} from "../utils/Types";

import pStyle from "./poll.module.css";

const PollType = ({
  poll,
  isDisabled,
  handleCheckboxInput,
  handleRadioInput,
  handleOtherInput
}) => {
  const renderPollType = () => {
    if (poll.type === YES_NO) {
      return (
        <div className="flex-align-center">
          {/* Reuse radioInput component */}

          <label className={`${pStyle.text} mr-1 flex-align-center`}>
            <Input
              value={YES}
              checked={poll.radioValue === YES}
              onChange={e => handleRadioInput(poll.id, e.target.value)}
              name={poll.id}
              inputType="radio"
              disabled={isDisabled}
            />
            Yes
          </label>

          <label className={`${pStyle.text} flex-align-center`}>
            <Input
              value={NO}
              checked={poll.radioValue === NO}
              onChange={e => handleRadioInput(poll.id, e.target.value)}
              name={poll.id}
              inputType="radio"
              disabled={isDisabled}
            />
            No
          </label>
        </div>
      );
    } else if (poll.type === OTHER_CHOICE) {
      return (
        <div className="flex-align-center">
          <label className={`${pStyle.text} flex-align-center`}>
            <Input
              value={poll.other}
              name={poll.id}
              inputType="text"
              placeHolder="Other..."
              className={pStyle.otherInput}
              onChange={e => handleOtherInput(e.target.value, poll.id)}
              disabled={isDisabled}
            />
          </label>
        </div>
      );
    } else if (poll.type === MULTIPLE_CHOICE || poll.type === SINGLE_CHOICE) {
      return (
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
      );
    }
  };

  return renderPollType();
};

export default PollType;
