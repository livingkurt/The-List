import API from "../../utils/API"

export const get_category = async (dispatch) => {

  try {
    const res = await API.get_categories()

    dispatch({ type: CATEGORY, payload: res.data });

  } catch (error) {
    console.error(error);
    return dispatch({ type: ERROR, message: error.message });
  }
};