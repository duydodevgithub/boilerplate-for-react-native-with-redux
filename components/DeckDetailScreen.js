import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Text, Card, Button, Icon, Divider } from "react-native-elements";

class DeckDetailScreen extends React.Component {
  render() {
    const { deckObj } = this.props.route.params;
    const d = new Date(deckObj.timestamp);
    return (
      <SafeAreaView style={styles.container}>
        <Card title={deckObj.title}>
          <Text>
            Created Date:{" "}
            {d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Deck Description: {deckObj.description}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Total cards in deck: {deckObj.cardlist.length}
          </Text>
          <TouchableOpacity></TouchableOpacity>
          <Button
            icon={<Icon name="add" color="#517fa4" />}
            type="clear"
            buttonStyle={{
              borderRadius: 0,
              margin: 5
            }}
            title="ADD MORE CARD"
            onPress={() =>
              this.props.navigation.navigate("AddNewCard", { deckObj })
            }
          />
        </Card>
        <View style={styles.buttonHorizontal}>
          {deckObj.cardlist.length > 0 ? (
            <View>
              <Button
                icon={<Icon name="alarm" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  margin: 5,
                  backgroundColor: "#1F7DDA"
                }}
                title="START QUIZ"
                onPress={() =>
                  this.props.navigation.navigate("Quiz", { deckObj })
                }
              />
              <Button
                icon={<Icon name="cancel" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  margin: 5,
                  backgroundColor: "#C07547"
                }}
                title="CANCEL"
                onPress={() => this.props.navigation.navigate("Home")}
              />
            </View>
          ) : (
            <Button
              icon={<Icon name="alarm" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                margin: 5,
                backgroundColor: "#1F7DDA"
              }}
              title="ADD CARD"
              onPress={() =>
                this.props.navigation.navigate("AddNewCard", { deckObj })
              }
            />
          )}
          {/* <Button
            icon={<Icon name="remove" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              margin: 5,
              backgroundColor: "#DA411F"
            }}
            title="REMOVE DECK"
          /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  buttonHorizontal: {
    flexDirection: "row",
    marginTop: 20
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: Object.values(decks)
  };
}

export default connect(mapStateToProps)(DeckDetailScreen);
