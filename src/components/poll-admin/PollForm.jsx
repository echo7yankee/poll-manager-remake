import React, { useState } from "react";

import style from "./pollForm.module.css";
import Input from "../utils/Input";
import {
  createChoice,
  YES_NO,
  MULTIPLE_CHOICE,
  SINGLE_CHOICE,
  OTHER_CHOICE
} from "../utils/Types";
import Choices from "./choices/Choices";
import Modal from "../utils/Modal";
import spinner from "../imgAndSvg/GIF/spinner.gif";

const PollForm = props => {
  const [poll, setPoll] = useState(props.poll);
  const [required, setRequired] = useState(false);
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

  const reset = () => {
    setPoll(props.poll);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let newPoll;
    let questionIsIdentical;
    //let choiceIsIdentical;
    const questionValue = e.target.elements.question.value;

    if (poll.type === YES_NO || poll.type === OTHER_CHOICE) {
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
        return;
      }

      newPoll = {
        ...poll,
        required,
        choices: filledInChoices
      };
    }

    //Form validation -- checks for identical questions
    questionIsIdentical = props.polls.some(question => {
      return question.value === questionValue;
    });
    if (questionIsIdentical === true) {
      return;
    }

    //Submitting the form with data

    props.onSubmit(newPoll);
    //resetting form after submitting
    !poll.isEdit && reset();
  };

  const renderChoices = () => {
    if (type === YES_NO || type === OTHER_CHOICE) {
      return null;
    }

    return (
      <Choices
        choices={poll.choices}
        handleChoiceInput={handleChoiceInput}
        addChoice={addChoice}
        deleteChoice={deleteChoice}
        clearChoices={clearChoices}
      />
    );
  };

  //destructuring variables off of poll
  const { value, type, isEdit } = poll;

  console.log(poll.value);

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

        <span className={`${style.title} alignself-start`}>Answers:</span>

        <div className={style.inputGroup}>
          <label className={style.label}>
            <Input
              value={YES_NO}
              type={type === YES_NO}
              onChange={handleRadio}
              inputType="radio"
              className="mr-1"
            />
            Yes/No
          </label>
          <label className={style.label}>
            <Input
              value={MULTIPLE_CHOICE}
              type={type === MULTIPLE_CHOICE}
              onChange={handleRadio}
              inputType="radio"
              className="mr-1"
            />
            Multiple Choice
          </label>
          <label className={style.label}>
            <Input
              value={SINGLE_CHOICE}
              type={type === SINGLE_CHOICE}
              onChange={handleRadio}
              inputType="radio"
              className="mr-1"
            />
            Single Choice
          </label>
          <label className={style.label}>
            <Input
              value={OTHER_CHOICE}
              type={type === OTHER_CHOICE}
              onChange={handleRadio}
              inputType="radio"
              className="mr-1"
            />
            Other
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
        {renderChoices()}
        <div className={style.formBtns}>
          <button
            type="submit"
            className={
              isEdit === false
                ? `btn ${
                    props.isLoadingPost ? "btn-submit-disabled" : "btn-submit"
                  } mr-3`
                : `btn ${
                    props.flag ? "btn-submit-disabled" : "btn-submit"
                  } mr-3`
            }
          >
            {isEdit === false
              ? props.isLoadingPost && (
                  <img src={spinner} alt="spinner" className={style.spinner} />
                )
              : props.flag && (
                  <img src={spinner} alt="spinner" className={style.spinner} />
                )}

            {isEdit === false ? "Add Poll" : "Edit Poll"}
          </button>
          <button
            type="button"
            className={`btn ${
              props.isLoadingClear ? "btn-grey-text" : "btn-blue-text"
            }`}
            disabled={props.polls.length >= 1 ? false : true}
            onClick={
              isEdit === false ? toggleModal : () => props.toggleEdit(poll)
            }
          >
            {props.isLoadingClear && (
              <img src={spinner} alt="spinner" className={style.spinner} />
            )}
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
      {props.errors && <p className="error error-red">{props.errors.error}</p>}
    </>
  );
};

export default PollForm;
