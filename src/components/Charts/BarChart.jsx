/* eslint-disable no-unused-vars */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import PropTypes from "prop-types";

export default function BarChart({ data }) {
  return <Bar data={data} />;
}
BarChart.propTypes = {
  data: PropTypes.object,
};
