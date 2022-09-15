package am.alanmiste.spacegeekscorner.sgc.model;

import java.util.Arrays;
import java.util.Objects;

public record PrintfulBody(
        int[] variant_ids,
        String format,
        PrintfulBodyFiles[] files
) {

    @Override
    public String toString() {
        return "PrintfulBody{" +
                "variant_ids=" + Arrays.toString(variant_ids) +
                ", format='" + format + '\'' +
                ", files=" + Arrays.toString(files) +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PrintfulBody that = (PrintfulBody) o;
        return Arrays.equals(variant_ids, that.variant_ids) && Objects.equals(format, that.format) && Arrays.equals(files, that.files);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(format);
        result = 31 * result + Arrays.hashCode(variant_ids);
        result = 31 * result + Arrays.hashCode(files);
        return result;
    }
}
