import uuidv4 from "uuid/v4";

export const createChoice = () => {
  return {
    value: "",
    id: uuidv4()
  };
};

export const createPoll = () => {
  return {
    value: "",
    type: YES_NO,
    isEdit: false,
    showError: false,
    radioValue: "",
    checked: [],
    other: "",
    isChecked: false,
    choices: [createChoice(), createChoice()],
    id: uuidv4()
  };
};

export const YES_NO = "YES_NO";
export const SINGLE_CHOICE = "SINGLE_CHOICE";
export const MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
export const OTHER_CHOICE = "OTHER_CHOICE";

export const YES = "YES";
export const NO = "NO";
