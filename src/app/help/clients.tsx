import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Header } from "@/components/header";
import { TextComponents } from "@/components/text_components";

export default function HelpClients() {
  return (
    <Container>
      <Header hasBackButton title="Ajuda" />
      <Form>
        <TextComponents>
          <TextComponents.Title>Instruções - Clientes</TextComponents.Title>

          <TextComponents.Paragraph>
            A tela de <TextComponents.Bold>clientes</TextComponents.Bold> exibe todos os clientes cadastrados, organizados em ordem alfabética.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Cada card de cliente mostra o <TextComponents.Bold>nome</TextComponents.Bold> (que deve ser único), o <TextComponents.Bold>telefone</TextComponents.Bold> e os dados de <TextComponents.Bold>endereço</TextComponents.Bold>.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Os cards possuem três botões:
            {"\n"}- Iniciar uma conversa no <TextComponents.Bold>WhatsApp</TextComponents.Bold>;
            {"\n"}- <TextComponents.Bold>Editar</TextComponents.Bold> os dados do cliente;
            {"\n"}- <TextComponents.Bold>Excluir</TextComponents.Bold> o cliente do sistema.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Ao clicar em <TextComponents.Bold>"Adicionar Cliente"</TextComponents.Bold>, você será levado para a tela de cadastro, que possui os seguintes campos:
            {"\n"}- <TextComponents.Bold>Nome</TextComponents.Bold>: obrigatório e não pode ser repetido;
            {"\n"}- <TextComponents.Bold>Telefone</TextComponents.Bold>: obrigatório;
            {"\n"}- <TextComponents.Bold>Número da casa, Rua, Bairro, Cidade</TextComponents.Bold>: opcionais;
            {"\n"}- <TextComponents.Bold>Notas</TextComponents.Bold>: opcional, ideal para observações sobre o cliente (como “cliente inadimplente”, “mora com a avó”, etc).
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            A tela de <TextComponents.Bold>edição</TextComponents.Bold> possui os mesmos campos e permite atualizar os dados de um cliente já cadastrado.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            O botão <TextComponents.Bold>"Excluir cliente"</TextComponents.Bold> remove o cliente do sistema de forma <TextComponents.Bold>permanente</TextComponents.Bold>, apagando seus dados da nuvem. Essa ação não pode ser desfeita.
          </TextComponents.Paragraph>
        </TextComponents>
      </Form>
    </Container>
  );
}
