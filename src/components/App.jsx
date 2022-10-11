import { Component } from 'react';
import { Container } from './App.styled';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handlClickFeedback = key => {
    this.setState(prevState => {
      return {
        [key]: prevState[key] + 1,
      };
    });
  };

  countTotalFeedback = feedBacks =>
    feedBacks.reduce((sum, value) => (sum += value), 0);

  countPositiveFeedbackPercentage = feedBacks => {
    const positiveFeedBackPercentage =
      (feedBacks[0] / this.countTotalFeedback(feedBacks)) * 100;
    return isNaN(positiveFeedBackPercentage)
      ? '0'
      : Math.round(positiveFeedBackPercentage * 10) / 10;
  };

  render() {
    const feedbackValues = Object.values(this.state);
    const total = this.countTotalFeedback(feedbackValues);
    const positivePercentage =
      this.countPositiveFeedbackPercentage(feedbackValues);

    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handlClickFeedback}
          />
        </Section>

        <Section title="Statistics">
          {!total ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              stats={this.state}
              total={total}
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </Container>
    );
  }
}
