package am.alanmiste.spacegeekscorner.sgc.model;

public record MockupResultMockups(
        String placement,
        int[] variant_ids,
        String mockup_url,
        MockupResultMockupsExtra[] extra
) {
}
