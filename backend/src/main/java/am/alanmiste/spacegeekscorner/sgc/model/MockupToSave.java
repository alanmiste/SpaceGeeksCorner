package am.alanmiste.spacegeekscorner.sgc.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record MockupToSave(
        @Id String username,
        List<TshirtToSave> tshirtList
) {
}
