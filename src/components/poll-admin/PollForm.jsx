import React, { useState } from "react";

import style from "./pollForm.module.css";
import RadioInput from "../utils/RadioInput";
import {
  createChoice,
  YES_NO,
  MULTIPLE_CHOICE,
  SINGLE_CHOICE
} from "../utils/Types";
import Choices from "./choices/Choices";
import Modal from "../utils/Modal";

const PollForm = props => {
  const [poll, setPoll] = useState(props.poll);
  const [required, setRequired] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const handleQuestionInput = e => {
    setPoll({
      ...poll,
      value: e.target.value
    });
  };

  const handleRadio = e => {
    setPoll({
      ...poll,
      type: e.target.value
    });
  };

  const handleRequiredInput = e => {
    setRequired(e.target.checked);
  };

  const addChoice = () => {
    setPoll({
      ...poll,
      choices: [...poll.choices, createChoice()]
    });
  };

  const deleteChoice = id => {
    setPoll({
      ...poll,
      choices: poll.choices.filter(choice => {
        return choice.id !== id;
      })
    });
  };

  const clearChoices = () => {
    setPoll({
      ...poll,
      choices: [createChoice(), createChoice()]
    });
  };

  const handleChoiceInput = (value, id) => {
    const newChoices = poll.choices.map(choice => {
      if (choice.id === id) {
        choice = {
          ...choice,
          value
        };
      }

      return choice;
    });

    setPoll({
      ...poll,
      choices: newChoices
    });
  };

  const toggleModal = () => {
    setModal(prevState => !prevState);
  };

  const deletePolls = () => {
    setModal(false);
    props.clearPolls();
  };

  const showError = text => {
    setError(text);
  };

  const reset = () => {
    setPoll(props.poll);
    setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    let newPoll;
    let questionIsIdentical;
    //let choiceIsIdentical;
    const questionValue = e.target.elements.question.value;

    if (poll.type === YES_NO) {
      newPoll = {
        ...poll,
        required,
        choices: [createChoice(), createChoice()]
      };
    } else {
      const filledInChoices = poll.choices.filter(choice => {
        return choice.value !== "";
      });
      //Form validation -- checks if at least two choices are filled
      if (filledInChoices.length < 2) {
        showError("At least two choices are required for submitting the form");
        return;
      }

      newPoll = {
        ...poll,
        required,
        choices: filledInChoices
      };
    }

    //Form validation -- checks for empty input
    if (poll.value === "") {
      showError("Field cannot be empty");
      return;
    }
    //Form validation -- checks for identical questions
    questionIsIdentical = props.polls.some(question => {
      return question.value === questionValue;
    });
    if (questionIsIdentical === true) {
      showError("You have already inserted this value");
      return;
    }

    // choiceIsIdentical = poll.choices.some((choice, index) => {
    //   if (e.target.elements.choice === undefined) {
    //     return;
    //   }

    //   return choice.value === e.target.elements.choice[index].value;
    // });

    //Submitting the form with data
    props.onSubmit(newPoll);
    //resetting form after submitting
    reset();
  };

  //destructuring variables off of poll
  const { value, type, isEdit } = poll;

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="inputId" className={style.title}>
          Question:
        </label>

        <input
          id="inputId"
          name="question"
          type="text"
          placeholder="Enter question..."
          className="input"
          value={value}
          onChange={handleQuestionInput}
        />

        <span htmlFor="" className={`${style.title} alignself-start`}>
          Answers:
        </span>

        <div className={style.inputGroup}>
          <label className={style.label}>
            <RadioInput
              value={YES_NO}
              type={type === YES_NO}
              onChange={handleRadio}
            />
            Yes/No
          </label>
          <label className={style.label}>
            <RadioInput
              value={MULTIPLE_CHOICE}
              type={type === MULTIPLE_CHOICE}
              onChange={handleRadio}
            />
            Multiple Choice
          </label>
          <label className={style.label}>
            <RadioInput
              value={SINGLE_CHOICE}
              type={type === SINGLE_CHOICE}
              onChange={handleRadio}
            />
            Single Choice
          </label>
          <label className={style.label}>
            <input
              type="checkbox"
              className="mr-1"
              onChange={handleRequiredInput}
            />
            Required
          </label>
        </div>
        {type !== YES_NO && (
          <Choices
            choices={poll.choices}
            handleChoiceInput={handleChoiceInput}
            addChoice={addChoice}
            deleteChoice={deleteChoice}
            clearChoices={clearChoices}
          />
        )}

        <div className={style.formBtns}>
          <button type="submit" className="btn btn-submit mr-3">
            {isEdit === false ? "Add Poll" : "Edit Poll"}
          </button>
          <button
            type="button"
            className="btn btn-blue-text"
            disabled={props.polls.length >= 1 ? false : true}
            onClick={
              isEdit === false ? toggleModal : () => props.toggleEdit(poll.id)
            }
          >
            {isEdit === false ? "- Clear Polls" : "Cancel"}
          </button>
        </div>
      </form>
      {modal && (
        <Modal
          deletePolls={deletePolls}
          toggleModal={toggleModal}
          text={"Are you sure you want to clear all the polls?"}
        />
      )}
      {error && <p className="error error-red">{error}</p>}
    </>
  );
};

export default PollForm;
