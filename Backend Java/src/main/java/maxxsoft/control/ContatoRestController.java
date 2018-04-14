package maxxsoft.control;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import maxxsoft.model.Contato;
import maxxsoft.model.Usuario;
import maxxsoft.model.util.ContatoDAO;
import maxxsoft.model.util.GenericDAO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ContatoRestController {
	private static final String URL = "/api/contato";
	
	@GetMapping(URL+"/usuario/{id}") 
	public List<Contato> getContatos(@PathVariable("id") Long id) {	
		Usuario usuario = GenericDAO.findByField(Usuario.class, "id", id);
		if(usuario!=null && usuario.getIsAdm()!=null && usuario.getIsAdm()==true) {
			return GenericDAO.findAll(Contato.class);
		}
		else if(usuario!=null) {
			return ContatoDAO.findByIdUsuario(id);
		}
		else {
			return null;
		}
	}
	
	@GetMapping(URL+"/{id}")
	public Contato getContato(@PathVariable("id") Long id) {
		Contato contato = GenericDAO.findByField(Contato.class, "id", id);		
		return contato;
	}
	
	@PostMapping(URL)
	public void salvarContato(@RequestBody Contato contato) {
		salvarAtualizarContato(contato);		
	}
	
	@PutMapping(URL)
	public void atualizarContato(@RequestBody Contato contato) {
		salvarAtualizarContato(contato);		
	}
	
	public void salvarAtualizarContato(Contato contato) {
		if(contato!=null && contato.getId()==null) {
			contato.setDataCadastro(new Date());
			GenericDAO.save(contato);			
		} else if(contato!=null && contato.getId()!=null) {
			GenericDAO.update(contato);
		}
	}
	
	@DeleteMapping(URL+"/{id}")
	public void removerContato(@PathVariable Long id) {		
		Contato contato = GenericDAO.findByField(Contato.class, "id", id);
		GenericDAO.delete(contato);		
	}
}
