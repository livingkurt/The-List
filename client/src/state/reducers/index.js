import { CATEGORY } from "../types";


const CategoryReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CATEGORY:
      return payload;
    default:
      return state;
  }
};
export default CategoryReducer;