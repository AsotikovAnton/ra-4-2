import React, { useState } from 'react';
import moment from 'moment';
import shortid from 'shortid';
import TrainingAddForm from './TrainingAddForm';
// import TrainingsAddChange from './TrainingsAddChange';
import TrainingsList from './TrainingsList';
import TrainingModel from '../model/TrainingModel';

export default function TrainingHistory() {
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({
    id: '',
    date: '',
    distance: '',
  });

  const sortTrainings = trainings.sort((a, b) => moment(b.date, 'DD.MM.YY') - moment(a.date, 'DD.MM.YY'));

  const trainingsAddChange = (trainings, training) => {
    const changeTrainings = trainings;
    const findItem = changeTrainings.findIndex((item) => item.date === training.date);

    if (findItem === -1) {
      changeTrainings.push(training);
      return changeTrainings;
    }
  
    changeTrainings[findItem].distance += training.distance;
    changeTrainings[findItem].kilometr = changeTrainings[findItem].kilometr || training.kilometr;
  
    return changeTrainings;
  }

  const handleFormChange = (objValue) => {
    const { name, value } = objValue;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (objValue) => {
    const { date, distance, kilometr } = objValue;

    if (!form.id) {
      const training = new TrainingModel(shortid.generate(), date, distance, kilometr);

      setTrainings([...trainingsAddChange(trainings, training)]);
    } else {
      setTrainings((prevTrainings) => prevTrainings.map((itemTraining) => {
        if (itemTraining.id === form.id) {
          return new TrainingModel(form.id, date, distance, kilometr);
        }
        return itemTraining;
      }));
    }

    setForm({
      id: '',
      date: '',
      distance: '',
    });
  };

  const handleRemove = (id) => {
    setTrainings((prevTrainings) => prevTrainings.filter((o) => o.id !== id));
  };

  const handleChange = (objValue) => {
    setForm({
      id: objValue.id,
      date: objValue.date,
      distance: `${objValue.distance}${objValue.kilometr}`,
    });
  };

  return (
    <React.Fragment>
      <TrainingAddForm
        valueForm={form}
        onFormChangre={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <table>
        <thead>
          <tr>
            <td>Дата (ДД.ММ.ГГ)</td>
            <td>Пройдено км</td>
            <td>Действия</td>
          </tr>
        </thead>
        <tbody>
          <TrainingsList data={sortTrainings} onRemove={handleRemove} onChange={handleChange} />
        </tbody>
      </table>
    </React.Fragment>
  );
}
