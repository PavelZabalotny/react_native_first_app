import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Note} from './Note'

export default class Main extends Component {
  state = {
    noteArray: [
      {
        id: 1,
        date: '06/11/2018',
        note: 'someText',
      }
    ],
    noteText: '',
  }

  render() {
    let note = this.state.noteArray.map((item, key) => (
      <Note
        key={item.id}
        item={item}
        deleteNote={() => this.handleDeleteNote(key)}
      />
    ))

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            - NOTER -
          </Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {note}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder=">note"
            onChangeText={this.handleChangeNote}
            value={this.state.noteText}
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
          >
          </TextInput>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.handleAddNote}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleAddNote = () => {
    const note = this.state.noteText
    const d = new Date()

    if (note.trim()) {

      this.setState({
        noteArray: [...this.state.noteArray, {
          id: note.length + 1,
          date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
          note: note.trim()
        }]
      })

      this.setState({noteText:''});
    }
  }

  handleChangeNote = noteText => {
    this.setState({
      noteText
    })
  }

  handleDeleteNote = key => {
    this.state.noteArray.splice(key, 1)

    this.setState({
      noteArray: [...this.state.noteArray],
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24
  }
});