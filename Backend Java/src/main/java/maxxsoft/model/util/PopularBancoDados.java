package maxxsoft.model.util;

import java.util.Date;

import maxxsoft.model.Contato;
import maxxsoft.model.Servico;
import maxxsoft.model.StatusServico;
import maxxsoft.model.TipoServico;
import maxxsoft.model.Usuario;

public class PopularBancoDados {

	public static void main(String[] args) {
		Usuario u1 = new Usuario();
		u1.setLogin("jairabu@gmail.com");
		u1.setSenha("123");
		u1.setNome("Jair");
		u1.setIsAdm(true);
		GenericDAO.save(u1);		
		Usuario u2 = new Usuario();
		u2.setLogin("pedro@gmail.com");
		u2.setSenha("pedro123");
		u2.setNome("Pedro Teste");
		GenericDAO.save(u2);
		
		Contato c1 = new Contato();		
		c1.setNome("Contato 1 teste");
		c1.setUsuario(u1);
		GenericDAO.save(c1);
		Contato c2 = new Contato();		
		c2.setNome("Contato 2 teste");
		c2.setUsuario(u1);
		GenericDAO.save(c2);
		Contato c3 = new Contato();		
		c3.setNome("Contato 3 teste");
		c3.setUsuario(u2);
		GenericDAO.save(c3);
		
		TipoServico t1 = new TipoServico();
		t1.setNome("Recarga de Toner");
		GenericDAO.save(t1);		
		TipoServico t2 = new TipoServico();
		t2.setNome("Conserto de Impressora");
		GenericDAO.save(t2);		
		TipoServico t3 = new TipoServico();
		t3.setNome("Venda de Impressora");
		GenericDAO.save(t3);
		
		StatusServico ss1 = new StatusServico();
		ss1.setNome("Finalizado e não pago");
		GenericDAO.save(ss1);
		StatusServico ss2 = new StatusServico();
		ss2.setNome("Em andamento");
		GenericDAO.save(ss2);
		StatusServico ss3 = new StatusServico();
		ss3.setNome("Finalizado e pago");
		GenericDAO.save(ss3);
		
		Servico s1 = new Servico();
		s1.setContato(c1);
		s1.setUsuario(u1);
		s1.setTipoServico(t1);
		s1.setDiagnosticoTecnico("O toner estava entupido");
		s1.setInicioAtendimento(new Date());
		s1.setStatusServico(ss2);
		GenericDAO.save(s1);
	}

}
