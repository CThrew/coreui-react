import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {tagPropType} from './Shared/helper.js';

//component - CoreUI / CListGroupHeading

const CListGroupHeading = props=>{

  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props;

  // render

  const classes = classNames(
    className,
    'list-group-item-heading'
  );

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );

}

CListGroupHeading.propTypes = {
  tag: tagPropType,
  className: PropTypes.any,
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
};

CListGroupHeading.defaultProps = {
  tag: 'h5'
};

export default CListGroupHeading;
