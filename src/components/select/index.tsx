import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Control, Controller } from 'react-hook-form';
//import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { style } from './style';
import { theme } from '@/theme';

type Item = {
  name: string;
  id: string;
};

type SelectProps =   {
  name: string;
  control: Control<any>;
  data: Array<Item>;
  placeholder?: string;
  label: string;
  error?: string;
};

export const Select: React.FC<SelectProps> = ({
  name,
  control,
  data,
  placeholder,
  label,
  error,
  
}) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={style.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Dropdown
            
            fontFamily={theme.fonts.family.regular}
            style={{
              width: '100%',
              height: 45,
              borderWidth: 1,
              borderRadius: 8,
              marginVertical: 8,
              padding: 10,
              borderColor: theme.colors.slate_400,
              backgroundColor: theme.colors.white,
            }}
            data={data}
            labelField="name"
            valueField="id"
            placeholder={placeholder || 'Selecione'}
            value={field.value}
            onChange={(item) => field.onChange(item.id)}
            search
          />
        )}
      />
      {error && <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>}
    </View>
  );
};
