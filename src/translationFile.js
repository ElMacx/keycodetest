const translation = {
  "title.app_name": "Heartburn Checker",
  "label.404text": "oops, something went wrong...",
  "label.retry": "retry",
  "label.next": "next",
  "label.error_questions_call": "err getting question list",
  "label.book_meeting": "book a meeting",
  "label.hover.book_meeting": "click to book a meeting with a doctor",
  "label.back_to_start": "back to the start screen",
  "label.hover.next_button_disabled":
    "please select an option before going to the next question",
  "label.hover.next_button_enabled": "click here to go to the next question",
  "label.greetings_answer": "thank you for answering the questions!",
  "label.loading": "loading..."
};

const capitalizeFirstLetter = str => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : null;
};

export const getLabel = (key, capitalize = true) => {
  if (!translation[key]) {
    return null;
  }
  return capitalize
    ? capitalizeFirstLetter(translation[key])
    : translation[key];
};
