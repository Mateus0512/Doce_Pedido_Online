import { View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { SaleProps } from "@/types/sales";
import { router } from "expo-router";


export function CardSchedule({ sale }: {sale: SaleProps}) {
  return (
    <TouchableOpacity 
      style={[
        style.card,
        !sale.status_delivery && style.pendingCard // Se não estiver entregue, muda a cor
      ]}
      onPress={() => router.push({pathname: "/sales/sale", params: {id: sale.id}})}
    >
      <View style={style.content}>
        {/* Nome do cliente */}
        <Text style={style.clientName}>{sale.clients.name}</Text>

        {/* Nome do aniversariante e idade */}
        {sale.birthday_person_name && sale.age_to_complete && (
          <Text style={style.birthday}>
            {sale.birthday_person_name} ({sale.age_to_complete} anos)
          </Text>
        )}

        {/* Tema da festa */}
        {sale.party_theme ? (
          <Text style={style.partyTheme}>{sale.party_theme}</Text>

        ):
        <Text style={style.partyTheme}>Venda simples</Text>
        }

        {/* Data da entrega */}
        <View style={style.deliveryInfo}>
          <MaterialCommunityIcons name="calendar" size={16} color="#4B5563" />
          <Text style={style.deliveryText}>
            {new Date(sale.delivery_date + "T10:00:00.000Z").toLocaleDateString("pt-BR", {
              weekday: "short", day: "2-digit", month: "short", year: "numeric"
            })}
          </Text>
        </View>

        {/* Método de pagamento */}
        <View style={style.paymentInfo}>
          <MaterialCommunityIcons name="cash-multiple" size={16} color="#4B5563" />
          <Text style={style.paymentText}>{sale.payment_method || "Não informado"}</Text>
        </View>

        {/* Observações (se houver) */}
        {sale.observations && (
          <View style={style.observations}>
            <MaterialCommunityIcons name="information-outline" size={16} color="#D97706" />
            <Text style={style.observationsText}>{sale.observations}</Text>
          </View>
        )}
      </View>

      {/* Ícone de status */}
      <MaterialCommunityIcons
        name={sale.status_delivery ? "check-circle" : "alert-circle"}
        size={24}
        color={sale.status_delivery ? "green" : "#D97706"} // Verde se entregue, laranja se pendente
      />
    </TouchableOpacity>
  );
}
