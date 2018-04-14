package maxxsoft.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contato {
	@Id 
	@GeneratedValue
	private Long id;
	private String nome;
	private String sobrenome;
	private String telefone;
	private String celular;
	private String email;
	private String endereco;
	private String informacaoAdicional;
	private Date dataCadastro;
	@ManyToOne 
	@JoinColumn(name="id_usuario")
	private Usuario usuario;
	@JsonIgnore
	@OneToMany(mappedBy = "contato", fetch = FetchType.LAZY, cascade = CascadeType.ALL)	
	private List<Servico> servicos;
}
