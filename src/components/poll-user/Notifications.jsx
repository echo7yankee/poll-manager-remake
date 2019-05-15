import React from "react";
import style from "./notifications.module.css";

const Notifications = ({ polls }) => {
  const requiredPolls = polls.filter(poll => {
    return poll.required;
  });
  const checkedPolls = polls.filter(poll => {
    return poll.required && poll.isChecked;
  });

  if (checkedPolls.length === requiredPolls.length) {
    return (
      <div className={style.notifications}>
        <p>
          Thank you for answering the questions.You can now submit the form!
        </p>
      </div>
    );
  } else if (checkedPolls.length === 0) {
    return (
      <div className={style.notifications}>
        <p>Please start answering the questions</p>
      </div>
    );
  } else {
    return (
      <div className={style.notifications}>
        <p>
          You have completed{" "}
          <span className={style.highlight}> {checkedPolls.length} </span> out
          of <span className={style.highlight}> {requiredPolls.length}</span>{" "}
          required questions
        </p>
      </div>
    );
  }
};

export default Notifications;
