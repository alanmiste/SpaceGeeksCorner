package am.alanmiste.spacegeekscorner.sgc.model;

public record MockupResult(
        String task_key,
        String status,
        MockupResultMockups[] mockups,
        MockupResultPrintfiles[] printfiles
) {
}
