package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.data.annotation.Id;

public record NewUser(
        @Id String username,
        String password
) {
}
