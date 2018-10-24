import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

import Card from '../Card';


class SubExplorer extends Component {
  _keyExtracor = (advisor) => {
    return advisor._id.toString();
  }

  _renderItem = (advisor) => (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Card {...advisor}/>
    </View>
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtracor}/>
    );
  }
}

export default SubExplorer;