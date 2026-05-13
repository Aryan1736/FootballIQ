package com.footballiq.backened.Service;

import com.footballiq.backened.Entity.User;
import com.footballiq.backened.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user){
        return userRepository.save(user);
    }
}
