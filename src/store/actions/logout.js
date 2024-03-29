import Axios from "axios";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default () => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: true } });
  console.log(getState().userDetails.token);
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/logout",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_USER,
      value: {},
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { logout: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { logout: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to logout");
    }
  }
};
