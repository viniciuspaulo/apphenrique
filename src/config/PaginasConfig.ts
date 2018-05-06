
import { PerfilPage } from '../pages/perfil/perfil';
import { MenuInterface } from '../interfaces/MenuInterface';
import { SobrePage } from '../pages/sobre/sobre';
import { ContactPage } from '../pages/contact/contact';
import { AlterarsenhaPage } from '../pages/alterarsenha/alterarsenha';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { EnderecosPage } from '../pages/enderecos/enderecos';
import { MeuspedidosPage } from '../pages/meuspedidos/meuspedidos';
import { RecuperaPage } from '../pages/recupera/recupera';

export const MenuConfigDashBoard:Array<MenuInterface> = [
    {titulo : 'Sobre', icone : 'body', pagina : SobrePage, detalhe : 'Sobre'},
    {titulo : 'Contato', icone : 'mail', pagina : ContactPage, detalhe : 'Contato'},
    {titulo : 'Carrinho', icone : 'cart', pagina : CarrinhoPage, detalhe : 'Teste'},
    {titulo : 'Endereços', icone : 'compass', pagina : EnderecosPage, detalhe : 'Teste'},
    {titulo : 'Meus Pedidos', icone : 'contact', pagina : MeuspedidosPage, detalhe : 'Teste'},
    {titulo : 'Alterar Senha', icone : 'key', pagina : AlterarsenhaPage, detalhe : 'Teste'},
];
