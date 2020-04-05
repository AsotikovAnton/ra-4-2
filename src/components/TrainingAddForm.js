import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ValidateMessage from './ValidateMessage';

export default function TrainingAddForm(props) {
  const { valueForm } = props;
  const [validateErr, setValidateErr] = useState({
    date: false,
    distance: false,
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValidateErr((prevValidateErr) => ({ ...prevValidateErr, [name]: false }));
    props.onFormChangre({ name, value });
  };
  const checkValue = (evt) => {
    const { name, value } = evt.target;
    let regexpDate;

    if (name === 'date') {
      regexpDate = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d\d$/;
    } else if (name === 'distance') {
      regexpDate = /^\d+([.]\d+)?(км)?$/g;
    }

    if (!value.match(regexpDate)) {
      setValidateErr((prevValidateErr) => ({ ...prevValidateErr, [name]: true }));
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (valueForm.date && valueForm.distance) {
      if (!validateErr.date && !validateErr.distance) {
        const numberDistance = parseFloat(valueForm.distance);
        const strKilometr = valueForm.distance.replace(numberDistance, '');

        props.onFormSubmit({
          date: valueForm.date,
          distance: numberDistance,
          kilometr: strKilometr,
        });
      }
    }
  };

  return (
    <form className="form-add">
      <label>Дата (ДД.ММ.ГГ)
        <input name="date" value={valueForm.date} onChange={handleChange} onBlur={checkValue} />
        {validateErr.date && <ValidateMessage msg={'Введите дату корректно'} />}
      </label>
      <label>Пройдено км
        <input name="distance" value={valueForm.distance} onChange={handleChange} onBlur={checkValue}/>
        {validateErr.distance && <ValidateMessage msg={'Введите дистанцию корректно'} />}
      </label>
      <input type="button" value="OK" onClick={handleSubmit} />
    </form>
  );
}

TrainingAddForm.propTypes = {
  valueForm: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFormChangre: PropTypes.func.isRequired,
};
