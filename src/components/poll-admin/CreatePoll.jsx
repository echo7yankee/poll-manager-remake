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
  polls: { isLoadingClear, isLoadingGet, isLoadingPost, errors, polls },
  postPoll,
  deletePoll,
  clearPolls,
  toggleEdit,
  editPoll,
  auth: { authenticated }
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
            isLoadingPost={isLoadingPost}
            isLoadingClear={isLoadingClear}
            errors={errors}
          />
        </div>

        {isLoadingGet && (
          <div className="container-center mt-5">
            <img src={spinner} alt="spinner" style={{ width: "80px" }} />
          </div>
        )}

        {polls.map((poll, index) => {
          let flag;
          poll.isLoadingEdit ? (flag = true) : (flag = false);

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
                  isLoadingPost={isLoadingPost}
                  isLoadingClear={isLoadingClear}
                  errors={errors}
                  flag={flag}
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
    polls: state.polls,
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postPoll: newPoll => dispatch(postPoll(newPoll)),
    deletePoll: id => dispatch(deletePoll(id)),
    clearPolls: () => dispatch(clearPolls()),
    toggleEdit: poll => dispatch(toggleEdit(poll)),
    editPoll: poll => dispatch(editPoll(poll))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePoll);
