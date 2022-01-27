import React, {Component} from'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet,Alert  } from 'react-native';
import { updateTodoList, deleteTodoList, quearyAllTodoList } from '../database/taskschama';
import realm from '../database/taskschama';

export default class TodoListComponent extends Component {
constructor(props) {
    super(props);
    this.state ={ 
        todoLists: []
    }
}
  reloadData = () => {
      quearyAllTodoList().then
  }
    render() {
        return (
            <View>

            </View>
        )
    }
}