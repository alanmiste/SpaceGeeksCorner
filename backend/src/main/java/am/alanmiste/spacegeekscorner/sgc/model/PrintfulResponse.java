package am.alanmiste.spacegeekscorner.sgc.model;

public record PrintfulResponse(
        int code,
        PrintfulResult result,
        String[] extra
) {
}

