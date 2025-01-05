import React from "react";
import "./mainCard.css";
import PropTypes from "prop-types";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FormattedNumber } from "react-intl";
const MainCard = React.memo(function ({
  color,
  percent,
  title,
  icon,
  number,
  ditals,
}) {
  return (
    <div
      className="main-card text-light"
      style={{ backgroundColor: color, boxShadow: color }}
    >
      <div className="cardLiftSide">
        <CircularProgressbar value={percent} text={`${percent}%`} />
        <span>{title}</span>
      </div>
      <div className="cardRightSide">
        <span>{icon}</span>
        {title == "Orders" || title == "Active" ? (
          <span className="fs-4 fw-bold">
            <FormattedNumber value={number} style="decimal" />
          </span>
        ) : (
          <span className="fs-4 fw-bold">
            <FormattedNumber value={number} style="currency" currency="USD" />
          </span>
        )}
        <span className="fs-5">{ditals}</span>
      </div>
    </div>
  );
});

MainCard.displayName = "MainCard";
export default MainCard;
MainCard.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.element,
  number: PropTypes.number,
  ditals: PropTypes.string,
};
