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

import maxxsoft.model.TipoServico;
import maxxsoft.model.util.GenericDAO;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TipoServicoRestController {
	private static final String URL = "/api/tipo-servico";
	
	@GetMapping(URL) 
	public List<TipoServico> getTipoServicos(Model model) {	
		return GenericDAO.findAll(TipoServico.class);
	}
	
	@GetMapping(URL+"/{id}")
	public TipoServico getTipoServico(@PathVariable("id") Long id) {
		TipoServico tipoServico = GenericDAO.findByField(TipoServico.class, "id", id);		
		return tipoServico;
	}
	
	@PostMapping(URL)
	public void salvarTipoServico(@RequestBody TipoServico tipoServico) {
		salvarAtualizarTipoServico(tipoServico);		
	}
	
	@PutMapping(URL)
	public void atualizarTipoServico(@RequestBody TipoServico tipoServico) {
		salvarAtualizarTipoServico(tipoServico);		
	}
	
	public void salvarAtualizarTipoServico(TipoServico tipoServico) {
		if(tipoServico!=null && tipoServico.getId()==null) {
			//tipoServico.setDataCadastro(new Date());
			GenericDAO.save(tipoServico);			
		} else if(tipoServico!=null && tipoServico.getId()!=null) {
			GenericDAO.update(tipoServico);
		}
	}
	
	@DeleteMapping(URL+"/{id}")
	public void removerTipoServico(@PathVariable Long id) {		
		TipoServico tipoServico = GenericDAO.findByField(TipoServico.class, "id", id);
		GenericDAO.delete(tipoServico);		
	}
}
