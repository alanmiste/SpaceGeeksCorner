package am.alanmiste.spacegeekscorner.sgc.model;

import java.util.Arrays;
import java.util.Objects;

public record MockupResult(
        String task_key,
        String status,
        MockupResultMockups[] mockups,
        MockupResultPrintfiles[] printfiles
) {
    @Override
    public String toString() {
        return "MockupResult{" +
                "task_key='" + task_key + '\'' +
                ", status='" + status + '\'' +
                ", mockups=" + Arrays.toString(mockups) +
                ", printfiles=" + Arrays.toString(printfiles) +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MockupResult that = (MockupResult) o;
        return Objects.equals(task_key, that.task_key) && Objects.equals(status, that.status) && Arrays.equals(mockups, that.mockups) && Arrays.equals(printfiles, that.printfiles);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(task_key, status);
        result = 31 * result + Arrays.hashCode(mockups);
        result = 31 * result + Arrays.hashCode(printfiles);
        return result;
    }
}
