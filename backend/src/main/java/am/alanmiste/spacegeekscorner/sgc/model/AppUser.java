package am.alanmiste.spacegeekscorner.sgc.model;

import org.springframework.data.annotation.Id;

public record AppUser(
        @Id String username,
        String passwordHash
) {
}
