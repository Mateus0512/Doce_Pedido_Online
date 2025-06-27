import { Text, View } from "react-native";
import { commonStyles } from "./styles"; // ou ajuste o caminho conforme seu projeto

function Title({ children }: { children: React.ReactNode }) {
  return <Text style={commonStyles.title}>{children}</Text>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <Text style={commonStyles.paragraph}>{children}</Text>;
}

function Bold({ children }: { children: React.ReactNode }) {
  return <Text style={commonStyles.bold}>{children}</Text>;
}

function TextComponents({ children }: { children: React.ReactNode }) {
  return <View>{children}</View>;
}

// Subcomponentes
TextComponents.Title = Title;
TextComponents.Paragraph = Paragraph;
TextComponents.Bold = Bold;

export { TextComponents };
