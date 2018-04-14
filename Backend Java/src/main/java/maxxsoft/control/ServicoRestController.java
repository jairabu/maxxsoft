package maxxsoft.control;

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

import maxxsoft.model.Servico;
import maxxsoft.model.util.GenericDAO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ServicoRestController {
	private static final String URL = "/api/servico";
	
	@GetMapping(URL) 
	public List<Servico> getServicos(Model model) {	
		return GenericDAO.findAll(Servico.class);
	}
	
	@GetMapping(URL+"/{id}")
	public Servico getServico(@PathVariable("id") Long id) {
		Servico servico = GenericDAO.findByField(Servico.class, "id", id);		
		return servico;
	}
	
	@PostMapping(URL)
	public void salvarServico(@RequestBody Servico servico) {
		salvarAtualizarServico(servico);		
	}
	
	@PutMapping(URL)
	public void atualizarServico(@RequestBody Servico servico) {
		salvarAtualizarServico(servico);		
	}
	
	public void salvarAtualizarServico(Servico servico) {
		if(servico!=null && servico.getId()==null) {			
			GenericDAO.save(servico);			
		} else if(servico!=null && servico.getId()!=null) {
			GenericDAO.update(servico);
		}
	}
	
	@DeleteMapping(URL+"/{id}")
	public void removerServico(@PathVariable Long id) {		
		Servico servico = GenericDAO.findByField(Servico.class, "id", id);
		GenericDAO.delete(servico);		
	}
}
