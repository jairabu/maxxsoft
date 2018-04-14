package maxxsoft.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {	
	@Id 
	@GeneratedValue
	private Long id;
	private String nome;	
	private String login;
	private String senha;
	private Date dataCadastro;
	private Boolean isAdm;
	@JsonIgnore
	@OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY, cascade = CascadeType.ALL)	
	private List<Contato> contatos;
	@JsonIgnore
	@OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY, cascade = CascadeType.ALL)	
	private List<Servico> servicos;
	private String token;
}
