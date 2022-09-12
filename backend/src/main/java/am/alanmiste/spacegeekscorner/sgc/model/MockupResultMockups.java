package am.alanmiste.spacegeekscorner.sgc.model;

import java.util.Arrays;
import java.util.Objects;

public record MockupResultMockups(
        String placement,
        int[] variant_ids,
        String mockup_url,
        MockupResultMockupsExtra[] extra
) {
    @Override
    public String toString() {
        return "MockupResultMockups{" +
                "placement='" + placement + '\'' +
                ", variant_ids=" + Arrays.toString(variant_ids) +
                ", mockup_url='" + mockup_url + '\'' +
                ", extra=" + Arrays.toString(extra) +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MockupResultMockups that = (MockupResultMockups) o;
        return Objects.equals(placement, that.placement) && Arrays.equals(variant_ids, that.variant_ids) && Objects.equals(mockup_url, that.mockup_url) && Arrays.equals(extra, that.extra);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(placement, mockup_url);
        result = 31 * result + Arrays.hashCode(variant_ids);
        result = 31 * result + Arrays.hashCode(extra);
        return result;
    }
}
