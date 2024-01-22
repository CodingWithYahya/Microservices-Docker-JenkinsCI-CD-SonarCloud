package ma.emsi.serviceChambre.controller;

import ma.emsi.serviceChambre.model.Chambre;
import ma.emsi.serviceChambre.repository.ChambreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/chambre")
public class ChambreController {
    @Autowired
    private ChambreRepository chambreRepository;
    @GetMapping("find/{id}")
    public Chambre findById(@PathVariable(required = true) String id) {
        return chambreRepository.findById(Integer.parseInt(id));
    }

    @GetMapping("findAll")
    public List<Chambre> findAll() {
        return chambreRepository.findAll();
    }

    @PostMapping("save")
    public void save(@RequestBody Chambre Chambre) {
        chambreRepository.save(Chambre);
    }

    @PutMapping("put")
    public void patch(@RequestBody Chambre Chambre) {
        chambreRepository.save(Chambre);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable(required = true) String id) {
        chambreRepository.delete(chambreRepository.findById(Integer.parseInt(id)));
    }

    @DeleteMapping("deleteAll")
    public void deleteAll() {
        chambreRepository.deleteAll();
    }

    @GetMapping("count")
    public long count() {
        return chambreRepository.count();
    }
}
