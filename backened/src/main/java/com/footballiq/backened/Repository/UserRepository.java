package com.footballiq.backened.Repository;

import com.footballiq.backened.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
}
