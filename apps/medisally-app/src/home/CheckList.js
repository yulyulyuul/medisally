import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CheckList = (props) => {
  const { colors } = useTheme()

  const [items, setItems] = React.useState([
    {
      content: '질문 1',
      checked: false,
    },
    {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ',
      checked: true,
    }
  ])

  return (
    <View style={[{padding: 15, borderRadius: 15, backgroundColor: colors.card,
      shadowColor: "rgba(0,0,0,0.15)",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }, props.style]}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
        <Text style={{fontSize: 20, fontWeight: '700', color: colors.text, marginVertical: 10}}>메모</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="add-circle" size={30} color={colors.primary} style={{width: 30, height: 30,
            shadowColor: "rgba(0,0,0,0.5)",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }} />
        </TouchableOpacity>
      </View>

      {items.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => {}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: index === items.length - 1 ? 0 : 15 }}>
            <Ionicons name={item.checked ? "checkbox" : 'square-outline'} size={25} color={item.checked ? colors.primary : colors.gray3} style={{width: 25, height: 25, alignItems: 'center', justifyContent: 'center', marginRight: 10}}/>
            <View style={{flex: 1, borderRadius: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border, minHeight: 20, padding: 10, backgroundColor: colors.background}}>
              <Text style={{color: colors.text, textDecorationLine: item.checked ? 'line-through' : 'none', textDecorationColor: colors.primary, textDecorationStyle: 'double'}}>{item.content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default CheckList
