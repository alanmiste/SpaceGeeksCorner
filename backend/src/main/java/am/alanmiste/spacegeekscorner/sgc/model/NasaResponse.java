package am.alanmiste.spacegeekscorner.sgc.model;

public record NasaResponse(
        String copyright,
        String date,
        String explanation,
        String hdurl,
        String media_type,
        String service_version,
        String title,
        String url
) {
}
