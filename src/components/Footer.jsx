import React from "react";
import PropTypes from "prop-types";

const Footer = ({ children }) => <footer>{children}</footer>;

export default Footer;

Footer.propTypes = {
  children: PropTypes.node.isRequired
};
