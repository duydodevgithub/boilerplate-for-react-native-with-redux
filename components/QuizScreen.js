import { View, StyleSheet, SafeAreaView, Animated } from "react-native";
import React from "react";
import { connect } from "react-redux";
import {
  Text,
  Card,
  Button,
  Icon,
  Divider,
  Overlay
} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { handleHistory } from "../actions/shared";

class QuizScreen extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.handleResetQuiz = this.handleResetQuiz.bind(this);
    this.handleSaveResult = this.handleSaveResult.bind(this);
    this.loadNextQuestion = this.loadNextQuestion.bind(this);
    this.state = {
      correct: 0,
      cardArr: [],
      total: 0,
      remaining: 0,
      opacity: new Animated.Value(0),
      toggleAnswer: false,
      iconAnswer: ""
    };
  }

  componentDidMount() {
    const { deckObj } = this.props.route.params;
    this.setState({
      cardArr: deckObj.cardlist,
      total: deckObj.cardlist.length,
      remaining: deckObj.cardlist.length - 1
    });
  }

  loadNextQuestion() {
    this.setState(prev => {
      return {
        remaining: prev.remaining - 1,
        toggleAnswer: false,
        iconAnswer: {}
      };
    });
  }

  next(res, answer) {
    if (res === answer) {
      this.setState(prev => {
        return {
          toggleAnswer: true,
          correct: prev.correct + 1,
          iconAnswer: { type: "md-happy", color: "green" }
        };
      });
      setTimeout(() => {
        this.loadNextQuestion();
      }, 2000);
    } else {
      this.setState(prev => {
        return {
          toggleAnswer: true,
          iconAnswer: { type: "md-sad", color: "red" }
        };
      });
      setTimeout(() => {
        this.loadNextQuestion();
      }, 2000);
    }
    Animated.timing(this.state.opacity, { toValue: 1, duration: 2000 }).start();
  }

  handleSaveResult() {
    //save result and dispatch
    const { deckObj } = this.props.route.params;
    const { correct, total } = this.state;
    this.props.dispatch(handleHistory(deckObj.id, correct, total));
    this.props.navigation.navigate("Home");
  }

  handleResetQuiz() {
    const { deckObj } = this.props.route.params;
    this.setState({
      correct: 0,
      cardArr: deckObj.cardlist,
      total: deckObj.cardlist.length,
      remaining: deckObj.cardlist.length - 1
    });
  }

  render() {
    const { cardArr, remaining } = this.state;
    const cardsObj = this.props.cardsObj;
    const { cards } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {this.state.remaining >= 0 && this.state.cardArr.length > 0 ? (
          <View>
            <Text style={{ marginTop: 100, alignContent: "center" }}>
              Remaining Questions: {this.state.remaining}
            </Text>
            <Card
              containerStyle={{
                width: 350,
                alignItems: "center",
                marginTop: 10
              }}
              title={cardsObj[cardArr[remaining]].text}
            >
              <Animated.View
                style={{ opacity: this.state.opacity, alignItems: "center" }}
              >
                <Ionicons
                  name={this.state.iconAnswer.type}
                  size={50}
                  color={this.state.iconAnswer.color}
                />
              </Animated.View>

              <View style={styles.buttonHorizontal}>
                <Button
                  disabled={this.state.toggleAnswer}
                  buttonStyle={{
                    borderRadius: 0,
                    margin: 10,
                    width: 120
                  }}
                  title="Yes"
                  onPress={() =>
                    this.next(1, cards[this.state.remaining].answer)
                  }
                />
                <Button
                  disabled={this.state.toggleAnswer}
                  buttonStyle={{
                    borderRadius: 0,
                    margin: 10,
                    backgroundColor: "red",
                    width: 120
                  }}
                  title="No"
                  onPress={() =>
                    this.next(0, cards[this.state.remaining].answer)
                  }
                />
              </View>
            </Card>
          </View>
        ) : (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Card
              containerStyle={{ width: 350, alignItems: "center" }}
              title="Your Result"
            >
              <Icon
                name="ios-american-football"
                type="ionicon"
                color="#517fa4"
              />
              <Text h5>Total cards in deck: {this.state.total}</Text>
              <Text h5>Correct Answer: {this.state.correct}</Text>

              <View style={styles.buttonHorizontal}></View>
            </Card>
            <View style={styles.buttonHorizontal}>
              <Button
                buttonStyle={{
                  borderRadius: 0,
                  margin: 10,
                  width: 120
                }}
                title="Save Result"
                onPress={() => this.handleSaveResult()}
              />
              <Button
                buttonStyle={{
                  borderRadius: 0,
                  margin: 10,
                  backgroundColor: "red",
                  width: 120
                }}
                title="Reset Quiz"
                onPress={() => this.handleResetQuiz()}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  buttonHorizontal: {
    flexDirection: "row",
    marginTop: 20
  }
});

function mapStateToProps({ cards }) {
  return {
    cards: Object.values(cards),
    cardsObj: cards
  };
}

export default connect(mapStateToProps)(QuizScreen);
