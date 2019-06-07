import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import styleCreate from "./createPoll.module.css";
import style from "./summary.module.css";

const Answers = props => {
  const [answers, setAnswers] = useState(props.answers);
  dayjs.extend(relativeTime);

  const toggleAccordion = id => {
    setAnswers(
      answers.map(answer => {
        if (answer.id === id) {
          answer = {
            ...answer,
            toggle: !answer.toggle
          };
        }
        return answer;
      })
    );
  };

  if (!props.auth.authenticated) return <Redirect to="/signin" />;

  return (
    <div className={styleCreate.container}>
      {answers.length === 0 ? (
        <div className="text-center">
          <p className="error error-red">There are no answers at the moment.</p>
        </div>
      ) : (
        answers.map((answer, indexAnswer) => {
          return (
            <div key={answer.id}>
              <div
                className={`${
                  styleCreate.pollContainer
                }   no-row-gap cursor-pointer hover-darker-grey border-none`}
                onClick={() => toggleAccordion(answer.id)}
              >
                <span
                  className={`${styleCreate.counter} ${
                    answer.toggle === true
                      ? styleCreate.counterRed
                      : styleCreate.counterGrey
                  }`}
                >
                  {indexAnswer + 1}
                </span>
                <p className={style.title}>{answer.user.name}</p>

                <span style={{ gridColumn: "2" }}>{answer.user.date}</span>
                <span style={{ gridColumn: "2" }}>
                  {dayjs(answer.user.date).fromNow()}
                </span>
                <i
                  className={`arrow ${
                    answer.toggle === true ? "arrow-down" : "arrow-right"
                  }`}
                  style={{ gridRow: "1 / span 2 " }}
                />
              </div>
              {props.polls.map((poll, index) => {
                return (
                  <div
                    key={poll.id}
                    className={`${styleCreate.pollContainer} ${
                      style.pollContainerSummary
                    } ${
                      answer.toggle === true ? style.show : style.hide
                    } no-row-gap`}
                  >
                    <ul className={style.items}>
                      <li className={style.item}>
                        <p style={{ fontWeight: "500" }}>{poll.value}</p>
                        <span>{answer.answer[index].radioValue}</span>
                        <span>{answer.answer[index].other}</span>
                        <span>
                          {answer.answer[index].checked.map(item => {
                            return item.value + " ";
                          })}
                        </span>
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
    answers: state.answers.answers,
    polls: state.polls.polls,
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(Answers);
