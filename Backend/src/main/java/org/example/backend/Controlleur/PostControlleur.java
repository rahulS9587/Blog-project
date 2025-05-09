package org.example.backend.Controlleur;

import org.example.backend.Model.Internote;
import org.example.backend.Model.Post;
import org.example.backend.Repository.InternoteRepo;
import org.example.backend.ServiceImplement.InternoteServImpl;
import org.example.backend.ServiceImplement.PostImplServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping("/Post")
public class PostControlleur
{
    @Autowired
    private PostImplServ postServ;
    @Autowired
    private InternoteRepo internoteRepo;
    @Autowired
    private InternoteServImpl internoteServ;

    @PostMapping("/CreatePost")
    public Post createPost(@RequestBody Post post)
    {
        return postServ.addPost(post);
    }
    @PostMapping("/addPost/{internoteId}")
    public ResponseEntity<Post> addPost(@PathVariable Long internoteId, @RequestBody Post post) {
        Internote internote = internoteRepo.findById(internoteId).orElseThrow(() -> new RuntimeException("Internote not found"));
        post.setInternote(internote);
        Post savedPost = postServ.addPost(post);
        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/AllPost")
    public List<Post> getAllPost()
    {
        return postServ.getAllPosts();
    }
    @GetMapping("/Post/{category}")
    public List<Post> GetPostByCategory(@PathVariable String category)
    {
        return  postServ.getPostsByCategory(category);
    }
    @GetMapping("GetAllByid/{internote_id}")
    public  List<Post> GetPost(@PathVariable Long internote_id){
        return  postServ.getAllPostsByIdInternote(internote_id);
    }

    @GetMapping("/GetByid/{id}")
    public Post GetById(@PathVariable Long id)
    {
        return postServ.getPostById(id);
    }
    @PutMapping("/UpdatePost/{id}/{internote_id}")
    public ResponseEntity<Post> UpdatePost(@PathVariable Long id, @PathVariable Long internote_id, @RequestBody Post post){
        Post existingPost = postServ.getPostById(id);
        Internote existingInternote = internoteServ.GetInternoteById(internote_id);
        if (existingPost != null && existingInternote != null){
            existingPost.setTitle(post.getTitle());
            existingPost.setContent(post.getContent());
            existingPost.setDatepublished(post.getDatepublished());
            existingPost.setCategory(post.getCategory());
            existingPost.setInternote(existingInternote);
            Post savedPost = postServ.updatePost(existingPost);
            return ResponseEntity.ok().body(savedPost);

        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}/{internote_id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id,@PathVariable Long internote_id)
    {
        Post existPost = postServ.getPostById(id);
        Internote existingInternote = internoteServ.GetInternoteById(internote_id);
        if (existPost  != null && existingInternote != null){
            postServ.deletePost(id);
        }
        else {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body("Post deleted successfully");
    }

}
