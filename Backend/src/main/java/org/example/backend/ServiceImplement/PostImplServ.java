package org.example.backend.ServiceImplement;

import org.example.backend.Model.Internote;
import org.example.backend.Model.Post;
import org.example.backend.Repository.PostRepo;
import org.example.backend.Service.PostServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostImplServ implements PostServ
{
    @Autowired
    private PostRepo postRepo;

    @Override
    public Post getPostById(Long id) {
        return  postRepo.findById(id).get() ;
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    @Override
    public List<Post> getPostsByCategory(String Category) {
        return postRepo.findByCategory(Category);
    }

    @Override
    public Post addPost(Post post) {
        return postRepo.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        return postRepo.save(post);
    }

    @Override
    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }

    @Override
    public List<Post> getAllPostsByIdInternote(Long internote_id) {
        return postRepo.findAllByInternoteId(internote_id);
    }
}
