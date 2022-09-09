package am.alanmiste.spacegeekscorner.sgc.model;

public record PrintfulBody(
        int[] variant_ids,
        String format,
        PrintfulBodyFiles[] files
) {
}
