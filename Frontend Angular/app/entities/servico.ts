import { TipoServico } from '../entities/tipo-servico';
import { StatusServico } from '../entities/status-servico';
import { Usuario } from '../entities/usuario';
import { Contato } from '../entities/contato';

export class Servico {
  id: number;
  motivoChamado: string;
	diagnosticoTecnico: string;
	descricaoServico: string;
  informacaoAdicional: string;
  valorTotal: number;
  tipoServico: TipoServico;
  statusServico: StatusServico;
  usuario: Usuario;
  contato: Contato;
  inicioAtendimento: Date;
  fimAtendimento: Date;
}
