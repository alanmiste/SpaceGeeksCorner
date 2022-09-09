package am.alanmiste.spacegeekscorner.sgc.model;

public record MockupResponse(
        int code,
        MockupResult result,
        String[] extra
) {
}
