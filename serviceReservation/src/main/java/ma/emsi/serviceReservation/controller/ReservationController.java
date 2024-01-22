package ma.emsi.serviceReservation.controller;

import ma.emsi.serviceReservation.ServiceReservationApplication.ChambreService;
import ma.emsi.serviceReservation.ServiceReservationApplication.UserService;
import ma.emsi.serviceReservation.model.Reservation;
import ma.emsi.serviceReservation.model.User;
import ma.emsi.serviceReservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reservation")
public class ReservationController {
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ChambreService chambreService;

    @GetMapping("find/{id}")
    public Reservation findById(@PathVariable(required = true)String id) {
        return reservationRepository.findById(Integer.parseInt(id));
    }

    @GetMapping("findAll")
    public List<Reservation> findAll() {
    	List<Reservation> reservations = reservationRepository.findAll();
    	for(Reservation res : reservations) {
    		res.setChambre(chambreService.findById(String.valueOf(res.getChambreId())));
    		res.setUser(userService.findById(String.valueOf(res.getUserId())));
    		System.out.println(res);
    	}
        return reservations;
    }

    @PostMapping("save")
    public void save(@RequestBody Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @PutMapping("put")
    public void patch(@RequestBody Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable(required = true) String id) {
        reservationRepository.delete(reservationRepository.findById(Integer.parseInt(id)));
    }

    @DeleteMapping("deleteAll")
    public void deleteAll() {
        reservationRepository.deleteAll();
    }

    @GetMapping("count")
    public long count() {
        return reservationRepository.count();
    }
}
