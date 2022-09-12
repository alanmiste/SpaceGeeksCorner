package am.alanmiste.spacegeekscorner.sgc.model;

import java.util.Arrays;
import java.util.Objects;

public record PrintfulResponse(
        int code,
        PrintfulResult result,
        String[] extra
) {
    @Override
    public String toString() {
        return "PrintfulResponse{" +
                "code=" + code +
                ", result=" + result +
                ", extra=" + Arrays.toString(extra) +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PrintfulResponse that = (PrintfulResponse) o;
        return code == that.code && Objects.equals(result, that.result) && Arrays.equals(extra, that.extra);
    }

    @Override
    public int hashCode() {
        int result1 = Objects.hash(code, result);
        result1 = 31 * result1 + Arrays.hashCode(extra);
        return result1;
    }
}

