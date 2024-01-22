package ma.emsi.serviceChambre.repository;

import ma.emsi.serviceChambre.model.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChambreRepository extends JpaRepository<Chambre, Integer> {
    Chambre findById(int id);
}
