import { Contacts } from 'expo';
import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      contacts: []
    };
  }

  loadContacts = async () => {
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Emails,
        Contacts.Fields.Image
      ]
    });
    this.setState({ contacts: data, isLoading: false });
  };
  componentDidMount() {
    this.loadContacts();
  }
  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: 'CONTACTS', style: { color: '#fff' } }}
        />
        {this.state.isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>
            <View>
              {this.state.contacts.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.image ? l.image.uri : null } }}
                  title={l.firstName + `${l.lastName ? l.lastName : ''}`}
                  subtitle={l.phoneNumbers ? l.phoneNumbers[0].number : ' '}
                  bottomDivider
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
