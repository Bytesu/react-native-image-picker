import React from 'react';
import {Animated} from 'react-native';


import {_FlatList, _Header, PageNoScroll} from '../../src';
import styles from '../../src/style';

/**
 * @todo
 * 1. 滚动式抖屏
 * 2. 已上滑隐藏header后, 输入搜索条件,header生硬出现
 */
export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animateVar: new Animated.Value(0),
      ctner: 0,
      header: 0,
    };
    this.animateVar = this.state.animateVar.interpolate({
      inputRange: [0, 50, 201, 600],
      outputRange: [0, -50, -50, -50],
    });
    this.opacity = this.state.animateVar.interpolate({
      inputRange: [0, 20, 50, 201, 600],
      outputRange: [1, 0.5, 0, 0, 0],
    });
  };

  componentDidMount() {
    this.animatedEvent = Animated.event([
        {
          nativeEvent: {
            contentOffset: {y: this.state.animateVar},
          },
        },
      ],
      {
        useNativeDriver: true,
      });
  }

  setSta(param = {}) {
    if (!Object.keys(param).length) return;
    this.setState(Object.assign({}, this.state, param));
  }

  render() {
    const {state} = this, self = this;
    return (
      <PageNoScroll
        onLayout={(event) => {
          let {x, y, width, height} = event.nativeEvent.layout;
          this.setState({ctner: height});
        }}
        style={[
          styles.flexColumn, {
            flex: 1,
          }]
        }
      >
        <Animated.View
          style={{
            transform: [{
              translateY: self.animateVar,
            }],
            opacity: this.opacity,
          }}
          onLayout={(event) => {
            let {x, y, width, height} = event.nativeEvent.layout;
            this.setState({header: height});
          }}
        >
          <_Header>列表测试</_Header>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{
              translateY: self.animateVar,
            }],
            height: state.ctner - state.header + 50,
          }}
        >
          <_FlatList
            onScroll={this.animatedEvent}
          />
        </Animated.View>
      </PageNoScroll>);
  }
}
