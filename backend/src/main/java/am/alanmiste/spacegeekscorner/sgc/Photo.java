package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.data.annotation.Id;

public record Photo(
        @Id String id,
        String url
) {
}
