package am.alanmiste.spacegeekscorner.sgc.model;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class PrintfulBodyTest {

    PrintfulBodyFiles printfulBodyFiles =
            new PrintfulBodyFiles("front", "https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg",
                    new PrintfulBodyFilePosition(1800, 2400, 1800, 1800, 300, 0));
    PrintfulBodyFiles printfulBodyFiles2 =
            new PrintfulBodyFiles("front", "https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg",
                    new PrintfulBodyFilePosition(1800, 2400, 1800, 1800, 300, 0));
    PrintfulBodyFiles printfulBodyFiles3 =
            new PrintfulBodyFiles("back", "https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg",
                    new PrintfulBodyFilePosition(1800, 2400, 1800, 1800, 300, 0));

    @Test
    void testToString() {
        assertThat(printfulBodyFiles.toString()).hasToString("PrintfulBodyFiles[placement=front, image_url=https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg, position=PrintfulBodyFilePosition[area_width=1800, area_height=2400, width=1800, height=1800, top=300, left=0]]");
    }

    @Test
    void testEquals() {
        Assertions.assertThat(printfulBodyFiles.equals(printfulBodyFiles2)).isTrue();
    }

    @Test
    void testNotEquals() {
        Assertions.assertThat(printfulBodyFiles.equals(printfulBodyFiles3)).isFalse();
    }

    @Test
    void testHashCode() {
        Assertions.assertThat(printfulBodyFiles.hashCode()).hasSameHashCodeAs(printfulBodyFiles2.hashCode());
    }

    @Test
    void testDifferentHashCode() {
        Assertions.assertThat(printfulBodyFiles.hashCode()).isNotSameAs(printfulBodyFiles3.hashCode());
    }
}
