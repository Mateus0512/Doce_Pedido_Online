import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Header } from "@/components/header";
import { TextComponents } from "@/components/text_components";

export default function HelpSales() {
  return (
    <Container>
      <Header title="Ajuda" hasBackButton />
      <Form>
        <TextComponents>
          <TextComponents.Title>Instruções - Vendas</TextComponents.Title>

          <TextComponents.Paragraph>
            A tela inicial de <TextComponents.Bold>vendas</TextComponents.Bold> lista as últimas 30 vendas realizadas, da mais recente para a mais antiga.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Há um campo de seleção no topo com os nomes de todos os <TextComponents.Bold>clientes cadastrados</TextComponents.Bold>. Ao selecionar um cliente, serão exibidas apenas as vendas relacionadas a ele.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Cada <TextComponents.Bold>card de venda</TextComponents.Bold> mostra:
            {"\n"}- Tema da festa (ou "Venda simples" se não houver tema);
            {"\n"}- Nome do aniversariante;
            {"\n"}- Nome do cliente;
            {"\n"}- Data do pedido;
            {"\n"}- Data da entrega;
            {"\n"}- Status da venda (Entregue ou Pendente).
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Para <TextComponents.Bold>abrir uma venda</TextComponents.Bold>, é necessário pressionar e segurar o card por 1 segundo.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            O botão <TextComponents.Bold>"Adicionar Venda"</TextComponents.Bold> leva à tela de cadastro, que possui 4 etapas:
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            1. <TextComponents.Bold>Informações da venda</TextComponents.Bold>:
            {"\n"}- Cliente (dropdown, obrigatório);
            {"\n"}- Data do pedido (obrigatório);
            {"\n"}- Data da entrega (obrigatório);
            {"\n"}- Tema da festa (opcional);
            {"\n"}- Nome do aniversariante (opcional);
            {"\n"}- Idade a completar (opcional).
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            2. <TextComponents.Bold>Seleção de produtos</TextComponents.Bold>:
            {"\n"}- Exibe todos os produtos cadastrados;
            {"\n"}- É necessário selecionar ao menos um produto para continuar.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            3. <TextComponents.Bold>Quantidades</TextComponents.Bold>:
            {"\n"}- Informe a quantidade de cada produto selecionado.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            4. <TextComponents.Bold>Pagamento</TextComponents.Bold>:
            {"\n"}- Valor da entrada (obrigatório);
            {"\n"}- Valor total (não editável);
            {"\n"}- Data do pagamento restante (opcional);
            {"\n"}- Método de pagamento (dropdown com "Cartão", "Dinheiro" e "Pix" - obrigatório);
            {"\n"}- Observações (opcional).
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            A tela de detalhes da venda exibe todas as informações preenchidas no cadastro, além dos <TextComponents.Bold>produtos</TextComponents.Bold> com suas quantidades e valores unitários.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            Existem 6 opções disponíveis para cada venda:
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            1. <TextComponents.Bold>Adicionar produto à venda</TextComponents.Bold>:
            {"\n"}- Permite adicionar novos produtos (não repetidos);
            {"\n"}- É necessário informar a quantidade;
            {"\n"}- O valor total é recalculado automaticamente.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            2. <TextComponents.Bold>Alterar status da venda</TextComponents.Bold>:
            {"\n"}- Alterna entre "pendente" e "entregue";
            {"\n"}- Vendas pendentes aparecem na agenda e no valor a receber.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            3. <TextComponents.Bold>Alterar dados da venda</TextComponents.Bold>:
            {"\n"}- Permite editar os dados informados na primeira etapa do cadastro (exceto produtos e quantidades).
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            4. <TextComponents.Bold>Alterar quantidade do produto</TextComponents.Bold>:
            {"\n"}- Permite modificar a quantidade dos produtos já presentes na venda;
            {"\n"}- O valor total é atualizado automaticamente.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            5. <TextComponents.Bold>Excluir produto da venda</TextComponents.Bold>:
            {"\n"}- Remove produtos selecionados da venda;
            {"\n"}- O valor total é atualizado automaticamente.
          </TextComponents.Paragraph>

          <TextComponents.Paragraph>
            6. <TextComponents.Bold>Excluir a venda</TextComponents.Bold>:
            {"\n"}- Remove a venda do sistema permanentemente.
          </TextComponents.Paragraph>
        </TextComponents>
      </Form>
    </Container>
  );
}
