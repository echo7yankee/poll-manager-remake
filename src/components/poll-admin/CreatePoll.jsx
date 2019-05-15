import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPoll } from "../utils/Types";
import {
  addPoll,
  deletePoll,
  clearPolls,
  toggleEdit,
  editPoll
} from "../../store/actions/pollActions";
import style from "./createPoll.module.css";
import PollForm from "./PollForm";
import Poll from "./Poll";

const CreatePoll = ({
  polls,
  auth,
  addPoll,
  deletePoll,
  clearPolls,
  toggleEdit,
  editPoll
}) => {
  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <>
      <div className={style.container}>
        <div className={style.pollContainer}>
          <h4>Add Poll</h4>
          <span
            style={{ marginTop: "7px" }}
            className={`${style.counter} ${style.counterRed}`}
          >
            {polls.length + 1}
          </span>
          <PollForm
            polls={polls}
            poll={createPoll()}
            onSubmit={addPoll}
            clearPolls={clearPolls}
          />
        </div>

        {polls.map((poll, index) => {
          return (
            <div key={poll.id} className={`${style.pollContainer} no-row-gap`}>
              <span
                className={
                  poll.isEdit === false
                    ? `${style.counter} ${style.counterGrey} mb-1`
                    : `${style.counter} ${style.counterRed} mt-1`
                }
              >
                {index + 1}
              </span>
              {poll.isEdit === false ? (
                <Poll
                  poll={poll}
                  deletePoll={deletePoll}
                  toggleEdit={toggleEdit}
                  showIcons={true}
                  isDisabled={true}
                />
              ) : (
                <PollForm
                  polls={polls}
                  poll={poll}
                  onSubmit={editPoll}
                  toggleEdit={toggleEdit}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    polls: state.polls.polls
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPoll: newPoll => dispatch(addPoll(newPoll)),
    deletePoll: id => dispatch(deletePoll(id)),
    clearPolls: () => dispatch(clearPolls()),
    toggleEdit: id => dispatch(toggleEdit(id)),
    editPoll: poll => dispatch(editPoll(poll))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePoll);
