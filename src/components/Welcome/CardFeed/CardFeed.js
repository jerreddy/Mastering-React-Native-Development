import React from 'react'
import { FlatList } from 'react-native'
import { Container, Text, Body, ListItem } from 'native-base'
import Loader from '../../shared/Loader'

import ImageCard from './ImageCard'

const _keyExtractor = (item) => item.toString()

class CardFeed extends React.Component {
  renderItem = ({ item }) => {
    const { imageObjects } = this.props
    return (
      <ListItem style={{ borderBottomWidth: 0 }}>
        <Body>
          <ImageCard card={imageObjects[item]} />
        </Body>
      </ListItem>
    )
  }

  
  render () {
    const { fetchingImages, imageIds, imageError, onEndReached } = this.props
    return (
      <Container style={{ flex: 1 }}>
        {fetchingImages && imageIds.length <= 0 ?
          <Loader /> :
          imageError ?
            <Text style={{ alignSelf: 'center' }}>Image Error</Text> :
            imageIds.length > 0 ?
              <FlatList
                keyExtractor={_keyExtractor}
                style={{ flex: 1 }}
                data={imageIds}
                renderItem={this.renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={5}
              /> :
              null
        }
      </Container>
    )
  }
}

export default CardFeed
