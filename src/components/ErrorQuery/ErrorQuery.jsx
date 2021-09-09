import React from "react";
import PropTypes from "prop-types";
import s from './QueryError.module.css';

const ErrorQuery = ({ message }) => {
  return <p className={s.ErrorQuery}>{message}</p>;
};

ErrorQuery.propTypes = {
  queryError: PropTypes.object,
};

export default ErrorQuery;
