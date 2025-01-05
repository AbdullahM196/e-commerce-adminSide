// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import PropTypes from "prop-types";
import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = React.memo(function ({ data }) {
  return <Line data={data} />;
});

LineChart.displayName = "LineChart";

export default LineChart;
LineChart.propTypes = {
  data: PropTypes.object,
};
