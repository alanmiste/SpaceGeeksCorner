package am.alanmiste.spacegeekscorner.sgc;

public record PrintfulResponse(
        int code,
        PrintfulResult result,
        String[] extra
) {
}

