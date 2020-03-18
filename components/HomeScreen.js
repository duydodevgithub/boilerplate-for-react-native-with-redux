import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Card, Button, Icon, Divider } from "react-native-elements";
import { Permissions } from "expo-permissions";
import { Notifications } from "expo";
import Constants from "expo-constants";

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
      notification: {}
    };
    // this.registerForPushNotificationsAsync();
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  render() {
    const { decks, navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notification}>
          <Text>Notification Area</Text>
          <Divider style={{ backgroundColor: "blue" }} />
        </View>
        <View>
          <Button
            icon={<Icon name="add" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginTop: 10
            }}
            title="ADD NEW DECK"
            onPress={() => this.props.navigation.navigate("AddNewDeck")}
          />
        </View>
        {decks.length > 0 ? (
          <View>
            <FlatList
              data={decks}
              renderItem={({ item }) => (
                <DeckItem deck={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
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

function mapStateToProps({ decks }) {
  return {
    decks: Object.values(decks)
  };
}

export default connect(mapStateToProps)(HomeScreen);
