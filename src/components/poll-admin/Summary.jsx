import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import styleCreate from "./createPoll.module.css";
import style from "./summary.module.css";

const Summary = props => {
  const [polls, setPolls] = useState(props.polls);

  const toggleAccordion = id => {
    setPolls(
      polls.map(poll => {
        if (poll.id === id) {
          poll = {
            ...poll,
            toggle: !poll.toggle
          };
        }
        return poll;
      })
    );
  };

  return (
    <div className={styleCreate.container}>
      {polls.length === 0 ? (
        <div className="text-center">
          <p className="error error-red">
            There are no questions at the moment.
          </p>
        </div>
      ) : (
        polls.map((poll, index) => {
          return (
            <div key={poll.id}>
              <div
                className={`${
                  styleCreate.pollContainer
                }  no-row-gap cursor-pointer hover-darker border-none`}
                onClick={() => toggleAccordion(poll.id)}
              >
                <span
                  className={`${styleCreate.counter} ${
                    poll.toggle === true
                      ? styleCreate.counterRed
                      : styleCreate.counterGrey
                  }`}
                >
                  {index + 1}
                </span>
                <p className={style.title}>{poll.value}</p>
                <i
                  className={`arrow ${
                    poll.toggle === true ? "arrow-down" : "arrow-right"
                  }`}
                />
              </div>
              {props.answers.map(answer => {
                return (
                  <div
                    key={answer.answer[index].id}
                    className={`${styleCreate.pollContainer} ${
                      style.pollContainerSummary
                    } ${
                      poll.toggle === true ? style.show : style.hide
                    } no-row-gap `}
                  >
                    <ul className={`${style.items} `}>
                      <li className={style.item}>
                        <span className="mr-1">{answer.user.name}:</span>
                        {answer.answer[index].radioValue}
                        {answer.answer[index].checked.map(item => {
                          return item.value + " ";
                        })}{" "}
                        <p>{answer.answer[index].date}</p>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    polls: state.polls.polls,
    answers: state.answers.answers
  };
};

export default connect(
  mapStateToProps,
  null
)(Summary);
