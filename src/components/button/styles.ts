import { StyleSheet } from 'react-native';
import { theme } from '@/theme/';

export const style = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.slate_900,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:20,
  },
  title: {
    color: theme.colors.white,
    fontFamily: theme.fonts.family.bold,
    fontSize: 16,
  },
});
