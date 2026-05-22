package com.footballiq.backened.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
@Table(
        name = "favorite_teams",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"user_id", "team_id"}
        )
)
public class FavoriteTeam {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @Column(
            name = "team_id",
            nullable = false
    )
    private Integer teamId;

    @Column(nullable = false)
    private String teamName;

    @Column(length = 1000)
    private String teamLogo;

    @Column(nullable = false)
    private Instant createdAt =
            Instant.now();
}
