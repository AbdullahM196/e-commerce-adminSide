import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";

export default function PieChart({ data }) {
  return <Pie data={data} />;
}
PieChart.propTypes = {
  data: PropTypes.object,
};
