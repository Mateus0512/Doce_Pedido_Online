import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.gray_100,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 10,
    marginRight: 5,
  },
  pendingCard: {
    borderLeftWidth: 5,
    borderLeftColor: "#D97706", // Laranja para destacar vendas pendentes
  },
  content: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.slate_900,
    fontFamily: theme.fonts.family.bold,
  },
  birthday: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.slate_900,
    fontFamily: theme.fonts.family.bold,
  },
  partyTheme: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: theme.fonts.family.regular
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  deliveryText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#4B5563",
    fontFamily: theme.fonts.family.regular
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  paymentText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#4B5563",
    fontFamily: theme.fonts.family.regular
  },
  observations: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  observationsText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#D97706", // Cor para alertar sobre observações
    fontStyle: "italic",
    fontFamily: theme.fonts.family.regular
  },
});
