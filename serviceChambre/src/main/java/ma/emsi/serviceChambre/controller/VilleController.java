package ma.emsi.serviceChambre.controller;

import ma.emsi.serviceChambre.model.Ville;
import ma.emsi.serviceChambre.repository.VilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/ville")
public class VilleController {
    @Autowired
    private VilleRepository villeRepository;

    @GetMapping("find/{id}")
    public Ville findById(@PathVariable(required = true) String id) {
        return villeRepository.findById(Integer.parseInt(id));
    }

    @GetMapping("findAll")
    public List<Ville> findAll() {
        return villeRepository.findAll();
    }

    @PostMapping("save")
    public void save(@RequestBody Ville Ville) {
        villeRepository.save(Ville);
    }

    @PutMapping("put")
    public void patch(@RequestBody Ville Ville) {
        villeRepository.save(Ville);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable(required = true) String id) {
        villeRepository.delete(villeRepository.findById(Integer.parseInt(id)));
    }

    @DeleteMapping("deleteAll")
    public void deleteAll() {
        villeRepository.deleteAll();
    }

    @GetMapping("count")
    public long count() {
        return villeRepository.count();
    }
}
