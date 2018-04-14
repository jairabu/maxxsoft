package maxxsoft.model.util;

import java.util.List;

import org.hibernate.Session;

import maxxsoft.model.Contato;

public class ContatoDAO {
	public static List<Contato> findByIdUsuario(Long idUsuario) {
		EntityManagerHelper.getEntityManager().clear();
		if(idUsuario!=null) {			
			String hql = "from Contato as c where c.usuario.id = :idUsuario";		
			Session session = EntityManagerHelper.getEntityManager().unwrap(Session.class);			
			@SuppressWarnings("unchecked")
			List<Contato> contatos = session.createQuery(hql).setLong("idUsuario", idUsuario).list();
			return contatos;
		} else {
			String hql = "from Contato as c";		
			Session session = EntityManagerHelper.getEntityManager().unwrap(Session.class);								
			@SuppressWarnings("unchecked")
			List<Contato> contatos = session.createQuery(hql).list();
			return contatos;
		}
	}
}
