import React from 'react';
import {Animated} from 'react-native';


import {_FlatList, _Header, PageNoScroll} from '../../src';
import styles from '../../src/style';

export default class App extends React.PureComponent {
  // return  <_FlatList />
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(0),
      ctner: 0,
      header: 0,
    };
  }

  componentDidMount() {
    this.top = this.state.top.interpolate({
      inputRange: [0, 10, 20, 30, 40, 50, 120, 500, 900, 1400],
      outputRange: [0, -10, -20, -30, -40, -50, -50, -50, -50, -50],
    });
  }

  animatedEvent(e) {
    return Animated.event([
      {
        nativeEvent: {
          contentOffset: {y: 50},
        },
      },
    ]);
  }

  setSta(param = {}) {
    if (!Object.keys(param).length) return;
    this.setState(Object.assign({}, this.state, param));
  }

  render() {
    const {state} = this, self = this;
    console.log(this.top);
    return (
      <PageNoScroll
        onLayout={(event) => {
          let {x, y, width, height} = event.nativeEvent.layout;
          this.setSta({ctner: height});
        }}
        style={[
          styles.flexColumn, {
            flex: 1,
          }]
        }
      >
        <Animated.View
          style={{top: self.top}}
          onLayout={(event) => {
            let {x, y, width, height} = event.nativeEvent.layout;
            this.setSta({header: height});
          }}
        >
          <_Header
          >列表
          </_Header>
        </Animated.View>
        <Animated.View
          style={{
            top: self.top,
            height: state.ctner - state.header,
          }}
        >
          <_FlatList
            onScroll={this.animatedEvent}
          />
        </Animated.View>
      </PageNoScroll>);
  }
}
