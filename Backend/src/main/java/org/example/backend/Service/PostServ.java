package org.example.backend.Service;

import org.example.backend.Model.Internote;
import org.example.backend.Model.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostServ
{
    Post getPostById(Long id);
    List<Post> getAllPosts();
    List<Post> getPostsByCategory(String Category);
    Post addPost(Post post);
    Post updatePost(Post post);
    void deletePost(Long id);
    List<Post> getAllPostsByIdInternote(Long internote_id);
}
