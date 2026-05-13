package com.footballiq.backened.Service;

import com.footballiq.backened.DTO.LoginRequest;
import com.footballiq.backened.Entity.User;
import com.footballiq.backened.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user){
        return userRepository.save(user);
    }

    public String loginUser(LoginRequest request){
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if(user.isPresent()){
            if(user.get().getPassword().equals(request.getPassword()))
                return "Login Successful";
        }
        return "Invalid Credentials";
    }
}
