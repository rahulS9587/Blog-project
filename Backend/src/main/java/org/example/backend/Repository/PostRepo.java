package org.example.backend.Repository;

import org.example.backend.Model.Internote;
import org.example.backend.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long>
{
    @Query(value = "SELECT p from Post p where  p.category=?1")
    public List<Post> findByCategory(String category);

    @Query(value = "SELECT p from Post p where p.internote.id = ?1")
    List<Post> findAllByInternoteId(Long internote_id);
}
