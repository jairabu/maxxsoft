package maxxsoft.model.util;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

public class GenericDAO<T> {
	public static <T> void save(T entity) {
		EntityManagerHelper.beginTransaction();
		EntityManagerHelper.getEntityManager().persist(entity);
		EntityManagerHelper.commit();
	}

	public static <T> void update(T entity) {
		EntityManagerHelper.beginTransaction();
		EntityManagerHelper.getEntityManager().merge(entity);
		EntityManagerHelper.commit();
	}

	public static <T> void delete(T entity) {
		EntityManagerHelper.beginTransaction();
		EntityManagerHelper.getEntityManager().remove(entity);
		EntityManagerHelper.commit();
	}

	public static <T> void deleteById(Class<T> persistedClass, Long id) {		
		T entity = findByField(persistedClass, "id", id);
		delete(entity);
	}

	public static <T> List<T> findAll(Class<T> persistedClass) {
		EntityManagerHelper.getEntityManager().clear();
		CriteriaBuilder builder = EntityManagerHelper.getEntityManager().getCriteriaBuilder();
		CriteriaQuery<T> query = builder.createQuery(persistedClass);
		query.from(persistedClass);
		return EntityManagerHelper.getEntityManager().createQuery(query).getResultList();
	}

	public static <T> T findByField(Class<T> persistedClass, String fieldName, Long fieldValue) {
		EntityManagerHelper.getEntityManager().clear();
		CriteriaBuilder builder = EntityManagerHelper.getEntityManager().getCriteriaBuilder();
		CriteriaQuery<T> criteria = builder.createQuery(persistedClass);	   
		Root<T> root = criteria.from(persistedClass);
		criteria.distinct(true);
		criteria.where(builder.equal(root.get(fieldName),fieldValue));
		return EntityManagerHelper.getEntityManager().createQuery(criteria).getSingleResult();
	}
}
