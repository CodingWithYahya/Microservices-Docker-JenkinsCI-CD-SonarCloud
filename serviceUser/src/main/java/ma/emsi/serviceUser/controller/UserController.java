package ma.emsi.serviceUser.controller;

import ma.emsi.serviceUser.model.User;
import ma.emsi.serviceUser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("find/{id}")
    public User findById(@PathVariable(required = true) String id) {
        return userRepository.findById(Integer.parseInt(id));
    }
    
    @PostMapping("authentification")
    public Boolean authentification(@RequestBody User user) {
        for(User u : userRepository.findAll())
        	if(u.getEmail().equals(user.getEmail()) && u.getPassword().equals(user.getPassword()))
        		return true;
        return false;
    }
    

    @GetMapping("findAll")
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @PostMapping("save")
    public void save(@RequestBody User user) {
        userRepository.save(user);
    }

    @PutMapping("put")
    public void patch(@RequestBody User user) {
        userRepository.save(user);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable(required = true) String id) {
        userRepository.delete(userRepository.findById(Integer.parseInt(id)));
    }

    @DeleteMapping("deleteAll")
    public void deleteAll() {
        userRepository.deleteAll();
    }

    @GetMapping("count")
    public long count() {
        return userRepository.count();
    }
}
