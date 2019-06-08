import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPoll } from "../utils/Types";
import {
  postPoll,
  deletePoll,
  clearPolls,
  toggleEdit,
  editPoll
} from "../../store/actions/pollActions";
import style from "./createPoll.module.css";
import PollForm from "./PollForm";
import Poll from "./Poll";

import spinner from "../imgAndSvg/GIF/spinner.gif";

const CreatePoll = ({
  polls,
  postPoll,
  deletePoll,
  clearPolls,
  toggleEdit,
  editPoll,
  auth: { authenticated },
  isLoadingPost,
  isLoadingDelete
}) => {
  if (!authenticated) return <Redirect to="/signin" />;

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
            onSubmit={postPoll}
            clearPolls={clearPolls}
          />

          {isLoadingPost && (
            <div style={{ gridColumn: "2" }} className="container-center">
              <img src={spinner} alt="spinner" style={{ width: "30px" }} />
            </div>
          )}
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
                  isLoadingDelete={isLoadingDelete}
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
    polls: state.polls.polls,
    isLoadingPost: state.polls.isLoadingPost,
    isLoadingDelete: state.polls.isLoadingDelete,
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postPoll: newPoll => dispatch(postPoll(newPoll)),
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
