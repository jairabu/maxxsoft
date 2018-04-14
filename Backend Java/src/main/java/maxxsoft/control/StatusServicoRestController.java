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

import maxxsoft.model.StatusServico;
import maxxsoft.model.util.GenericDAO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StatusServicoRestController {
	private static final String URL = "/api/status-servico";
	
	@GetMapping(URL) 
	public List<StatusServico> getStatusServicos(Model model) {	
		return GenericDAO.findAll(StatusServico.class);
	}
	
	@GetMapping(URL+"/{id}")
	public StatusServico getStatusServico(@PathVariable("id") Long id) {
		StatusServico statusServico = GenericDAO.findByField(StatusServico.class, "id", id);		
		return statusServico;
	}
	
	@PostMapping(URL)
	public void salvarStatusServico(@RequestBody StatusServico statusServico) {
		salvarAtualizarStatusServico(statusServico);		
	}
	
	@PutMapping(URL)
	public void atualizarStatusServico(@RequestBody StatusServico statusServico) {
		salvarAtualizarStatusServico(statusServico);		
	}
	
	public void salvarAtualizarStatusServico(StatusServico statusServico) {
		if(statusServico!=null && statusServico.getId()==null) {
			//statusServico.setDataCadastro(new Date());
			GenericDAO.save(statusServico);			
		} else if(statusServico!=null && statusServico.getId()!=null) {
			GenericDAO.update(statusServico);
		}
	}
	
	@DeleteMapping(URL+"/{id}")
	public void removerStatusServico(@PathVariable Long id) {		
		StatusServico statusServico = GenericDAO.findByField(StatusServico.class, "id", id);
		GenericDAO.delete(statusServico);		
	}
}
