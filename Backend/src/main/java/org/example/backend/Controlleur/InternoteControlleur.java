package org.example.backend.Controlleur;

import io.jsonwebtoken.Jwts;
import org.example.backend.Model.Internote;
import org.example.backend.ServiceImplement.InternoteServImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping("/Internote")
public class InternoteControlleur
{
    @Autowired
    private InternoteServImpl internoteServ;
    @GetMapping("/GetAllInternote")
    public List<Internote> getAllInternote(){
        return internoteServ.GetAllInternote();
    }
    @GetMapping("/GetInternote/{id}")
    public Internote getInternote(@PathVariable Long id){
        return internoteServ.GetInternoteById(id);
    }

    @PostMapping("/AddInternote")
    public Internote addInternote(@RequestBody Internote internote){
        return internoteServ.AddInternote(internote);
    }
    @PutMapping("/UpdateInternote/{id}")
    public ResponseEntity<Internote> updateInternote(@RequestBody Internote internote, @PathVariable Long id){
        Internote existingInternote = internoteServ.GetInternoteById(id);
        if(existingInternote != null){
            existingInternote.setFullName(internote.getFullName());
            existingInternote.setEmailadress(internote.getEmailadress());
            existingInternote.setPassword(internote.getPassword());
            existingInternote.setUserName(internote.getUserName());
            existingInternote.setRole(internote.getRole());
            Internote savedInternote = internoteServ.UpdateInternote(existingInternote);
            return ResponseEntity.ok(savedInternote);
        }
        else {
            return ResponseEntity.notFound().build();
        }

    }
    @DeleteMapping("/DeleteInternote/{Id}")
    public ResponseEntity<?> deleteInternote(@PathVariable Long Id){
        Internote existInternote = internoteServ.GetInternoteById(Id);
        if(existInternote != null){
            internoteServ.DeleteInternote(existInternote);
            return ResponseEntity.ok("Internote was deleted successfully");
        }else {
            return ResponseEntity.notFound().build();
        }
    }
     @PostMapping("/Register")
    public ResponseEntity<?> register(@RequestBody Internote internote){
        if (internoteServ.GetInternoteByemail(internote.getEmailadress()))
        {
            return ResponseEntity.badRequest().body("Email adress already in use , please try another one");
        }
        if (internoteServ.GetInternoteByusername(internote.getUserName()))
        {
            return ResponseEntity.badRequest().body("Username already in use , please try another one");
        }
        if (internoteServ.GetInternoteBypassword(internote.getPassword()))
        {
            return ResponseEntity.badRequest().body("Password already in use , please try another password");
        }
        if (internote.getPassword().length() < 8){
            return ResponseEntity.badRequest().body("Password must be at least 8 characters");
        }
        if (internote.getUserName().length() < 8){
            return ResponseEntity.badRequest().body("Username must be at least 8 characters");
        }
        if (!internote.getEmailadress().contains("@"))
        {
            return ResponseEntity.badRequest().body("Email adress must contain @");
        }
        String passwordPattern = "(?=.*[A-Z])(?=.*[a-z])(?=.*[&-=].+$).{8,20}";
        if (!internote.getPassword().matches(passwordPattern)){
            return ResponseEntity.badRequest().body("Password must contains at last one  upper case letter ,lower case letter ,digits and one special letters ");
        }
        internoteServ.AddInternote(internote);
        Map<String,String> response = new HashMap<>();
        response.put("message","User was added successfully");
        response.put("status","OK");
        return ResponseEntity.ok(response);
     }
     @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody Internote internote , Long id){
        Internote existingInternote = internoteServ.GetInternoteByemailAndPassword(internote.getEmailadress(),internote.getPassword());
        if(existingInternote == null){
            return ResponseEntity.badRequest().body("Email adress or password is incorrect");
        }
        String token = Jwts.builder()
                .setSubject(existingInternote.getId().toString())//set id as the subject
                .claim("email" , existingInternote.getEmailadress()) // Add email as a claim
                .claim("Role" , existingInternote.getRole())
                .claim("Post" ,existingInternote.getPosts())
                .compact();
        return ResponseEntity.ok(Map.of("message","Login successful","token",token,"role",existingInternote.getRole()));
          }
}
