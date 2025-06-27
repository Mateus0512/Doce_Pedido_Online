import { useState } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { Pressable, View, Modal, Text, Platform } from "react-native";
import { Input } from "../input";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { style } from "./style";
import { ptBR } from "@/utils/localeCalendarConfig";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";



type DatePickerProps = {
  label: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
  error?: string;
  selected: boolean;
  minDate?: string,
  maxDate?:string
};

export function DatePicker({
  control,
  label,
  name,
  selected,
  error,
  placeholder,
  minDate,
  maxDate
}: DatePickerProps) {
  const [show, setShow] = useState(false);
  const [editable, setEditable] = useState(Platform.OS === "ios");

  // 🚀 Usa watch para garantir que qualquer mudança em order_date seja refletida
  const orderDate = useWatch({ control, name: "order_date" });
  const delivery_date = useWatch({ control, name: "delivery_date" });

  const showDatePicker = () => {
    setShow(true);
    if (Platform.OS === "ios") {
      setEditable(false);
    }
  };

  const hideDatePicker = () => {
    setShow(false);
    if (Platform.OS === "ios") {
      setEditable(true);
    }
  };

  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Pressable onPress={showDatePicker}>
              <Input
                text={label}
                name={name}
                control={control}
                placeholder={placeholder || "Selecione uma data"}
                editable={editable}
                selected={selected}
                error={error}
                onFocus={Platform.OS === "ios" ? showDatePicker : undefined}
              />
            </Pressable>

            {/* Modal com o calendário */}
            <Modal visible={show} transparent animationType="fade">
              <Pressable style={style.modalBackground} onPress={hideDatePicker}>
                <View style={style.modalContainer}>
                  <Text style={style.modalTitle}>Selecione a data</Text>
                  <Calendar
                    onDayPress={(day) => {
                      field.onChange(day.dateString);
                      hideDatePicker();
                    }}
                    markedDates={{
                      [field.value]: { selected: true, selectedColor: "#3B82F6" },
                    }}
                    minDate={minDate=== undefined && name === "delivery_date" ? orderDate : name === "remaining_payment_date" ? orderDate : undefined} // 🛠 Atualiza automaticamente
                    maxDate={maxDate=== undefined && name === "remaining_payment_date" ? delivery_date : undefined}
                    theme={{
                      selectedDayBackgroundColor: "#3B82F6",
                      todayTextColor: "#3B82F6",
                      arrowColor: "#3B82F6",
                    }}
                  />
                </View>
              </Pressable>
            </Modal>
          </>
        )}
      />
    </View>
  );
}
