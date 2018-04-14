import { Usuario } from '../entities/usuario';
import { Servico } from '../entities/servico';

export class Contato {
  id: number;
  nome: string;
	sobrenome: string;
	telefone: string;
	celular: string;
	email: string;
	endereco: string;
	informacaoAdicional: string;
	dataCadastro: Date;
	usuario: Usuario;
	servicos: Servico[];
}
