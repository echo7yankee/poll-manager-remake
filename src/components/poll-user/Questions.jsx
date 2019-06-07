import React, { useState } from "react";
import { connect } from "react-redux";
import { getAnswers } from "../../store/actions/answersActions";

import styleAdmin from "../poll-admin/createPoll.module.css";
import Poll from "../poll-admin/Poll";
import Notifications from "./Notifications";
import uuidv4 from "uuid/v4";

const Questions = props => {
  const [polls, setPolls] = useState(props.polls);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleInput = e => {
    setName(e.target.value);
  };

  const handleOtherInput = (value, id) => {
    setPolls(
      polls.map(poll => {
        if (poll.id === id) {
          poll = {
            ...poll,
            other: value,
            isChecked: true,
            showError: false
          };
        }
        return poll;
      })
    );
  };

  const handleRadioInput = (id, value) => {
    setPolls(
      polls.map(poll => {
        if (poll.id === id) {
          poll = {
            ...poll,
            radioValue: value,
            isChecked: true,
            showError: false
          };
        }

        return poll;
      })
    );
  };

  const handleCheckboxInput = (id, e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setPolls(
      polls.map(poll => {
        if (poll.id === id) {
          if (checked === true) {
            poll = {
              ...poll,
              checked: [...poll.checked, { id: uuidv4(), value }],
              isChecked: true,
              showError: false
            };
          } else {
            poll = {
              ...poll,
              checked: poll.checked.filter(item => item.value !== value)
            };
          }

          if (poll.checked.length === 0) {
            poll = {
              ...poll,
              isChecked: false
            };
          }
        }
        return poll;
      })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    let formHasErrors;
    const date = new Date().toLocaleString();

    formHasErrors = polls.some(poll => {
      return poll.required === true && poll.isChecked === false;
    });

    if (name === "") {
      setError(`Field cannot be empty`);
      return;
    } else {
      setError("");
    }

    if (formHasErrors === true) {
      setPolls(
        polls.map(poll => {
          if (poll.required === true && poll.isChecked === false) {
            poll = {
              ...poll,
              showError: true
            };
          }
          return poll;
        })
      );

      return;
    }

    const answer = polls.map(poll => {
      return {
        checked: poll.checked,
        radioValue: poll.radioValue,
        other: poll.other,
        id: uuidv4(),
        date
      };
    });

    const user = {
      name,
      date
    };

    const answers = {
      answer,
      user,
      id: uuidv4()
    };

    props.getAnswers(answers);
    setIsDisabled(true);
    setMessage("Form has been submitted successfully");
    setName("");
  };

  console.log(polls);

  return (
    <div className={styleAdmin.container}>
      {polls.length === 0 ? (
        <div className="text-center">
          <p className="error error-red">
            There are no questions at the moment.
          </p>
        </div>
      ) : (
        <>
          <Notifications polls={polls} />
          <form onSubmit={handleSubmit}>
            <div className={`${styleAdmin.pollContainer} no-row-gap `}>
              <input
                type="text"
                className="input"
                placeholder="Name..."
                style={{ gridColumn: "1 / span 2" }}
                value={name}
                onChange={handleInput}
              />
            </div>
            {polls.map((poll, index) => {
              return (
                <div
                  key={poll.id}
                  className={`${styleAdmin.pollContainer} no-row-gap no-border`}
                >
                  <span
                    className={`${styleAdmin.counter} ${
                      styleAdmin.counterGrey
                    }`}
                  >
                    {index + 1}
                  </span>
                  <Poll
                    poll={poll}
                    showIcons={false}
                    isDisabled={isDisabled}
                    handleRadioInput={handleRadioInput}
                    handleCheckboxInput={handleCheckboxInput}
                    handleOtherInput={handleOtherInput}
                    marginTop={"4px"}
                  />
                </div>
              );
            })}
            <div className={`${styleAdmin.pollContainer} no-row-gap `}>
              <button
                className={`btn btn-submit ${
                  isDisabled ? "btn-grey" : "btn-blue"
                }`}
                disabled={isDisabled}
              >
                Submit your questions
              </button>
              {message && (
                <span className="message message-green ">{message}</span>
              )}
              {error && (
                <span
                  className="error error-red"
                  style={{ alignSelf: "center" }}
                >
                  {error}
                </span>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    polls: state.polls.polls
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnswers: answer => dispatch(getAnswers(answer))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);
