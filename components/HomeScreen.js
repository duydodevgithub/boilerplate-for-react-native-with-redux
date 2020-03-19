import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Animated
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Card, Button, Icon, Divider } from "react-native-elements";
import { setLocalNotification } from "../actions/helper";
import { Notifications } from "expo";

const DeckItem = props => {
  // console.log(props);
  const { deck, navigation } = props;
  return (
    <Card key={deck.id} title={deck.title}>
      <Text style={{ marginBottom: 10 }}>{deck.description}</Text>
      <Button
        title="View Now"
        type="outline"
        onPress={() => navigation.navigate("DeckDetail", { deckObj: deck })}
      />
    </Card>
  );
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "",
      opacity: new Animated.Value(0)
    };
    this.handleNotification = this.handleNotification.bind(this);
  }

  componentDidMount() {
    setLocalNotification();
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 2000 }).start();
  }

  handleNotification(listenter) {
    this.props.dispatch({ type: "RECEIVE_HISTORY", history: {} });
  }

  render() {
    const { decks, navigation } = this.props;
    Notifications.addListener(listenter => this.handleNotification(listenter));
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[styles.notification, { opacity: this.state.opacity }]}
        >
          <Text>Notification Area</Text>
          <Text>
            {this.props.history.length > 0 ? (
              <Text>You already did Quiz today !</Text>
            ) : (
              <Text>"Remember to do quiz today"</Text>
            )}
          </Text>
          <Divider style={{ backgroundColor: "blue" }} />
        </Animated.View>
        <Animated.View style={[{ opacity: this.state.opacity }]}>
          <Button
            icon={<Icon name="add" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginTop: 10
            }}
            title="ADD NEW DECK"
            onPress={() => this.props.navigation.navigate("AddNewDeck")}
          />
        </Animated.View>
        {decks.length > 0 ? (
          <Animated.View style={[{ opacity: this.state.opacity }]}>
            <FlatList
              data={decks}
              renderItem={({ item }) => (
                <DeckItem deck={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
            />
          </Animated.View>
        ) : (
          <View>
            <Text>You don't have any decks</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  notification: {
    height: 100
  }
});

function mapStateToProps({ decks, history }) {
  return {
    decks: Object.values(decks),
    history: Object.keys(history)
  };
}

export default connect(mapStateToProps)(HomeScreen);
