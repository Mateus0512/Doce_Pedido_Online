import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Header } from "@/components/header";
import { TextComponents } from "@/components/text_components";

export default function HelpProducts() {
  return (
    <Container>
      <Header title="Ajuda" hasBackButton />
      <Form>
        <TextComponents>
          <TextComponents.Title>Instruções - Produtos</TextComponents.Title>

          <TextComponents.Paragraph>
            A tela de <TextComponents.Bold>produtos</TextComponents.Bold> exibe todos os produtos cadastrados, organizados em ordem alfabética.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Cada card de produto mostra o <TextComponents.Bold>nome</TextComponents.Bold> e o <TextComponents.Bold>valor</TextComponents.Bold> do produto.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Os cards possuem dois botões:
            {"\n"}- <TextComponents.Bold>Editar</TextComponents.Bold> os dados do produto;
            {"\n"}- <TextComponents.Bold>Excluir</TextComponents.Bold> o produto do sistema.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Ao clicar em <TextComponents.Bold>"Adicionar Produto"</TextComponents.Bold>, você será levado para a tela de cadastro, que possui os seguintes campos:
            {"\n"}- <TextComponents.Bold>Nome</TextComponents.Bold>: obrigatório e não pode ser repetido;
            {"\n"}- <TextComponents.Bold>Valor</TextComponents.Bold>: obrigatório e deve ser um número válido.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            A tela de <TextComponents.Bold>edição</TextComponents.Bold> permite atualizar o nome e o valor de um produto já cadastrado.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            O botão <TextComponents.Bold>"Excluir produto"</TextComponents.Bold> remove o produto do sistema de forma <TextComponents.Bold>permanente</TextComponents.Bold>.
          </TextComponents.Paragraph>
        </TextComponents>
      </Form>
    </Container>
  );
}
