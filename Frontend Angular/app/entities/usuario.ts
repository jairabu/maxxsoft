import { Contato } from '../entities/contato';
import { Servico } from '../entities/servico';

export class Usuario {
  id: number;
  nome: string;
	login: string;
	senha: string;
	dataCadastro: Date;
  isAdm: boolean;
	contatos: Contato[];
	servicos: Servico[];
  token: string;
}
