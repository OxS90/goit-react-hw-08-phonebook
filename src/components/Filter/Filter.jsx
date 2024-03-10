import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filterValue, filterFunction }) => {
  return (
    <div>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        name="filter"
        id="filter"
        value={filterValue}
        onChange={filterFunction}
        required
        className={styles.input}
        autoComplete="off"
      />
    </div>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  filterFunction: PropTypes.func.isRequired,
};

export default Filter;
