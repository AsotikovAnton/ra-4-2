export default function TrainingsAddChange(trainings, training) {
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
