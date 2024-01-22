package ma.emsi.serviceChambre.controller;

import ma.emsi.serviceChambre.model.Hotel;
import ma.emsi.serviceChambre.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/hotel")
public class HotelController {
    @Autowired
    private HotelRepository hotelRepository;

    @GetMapping("find/{id}")
    public Hotel findById(@PathVariable(required = true) String id) {
        return hotelRepository.findById(Integer.parseInt(id));
    }

    @GetMapping("findAll")
    public List<Hotel> findAll() {
        return hotelRepository.findAll();
    }

    @PostMapping("save")
    public void save(@RequestBody Hotel Hotel) {
        hotelRepository.save(Hotel);
    }

    @PutMapping("put")
    public void patch(@RequestBody Hotel Hotel) {
        hotelRepository.save(Hotel);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable(required = true) String id) {
        hotelRepository.delete(hotelRepository.findById(Integer.parseInt(id)));
    }

    @DeleteMapping("deleteAll")
    public void deleteAll() {
        hotelRepository.deleteAll();
    }

    @GetMapping("count")
    public long count() {
        return hotelRepository.count();
    }
}
