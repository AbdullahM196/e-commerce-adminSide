// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

export default function LineChart({ data }) {
  console.log(data);
  return <Line data={data} />;
}
LineChart.propTypes = {
  data: PropTypes.object,
};
