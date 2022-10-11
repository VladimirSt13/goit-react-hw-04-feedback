import { useState } from 'react';
import { Container } from './App.styled';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const state = { good, neutral, bad };

  const countTotalFeedback = feedBacks =>
    feedBacks.reduce((sum, value) => (sum += value), 0);

  const countPositiveFeedbackPercentage = feedBacks => {
    const positiveFeedBackPercentage =
      (feedBacks[0] / countTotalFeedback(feedBacks)) * 100;
    return isNaN(positiveFeedBackPercentage)
      ? '0'
      : Math.round(positiveFeedBackPercentage * 10) / 10;
  };

  const handlClickFeedback = key => {
    switch (key) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        break;
    }
  };

  const feedbackValues = Object.values(state);
  const total = countTotalFeedback(feedbackValues);
  const positivePercentage = countPositiveFeedbackPercentage(feedbackValues);

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={handlClickFeedback}
        />
      </Section>

      <Section title="Statistics">
        {!total ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            stats={state}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </Container>
  );
};
