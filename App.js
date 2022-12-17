import React, { useRef } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';

const App = () => {
  const data = [
    {
      name: "time",
    },
    {
      name: "time2",
    },
    {
      name: "time3 tt",
    },
  ]
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx)
        pan.y.setValue(gesture.dy)
      },

      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      {
        data.map((item, index) => {
          return <Animated.Text
            key={index}
            {...panResponder.panHandlers}
            style={{
              backgroundColor: "grey",
              borderRadius: 15,
              padding: 4,
              transform: [
                {
                  translateX: pan.x,
                },
                {
                  translateY: pan.y,
                },
              ]
            }
            }
          >
            {item.name}
          </Animated.Text>
        })
      }
    </View >
  );
}

export default App;