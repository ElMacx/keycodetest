import { BASE_URL } from '../Constants/APIConstant';

export const getQuestionList = () => {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      Accept: 'application/json'
    }
  })
    .then(res => res.json())
    .then((result) => {
      return result;
    })
    .catch(err => {
      return null;
    })
}
