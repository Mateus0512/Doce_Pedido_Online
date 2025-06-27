import { Body } from "@/components/body";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Calendar, LocaleConfig} from "react-native-calendars";
import { ptBR } from "@/utils/localeCalendarConfig";
import { useEffect, useState } from "react";
import { Alert, FlatList,Text, View} from "react-native";
import { style } from "./style";
import { useSchedule } from "@/lib/useSchedule";
import { useAuth } from "@/contexts/authContext";
import { SaleProps } from "@/types/sales";
import { CardSchedule } from "@/components/card_schedule";
import { theme } from "@/theme";
import { useMemo } from "react";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function Schedule(){
    const {user} = useAuth();
    const [selectedDay,setSelectedDay] = useState(new Date().toISOString().split("T")[0]);
    const [schedule, setSchedule] = useState<SaleProps[]>([]);
    const supabaseSchedule = useSchedule();

    async function loadPendingSales() {
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }
            const resultPending = await supabaseSchedule.fetchSalesPending(user.id);
            if(resultPending.success && resultPending.data){
                setSchedule(resultPending.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const pendingDates = useMemo(() => {
        return schedule.reduce((acc, sale) => {
            if (!acc[sale.delivery_date]) {
                acc[sale.delivery_date] = [];
            }
            acc[sale.delivery_date].push({
                ...sale,
                name: sale.clients.name
            });
            return acc;
        }, {} as Record<string, (SaleProps & { name: string })[]>);
    }, [schedule]);

    const markedDates = useMemo(() => {
        const marks = Object.keys(pendingDates).reduce((acc, currentDate) => {
            acc[currentDate] = {
                marked: true,
                selected: false
            };
            return acc;
        }, {} as Record<string, { marked: boolean; selected?: boolean; selectedColor?: string }>);

        // Aqui você garante que a data selecionada sempre estará presente, mesmo que não tenha entrega
        marks[selectedDay] = {
            ...(marks[selectedDay] || { marked: false }), // Mantém marcada se já estiver ou marca como não marcada
            selected: true,
            selectedColor: "#3B82F6"
        };

        return marks;
    }, [pendingDates, selectedDay]);


    const salesByDateSelected = pendingDates[selectedDay] || [];

    useEffect(()=> {
        loadPendingSales();
    },[]);
    return(
        <Container>
            <Header title="Agenda" hasBackButton/>
            <Body>
                {/* <Agenda
                items={pendingDates}
                renderItem={(item: SaleProps & { name: string }) => <CardSchedule sale={item} />}
                renderEmptyData={() => (
                    <View style={{ padding: 20 }}>
                    <Text style={{ textAlign: "center", color: "#aaa", fontFamily: theme.fonts.family.regular }}>
                        Nenhuma venda para este dia.
                    </Text>
                    </View>
                )}
                onDayPress={(day: DateData) => setSelectedDay(day.dateString)}
                markedDates={markedDates}
                /> */}

                <Calendar
                    markedDates={markedDates}
                    onDayPress={day => setSelectedDay(day.dateString)}
                    theme={{
                      selectedDayBackgroundColor: "#3B82F6",
                      todayTextColor: "#3B82F6",
                      arrowColor: "#3B82F6",
                    }}
                    
                    
                />

                {/* <ScrollView style={style.pendingContainer}>
                    <Text style={style.title}>{selectedDay && new Date(selectedDay.dateString+"T08:00:00.000Z").toLocaleDateString()}</Text>

                </ScrollView> */}
                {salesByDateSelected.length<1 
                ?(
                    <View style={[style.pendingContainer,{flex:1,paddingTop:10}]}>
                    <Text style={{ textAlign: "center", color: "#aaa", fontFamily: theme.fonts.family.regular }}>
                        Nenhuma entrega para este dia.
                    </Text>
                    </View>
                ):(
                    <FlatList 
                    data={salesByDateSelected}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => <CardSchedule sale={item} />}
                    style={style.pendingContainer}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    showsVerticalScrollIndicator={false}
                    />
                )}

            </Body>
        </Container>
    )
}