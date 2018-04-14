package maxxsoft.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Servico {
	@Id 
	@GeneratedValue
	private Long id;
	private String motivoChamado;
	private String diagnosticoTecnico;
	private String descricaoServico;	
	private String informacaoAdicional;
	private Double valorTotal;
	@ManyToOne 
	@JoinColumn(name="id_tipo_servico")
	private TipoServico tipoServico;
	@ManyToOne 
	@JoinColumn(name="id_status_servico")
	private StatusServico statusServico;
	@ManyToOne 
	@JoinColumn(name="id_usuario")
	private Usuario usuario;
	@ManyToOne 
	@JoinColumn(name="id_contato")
	private Contato contato;
	private Date inicioAtendimento;
	private Date fimAtendimento;
}
