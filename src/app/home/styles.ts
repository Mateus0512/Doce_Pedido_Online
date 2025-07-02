import { theme } from "@/theme";
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export const style = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: theme.colors.slate_900,
},
header: {
    paddingHorizontal: 20,
    paddingTop: 40, // Ajuste para iOS (evita sobreposição com StatusBar)
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
title: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: theme.fonts.family.bold,
},
body: {
    backgroundColor: theme.colors.slate_200,
    flex: 1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 20,
},
icons_container: {
    flexDirection: "row",
    gap: 12,
},
accountButton: {
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
},
menu: {
    backgroundColor: theme.colors.white,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.slate_300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8, // Sombra no Android
},
itemMenu: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"column"
},
menuButton: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.slate_900,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
},
menuIcon: {
    color: theme.colors.white,
},
label: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.slate_700,
    marginBottom: 4,
    fontFamily: theme.fonts.family.regular
},
tituloCategoria: {
    color: theme.colors.slate_900,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: theme.fonts.family.bold,
},
containerSchedule:{
    padding:10,
    
},
containerServicos: {
    marginTop: 20,
    padding: 10,
    
},

cardServicos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch", // ✅ Isso força os itens da mesma linha a terem a mesma altura
},

itemServico: {
    backgroundColor: theme.colors.white,
    flexDirection: "column",
    flex:1,
    justifyContent: "space-between",
    gap: 4, // Reduzi um pouco o espaçamento para ficar mais compacto
    borderRadius: 12,
    padding: 12, // Menos padding para evitar ocupar muito espaço
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Mantendo a sombra
    marginHorizontal:5,
    borderWidth: 1, 
    borderColor: theme.colors.slate_300, // Adiciona uma borda sutil para destacar melhor
    
},
cardResumo: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.slate_300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    },

resumoItem: {
    alignItems: "center",
    },

resumoTitulo: {
    fontSize: 14,
    color: theme.colors.slate_600,
    fontFamily: theme.fonts.family.regular,
    },

resumoValor: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.slate_900,
    fontFamily: theme.fonts.family.bold,
    },
overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
syncNotice: {
    backgroundColor: theme.colors.sky_700,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
  },
syncNoticeText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.body.md,
    textAlign: "center",
  },
  categoryTitle: {
    fontSize: theme.fonts.size.heading.xs,
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.slate_800,
    marginTop: 12,
    marginBottom: 4,
  },
  itemText: {
    fontSize: theme.fonts.size.body.sm,
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.text,
    marginLeft: 8,
    marginVertical: 2,
  },
  emptyText: {
    fontSize: theme.fonts.size.body.sm,
    fontFamily: theme.fonts.family.regular,
    fontStyle: "italic",
    color: theme.colors.slate_500,
    marginLeft: 8,
  },
  buttonRow: {
    marginTop: 24,
    gap: 8,
  },
  containerModal:{
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  titleModal:{
    fontSize: theme.fonts.size.heading.md,
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.primary,
    marginBottom: 12,
    textAlign: "center",
  }
});