import { Body } from "@/components/body";
import { Container } from "@/components/container";
import { DatePicker } from "@/components/datepicker";
import { Form } from "@/components/form";
import { FormNavigation } from "@/components/form_navigation";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { ProductList } from "@/components/product_list";
import { ProductListInput } from "@/components/product_list_input";
import { Select } from "@/components/select";
import { useAuth } from "@/contexts/authContext";
import { useClients } from "@/lib/useClients";
import { useProducts } from "@/lib/useProducts";
import { useSales } from "@/lib/useSales";
import { saveToStorage } from "@/storage/storageMethods";
import { ProductListProps } from "@/types/products";
import { AddSaleProps, addSaleSchema } from "@/types/sales";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

export default function AddSale(){
    const {control, handleSubmit, setValue,formState:{errors}} = useForm({resolver: zodResolver(addSaleSchema)});
    const {user} = useAuth();
    const supabaseClients = useClients();
    const supabaseProducts = useProducts();
    const supabaseSales = useSales();
    const [clients,setClients] = useState<{id:string,name:string}[]>([]);
    const [products, setProducts] = useState<ProductListProps[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductListProps[]>([]);
    const [page,setPage] = useState(0);

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

    async function loadProducts() {
        try {
            if(!user?.id){
            Alert.alert("Erro", "Usuário não autenticado.");
            return
            }

            const result = await supabaseProducts.fetchProducts(user.id);

            if(result.success && result.data){
                //console.log(result);
                const productList = result.data.map(product => (
                    {id: product.id || "", user_id: product.user_id || "", name: product.name, price: product.price, quantity:1}
                ))
                setProducts(productList);
            }

        } catch (error) {
            console.log(error);
        }
    }

    function prevPage(){
        setPage(page-1);
    }

    function nextPage(){
        if(page==2){
            const total = selectedProducts.reduce((acc, current) => 
                acc + (current.price*current.quantity)
            ,0)
            setValue("total_value",total);
        }
        setPage(page+1);
    }

    async function handleCreateSale(data:any) {
        try {
            if(!user?.id){
            Alert.alert("Erro", "Usuário não autenticado.");
            return
            }
            const createSaleResult = await supabaseSales.createSale({
                user_id: user.id,
                client_id: data.client_id,
                order_date: data.order_date,
                delivery_date: data.delivery_date,
                party_theme: data.party_theme || null,
                birthday_person_name: data.birthday_person_name || null,
                age_to_complete: data.age_to_complete || null,
                entry_value: data.entry_value,
                total_value: data.total_value,
                remaining_payment_date: data.remaining_payment_date || null,
                payment_method: data.payment_method,
                observations: data.observations || null,
                status_delivery: false
            });

            if(createSaleResult.success && createSaleResult.data){
                const addProductResults  = await Promise.all(selectedProducts.map(async product => {
                    const result = await supabaseSales.createProductSale(createSaleResult.data,product.id,product.quantity,product.price);
                    return {result, product};
                }));

                const failedProducts = addProductResults.filter(({result}) => result.success===false);

                if(failedProducts.length>0){
                    const failedProductsToSave = failedProducts.map(failed => ({
                        sale_id: createSaleResult.data,
                        product_id: failed.product.id,
                        quantity: failed.product.quantity,
                        unit_price: failed.product.price,
                        name:failed.product.name
                    }));
                    await saveToStorage<{sale_id:string,product_id:string,quantity:number,unit_price:number,name:string}>("@add_products_sale_pending",failedProductsToSave);
                    Alert.alert("Aviso", "Houve um erro ao salvar na nuvem, o app fará isso automaticamento em instantes.");
                    router.replace("/home");
                }else{
                    Alert.alert("Sucesso", "A venda foi cadastrada com sucesso!");
                    router.replace("/sales");
                }
                
            }else{
                await saveToStorage<AddSaleProps>("@add_sales_pending", [{
                    user_id: user.id,
                    client_id: data.client_id,
                    order_date: data.order_date,
                    delivery_date: data.delivery_date,
                    party_theme: data.party_theme || null,
                    birthday_person_name: data.birthday_person_name || null,
                    age_to_complete: data.age_to_complete || null,
                    entry_value: data.entry_value,
                    total_value: data.total_value,
                    remaining_payment_date: data.remaining_payment_date || null,
                    payment_method: data.payment_method,
                    observations: data.observations || null,
                    status_delivery: false
                }]);

                const failedProductsToSave = selectedProducts.map(failed => ({
                    sale_id: "",
                    product_id: failed.id,
                    quantity: failed.quantity,
                    unit_price: failed.price,
                    name:failed.name
                }))

                await saveToStorage<{sale_id:string,product_id:string,quantity:number,unit_price:number,name:string}>("@add_products_sales_pending",failedProductsToSave);

                Alert.alert("Aviso", "Houve um erro ao salvar na nuvem, o app fará isso automaticamento em instantes.");
                router.replace("/home");
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=> {
        loadClients();
        loadProducts();
    },[]);
    return(
        <Container>
            <Header hasBackButton title="Cadastrar venda" />

                {page==0 && (
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
                    </Form>

                )}
                

                {page==1 && (
                    <Body>
                        <ProductList 
                            products={products}
                            selectedProducts={selectedProducts}
                            setSelectedProducts={setSelectedProducts}
                        />
                    </Body>
                )}

                {page==2 && (
                    <Form>
                        <ProductListInput selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
                    </Form>
                )}

                {page==3 &&
                    <Form>
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
 
                    </Form>
                }




            <FormNavigation 
                prevPage={prevPage} 
                nextPage={nextPage} 
                prevButtonIsDisabled={page==0} 
                nextButtonIsDisabled={page==1 && selectedProducts.length<1} 
                lastPage={page==3}
                handleSubmit={handleSubmit(handleCreateSale)}
            />
        </Container>
    )
}