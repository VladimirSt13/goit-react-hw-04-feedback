import PropTypes from 'prop-types';

import { List } from './Statistics.styled';

export const Statistics = ({ stats, total, positivePercentage }) => (
  <List>
    {Object.keys(stats).map(key => (
      <li key={key}>
        {key}: {stats[key]}
      </li>
    ))}
    <li>Total: {total}</li>
    {positivePercentage ? (
      <li>Positive feedback: {positivePercentage}%</li>
    ) : (
      ''
    )}
  </List>
);

Statistics.propTypes = {
  stats: PropTypes.objectOf({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
  }),
  total: PropTypes.number.isRequired,
  positivePercentage: PropTypes.number.isRequired,
};
