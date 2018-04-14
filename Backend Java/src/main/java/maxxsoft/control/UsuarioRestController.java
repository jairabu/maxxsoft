package maxxsoft.control;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import maxxsoft.model.Usuario;
import maxxsoft.model.util.GenericDAO;
import maxxsoft.model.util.UsuarioDAO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioRestController {
	private static final String URL = "/api/usuario";
	
	@GetMapping(URL) 
	public List<Usuario> getUsuarios(Model model) {	
		return GenericDAO.findAll(Usuario.class);
	}
	
	@GetMapping(URL+"/{id}")
	public Usuario getUsuario(@PathVariable("id") Long id) {
		Usuario usuario = GenericDAO.findByField(Usuario.class, "id", id);		
		return usuario;
	}
	
	@PostMapping(URL)
	public void salvarUsuario(@RequestBody Usuario usuario) {
		salvarAtualizarUsuario(usuario);		
	}
	
	@PutMapping(URL)
	public void atualizarUsuario(@RequestBody Usuario usuario) {
		salvarAtualizarUsuario(usuario);		
	}
	
	public void salvarAtualizarUsuario(Usuario usuario) {
		if(usuario!=null && usuario.getId()==null) {
			//usuario.setDataCadastro(new Date());
			GenericDAO.save(usuario);			
		} else if(usuario!=null && usuario.getId()!=null) {
			GenericDAO.update(usuario);
		}
	}
	
	@DeleteMapping(URL+"/{id}")
	public void removerUsuario(@PathVariable Long id) {		
		Usuario usuario = GenericDAO.findByField(Usuario.class, "id", id);
		GenericDAO.delete(usuario);		
	}
		 
	@GetMapping(URL+"/login/{parametro:.+}")
	public Usuario login(@PathVariable("parametro") String parametro) {
		String[] params = parametro.split(":");
		if(params.length!=2) {
			return null;
		}
		String login = params[0];
		String senha = params[1];
		Usuario usuarioBD = UsuarioDAO.findByLogin(login);
		if(usuarioBD!=null && usuarioBD.getSenha().equals(senha)) {
			String hashStr = Calendar.getInstance().get(Calendar.DAY_OF_YEAR)+" "+usuarioBD.getLogin();
			usuarioBD.setToken(obterHash(hashStr));
			GenericDAO.update(usuarioBD);
		} else if(usuarioBD!=null) {
			usuarioBD.setToken("");
			GenericDAO.update(usuarioBD);			
		}
		
		return usuarioBD;		
	}
	
	@GetMapping(URL+"/logout/{parametro}") 
	public void logout(@PathVariable String login) {
		Usuario usuarioBD = UsuarioDAO.findByLogin(login);
		if(usuarioBD!=null) {			
			usuarioBD.setToken("");
			GenericDAO.update(usuarioBD);
		} 		
	}
	
	private static String obterHash(String s) {	  
		String hash = "";
		try {
			MessageDigest m;
			m = MessageDigest.getInstance("MD5");
			m.update(s.getBytes(),0,s.length());
			hash = new BigInteger(1,m.digest()).toString(16);
			System.out.println("MD5: "+hash);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return hash;
	}
}
