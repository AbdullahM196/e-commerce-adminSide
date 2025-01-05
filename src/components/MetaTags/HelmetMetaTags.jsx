import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import React from "react";

const HelmetMetaTags = React.memo(function ({ title, content, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta name="keywords" content="e-commerce, e-commerce Dashboard review" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
});
HelmetMetaTags.displayName = "HelmetMetaTags";
export default HelmetMetaTags;
HelmetMetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
