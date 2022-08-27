package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.data.annotation.Id;

public record UserItem(
        @Id String id,
        String username,
        String explanation,
        String title,
        String url
) {
}
