import moment from "moment";

export const convert24to12 = (hr) => {
  const hour = moment(hr, "HH");
  return hour.format("h:mm A");
};
