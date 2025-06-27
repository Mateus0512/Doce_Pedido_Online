import { theme } from "@/theme";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { Text, View } from "react-native";
import { style } from "./styles";
import { Divisor } from "../divisor";

type MenuPopupProps = {
  itens: string[];
  functions: (() => void)[];
  icon: React.ReactNode;
  divisor?: number[]
};

export function MenuPopup({ itens, functions,icon,divisor }: MenuPopupProps) {
  return (
    <View style={{ position: "relative" }}>
      <Menu>
        <MenuTrigger>
          {/* <MaterialCommunityIcons name="dots-vertical" size={24} color={theme.colors.slate_200} /> */}
          {icon}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              position: "absolute",
              top: 40,
              right: 0,
              backgroundColor: theme.colors.white,
              borderRadius: 8,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
              zIndex: 20,
            },
          }}
        >
          {itens.map((item, index) => (
            divisor && divisor.includes(index) 
            ? <View key={index}>
              <Divisor />
              <MenuOption  onSelect={functions[index]}>
                <Text style={style.menuItem}>{item}</Text>
              </MenuOption>
            </View>
            :
            <MenuOption key={index} onSelect={functions[index]}>
              <Text style={style.menuItem}>{item}</Text>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
}
