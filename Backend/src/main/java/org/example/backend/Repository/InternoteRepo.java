package org.example.backend.Repository;

import org.example.backend.Model.Internote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InternoteRepo extends JpaRepository<Internote, Long>
{
    @Query(value = "SELECT CASE  WHEN COUNT(1) > 0  THEN TRUE ELSE FALSE END  FROM Internote i WHERE i.emailadress = ?1")
    Boolean existsByEmailadress(String emailadress);

    @Query(value = "SELECT CASE  WHEN COUNT(1) > 0  THEN TRUE ELSE FALSE END  FROM Internote i WHERE i.userName = ?1")
    Boolean existsByUserName(String userName);

    @Query(value = "SELECT CASE  WHEN COUNT(1) > 0  THEN TRUE ELSE FALSE END  FROM Internote i WHERE i.password = ?1")
    Boolean existsByPassword(String password);

    @Query(value = "SELECT i from Internote  i where i.emailadress=?1 AND  i.password=?2")
    Internote findByEmailadressAndPassword(String emailadress, String password);





}
