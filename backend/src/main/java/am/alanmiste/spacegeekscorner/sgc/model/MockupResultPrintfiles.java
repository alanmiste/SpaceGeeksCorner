package am.alanmiste.spacegeekscorner.sgc.model;

import java.util.Arrays;
import java.util.Objects;

public record MockupResultPrintfiles(
        int[] variant_ids,
        String placement,
        String url
) {

    @Override
    public String toString() {
        return "MockupResultPrintfiles{" +
                "variant_ids=" + Arrays.toString(variant_ids) +
                ", placement='" + placement + '\'' +
                ", url='" + url + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MockupResultPrintfiles that = (MockupResultPrintfiles) o;
        return Arrays.equals(variant_ids, that.variant_ids) && Objects.equals(placement, that.placement) && Objects.equals(url, that.url);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(placement, url);
        result = 31 * result + Arrays.hashCode(variant_ids);
        return result;
    }
}
