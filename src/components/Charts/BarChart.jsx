/* eslint-disable no-unused-vars */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import PropTypes from "prop-types";
import React from "react";

const BarChart = React.memo(function ({ data }) {
  return <Bar data={data} />;
});
BarChart.displayName = "BarChart";
export default BarChart;
BarChart.propTypes = {
  data: PropTypes.object,
};
