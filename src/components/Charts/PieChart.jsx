import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import React from "react";

const PieChart = React.memo(function ({ data }) {
  return data ? <Pie data={data} /> : null;
});

PieChart.displayName = "PieChart";
export default PieChart;
PieChart.propTypes = {
  data: PropTypes.object,
};
