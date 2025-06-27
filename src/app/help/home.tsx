import { Header } from "@/components/header";
import { Form } from "@/components/form";
import { TextComponents } from "@/components/text_components";
import { Container } from "@/components/container";

export default function HelpHome() {
  return (
    <Container>
      <Header hasBackButton title="Ajuda" />
      <Form>
        <TextComponents>
          <TextComponents.Title>Instruções - Tela Inicial</TextComponents.Title>

          <TextComponents.Paragraph>
            O app <TextComponents.Bold>Doce Pedido</TextComponents.Bold> serve para cadastrar as suas vendas e auxiliar na administração do seu negócio.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Para ter uma melhor experiência, é recomendável começar cadastrando seus <TextComponents.Bold>clientes</TextComponents.Bold> e <TextComponents.Bold>produtos</TextComponents.Bold>, pois esses dados são necessários para realizar um novo pedido.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Na tela inicial, você pode acompanhar os <TextComponents.Bold>pedidos pendentes</TextComponents.Bold> (a entregar) e o <TextComponents.Bold>valor total a receber</TextComponents.Bold>.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Utilize os botões de atalho em “Serviços” para navegar entre as funções principais do app, como: cadastrar clientes, produtos, registrar vendas ou acessar a agenda.
          </TextComponents.Paragraph>
        </TextComponents>
      </Form>
    </Container>
  );
}
