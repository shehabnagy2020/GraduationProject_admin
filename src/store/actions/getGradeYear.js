import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_GRADE_YEAR,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getGradeYear: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/gradeYear/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_GRADE_YEAR,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getGradeYear: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getGradeYear: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getGradeYear: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getGradeYear: true } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
  }
};
