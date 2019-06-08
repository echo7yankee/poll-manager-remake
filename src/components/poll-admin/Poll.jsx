import React from "react";

import style from "./pollForm.module.css";
import pStyle from "./poll.module.css";
import { EditIcon, DeleteIcon } from "../imgAndSvg/SVG/icons";

import PollType from "./PollType";

import spinner from "../imgAndSvg/GIF/spinner.gif";

const Poll = ({
  poll,
  deletePoll,
  toggleEdit,
  showIcons,
  isDisabled,
  handleRadioInput,
  handleCheckboxInput,
  handleOtherInput,
  marginTop,
  isLoadingDelete
}) => {
  console.log(isLoadingDelete);

  return (
    <div className={`${pStyle.poll}`} style={{ marginTop }}>
      <span className={style.title}>
        {poll.required ? "*Question:" : "Question:"}
      </span>
      <span className={`${pStyle.text}`}>{poll.value}</span>
      <span className={`${style.title} ${pStyle.title}`}>Answers:</span>
      {showIcons &&
        (isLoadingDelete ? (
          <img
            src={spinner}
            alt="spinner"
            style={{ gridColumn: "3", gridRow: "1", width: "30px" }}
          />
        ) : (
          <div className={pStyle.iconsContainer}>
            <span className="mr-2" onClick={() => toggleEdit(poll.id)}>
              <EditIcon icon="icon icon-green" />
            </span>
            <span onClick={() => deletePoll(poll.id)}>
              <DeleteIcon icon="icon icon-red" />
            </span>
          </div>
        ))}
      <div className={style.inputGroup}>
        <PollType
          poll={poll}
          isDisabled={isDisabled}
          handleRadioInput={handleRadioInput}
          handleCheckboxInput={handleCheckboxInput}
          handleOtherInput={handleOtherInput}
        />
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
