package com.footballiq.backened.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
public class RedisCacheService {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final boolean enabled;
    private final Duration defaultTtl;

    public RedisCacheService(
            StringRedisTemplate redisTemplate,
            @Value("${app.redis-cache.enabled:false}") boolean enabled,
            @Value("${app.redis-cache.ttl-minutes:30}") long ttlMinutes
    ) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = new ObjectMapper();
        this.enabled = enabled;
        this.defaultTtl = Duration.ofMinutes(ttlMinutes);
    }

    public <T> Optional<T> get(String key, TypeReference<T> typeReference) {
        if (!enabled) {
            return Optional.empty();
        }

        try {
            String cachedValue = redisTemplate.opsForValue().get(key);

            if (cachedValue == null || cachedValue.isBlank()) {
                return Optional.empty();
            }

            return Optional.of(objectMapper.readValue(cachedValue, typeReference));
        } catch (Exception e) {
            System.out.println("Redis cache read failed for key " + key + ": " + e.getMessage());
            return Optional.empty();
        }
    }

    public <T> Optional<T> get(String key, Class<T> type) {
        if (!enabled) {
            return Optional.empty();
        }

        try {
            String cachedValue = redisTemplate.opsForValue().get(key);

            if (cachedValue == null || cachedValue.isBlank()) {
                return Optional.empty();
            }

            return Optional.of(objectMapper.readValue(cachedValue, type));
        } catch (Exception e) {
            System.out.println("Redis cache read failed for key " + key + ": " + e.getMessage());
            return Optional.empty();
        }
    }

    public void set(String key, Object value) {
        set(key, value, defaultTtl);
    }

    public void set(String key, Object value, Duration ttl) {
        if (!enabled || value == null) {
            return;
        }

        try {
            String json = objectMapper.writeValueAsString(value);
            redisTemplate.opsForValue().set(key, json, ttl);
        } catch (Exception e) {
            System.out.println("Redis cache write failed for key " + key + ": " + e.getMessage());
        }
    }
}
