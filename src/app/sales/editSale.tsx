import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { DatePicker } from "@/components/datepicker";
import { Form } from "@/components/form";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { useAuth } from "@/contexts/authContext";
import { useClients } from "@/lib/useClients";
import { useSales } from "@/lib/useSales";
import { saveToStorage } from "@/storage/storageMethods";
import { UpdateSaleProps, updateSaleSchema } from "@/types/sales";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

export default function EditSale(){
    const {id} = useLocalSearchParams<{id:string}>();
    const {control, handleSubmit,getValues, setValue,formState:{errors}} = useForm({resolver: zodResolver(updateSaleSchema)});
    const {user} = useAuth();
    const supabaseClients = useClients();
    const supabaseSales = useSales();
    const [clients,setClients] = useState<{id:string,name:string}[]>([]);


    const [inputSelected, setInputSelected] = useState({
        client: false,
        birthdayPersonNameSelected: false,
        ageToCompleteSelected: false,
        totalValueSelected: false,
        entryValueSelected: false,
        orderDateSelected: false,
        deliveryDateSelected: false,
        remainingPaymentDateSelected: false,
        partyThemeSelected: false,
        paymentMethodSelected: false,
        observationsSelected: false,
    });

    async function loadClients() {
        try {
            if(!user?.id){
            Alert.alert("Erro", "Usuário não autenticado.");
            return
            }

            const result = await supabaseClients.fetchClients(user.id);

            if(result.success && result.data){
                //console.log(result)
                const newClients = result.data.map(item => (
                    {id: item.id || '', name: item.name}
                ))
                setClients(newClients);
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    async function loadSale() {
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }
            const response = await supabaseSales.fetchSale(id);
            //console.log(response);
            if(response.success && response.data){
                const saleData = response.data[0];
                //console.log(saleData);
                setValue("client_id", saleData.client_id);
                setValue("party_theme",saleData.party_theme || undefined);
                setValue("birthday_person_name", saleData.birthday_person_name || undefined);
                setValue("age_to_complete", saleData.age_to_complete || undefined );
                setValue("order_date", saleData.order_date);
                setValue("delivery_date", saleData.delivery_date);
                setValue("entry_value", saleData.entry_value);
                setValue("total_value", saleData.total_value);
                setValue("remaining_payment_date", saleData.remaining_payment_date);
                setValue("payment_method", saleData.payment_method);
                setValue("observations", saleData.observations || undefined);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpdateSale() {
        try {
            if (!user?.id) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const newSale = getValues();
            //console.log(newSale)
            const updateResult = await supabaseSales.updateSale(id,{
                client_id: newSale.client_id,
                delivery_date: newSale.delivery_date,
                entry_value: Number(newSale.entry_value),
                order_date: newSale.order_date,
                payment_method: newSale.payment_method,
                total_value: Number(newSale.total_value),
                age_to_complete: Number(newSale.age_to_complete),
                birthday_person_name: newSale.birthday_person_name,
                observations: newSale.observations,
                party_theme: newSale.party_theme,
                remaining_payment_date: newSale.remaining_payment_date
            });

            if(updateResult.success){
                Alert.alert("Aviso","Os dados da venda foi atualizado com sucesso.");
                router.replace({pathname: "/sales/sale", params: {id:id}});
            }else{
                const resultStorage = await saveToStorage<UpdateSaleProps>("@update_sales_pending",[{
                    id:id,
                    client_id: newSale.client_id,
                    delivery_date: newSale.delivery_date,
                    entry_value: Number(newSale.entry_value),
                    order_date: newSale.order_date,
                    payment_method: newSale.payment_method,
                    total_value: Number(newSale.total_value),
                    age_to_complete: Number(newSale.age_to_complete),
                    birthday_person_name: newSale.birthday_person_name,
                    observations: newSale.observations,
                    party_theme: newSale.party_theme,
                    remaining_payment_date: newSale.remaining_payment_date
                }]);
                if(resultStorage){
                    Alert.alert("Aviso","Houve um erro ao salvar a atualização na nuvem, o app fará isso automaticamente em instantes.");
                    router.replace("/home");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        loadClients();
        loadSale();
    },[]);
    return(
        <Container>
            <Header title="Editar dados da venda" hasBackButton/>
            <Form>
                <Select 
                    control={control}
                    name="client_id"
                    label="Cliente"
                    placeholder="Selecione um cliente"
                    data={clients}
                    error={errors.client_id?.message}           
                />

                <DatePicker 
                    control={control}
                    name="order_date"
                    label="Data do pedido"
                    error={errors.order_date?.message}
                    selected={inputSelected.orderDateSelected}
                    placeholder="Digite a data do pedido"
                />

                <DatePicker 
                    control={control}
                    name="delivery_date"
                    label="Data da entrega"
                    error={errors.delivery_date?.message}
                    selected={inputSelected.deliveryDateSelected}
                    placeholder="Digite a data da entrega"
                    
                />

                <Input 
                    control={control}
                    name="party_theme"
                    text="Tema da festa"
                    selected={inputSelected.partyThemeSelected}
                    onFocus={() => setInputSelected(state => ({...state,partyThemeSelected:true}))}
                    onBlur={() => setInputSelected(state => ({...state,partyThemeSelected:false}))}
                    placeholder="Tema da festa"
                    error={errors.party_theme?.message}
                />

                <Input 
                    control={control}
                    name="birthday_person_name"
                    text="Nome do aniversariante"
                    selected={inputSelected.birthdayPersonNameSelected}
                    placeholder="Digite o nome do aniversariante"
                    onFocus={() => setInputSelected(state => ({...state,birthdayPersonNameSelected:true}))}
                    onBlur={() => setInputSelected(state => ({...state,birthdayPersonNameSelected:false}))}
                    error={errors.birthday_person_name?.message}
                />

                <Input 
                    control={control}
                    name="age_to_complete"
                    text="Idade a completar"
                    selected={inputSelected.ageToCompleteSelected}
                    placeholder="Digite a idade a completar"
                    onFocus={() => setInputSelected(state => ({...state,ageToCompleteSelected:true}))}
                    onBlur={() => setInputSelected(state => ({...state,ageToCompleteSelected:false}))}
                    keyboardType="numeric"
                    error={errors.age_to_complete?.message}
                />

                 <Input 
                    control={control}
                    name="entry_value"
                    text="Valor de Entrada"
                    selected={inputSelected.entryValueSelected}
                    onFocus={() => setInputSelected(state => ({...state,entryValueSelected:true}))}
                    onBlur={() => setInputSelected(state => ({...state,entryValueSelected:false}))}
                    placeholder="Digite o valor de Entrada"
                    error={errors.entry_value?.message}
                    keyboardType="numeric"
                />

                <Input 
                    control={control}
                    name="total_value"
                    text="Valor total"
                    selected={inputSelected.totalValueSelected}
                    editable={false}
                />

                <DatePicker 
                    control={control}
                    label="Data do Pagamento Restante"
                    name="remaining_payment_date"
                    error={errors.remaining_payment_date?.message}
                    selected={inputSelected.remainingPaymentDateSelected}
                    placeholder="Selecione a data do pagamento restante"

                />

                <Select 
                    control={control}
                    data={[{name: "Cartão",id:"cartao"}, {name:"Dinheiro",id:"dinheiro"}, {name:"Pix",id:"pix"}]}
                    label="Selecione o Método de Pagamento"
                    name="payment_method"
                    error={errors.payment_method?.message}
                    placeholder="Selecione um método de pagamento"
                />

                <Input 
                    control={control}
                    name="observations"
                    selected={inputSelected.observationsSelected}
                    text="Observações"
                    textarea
                    placeholder="Digite as observações"
                    onFocus={() => setInputSelected(state => ({...state,observationsSelected:true}))}
                    onBlur={() => setInputSelected(state => ({...state,observationsSelected:false}))}
                    error={errors.observations?.message}
                />

                <Button title="Atualizar" onPress={handleSubmit(handleUpdateSale)}/>
            </Form>
        </Container>
    )
}