package maxxsoft.model.util;

import org.hibernate.Session;

import maxxsoft.model.Usuario;

public class UsuarioDAO {
	public static Usuario findByLogin(String login) {
		EntityManagerHelper.getEntityManager().clear();
		String hql = "from Usuario as u where u.login = :login";		
		Session session = EntityManagerHelper.getEntityManager().unwrap(Session.class);	
		Usuario usuario = (Usuario)session.createQuery(hql).setString("login", login).uniqueResult();
		return usuario;
	}
}
