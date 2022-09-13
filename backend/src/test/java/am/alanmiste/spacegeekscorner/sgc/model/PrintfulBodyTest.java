package am.alanmiste.spacegeekscorner.sgc.model;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class PrintfulBodyTest {
    int[] variant_ids = {4017, 4018, 4019};
    PrintfulBodyFiles[] printfulBodyFiles =
            {new PrintfulBodyFiles("front", "https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg",
                    new PrintfulBodyFilePosition(1800, 2400, 1800, 1800, 300, 0))};

    PrintfulBody printfulBody = new PrintfulBody(variant_ids, "jpg", printfulBodyFiles);
    PrintfulBody printfulBody2 = new PrintfulBody(variant_ids, "jpg", printfulBodyFiles);
    PrintfulBody printfulBody3 = new PrintfulBody(variant_ids, "png", printfulBodyFiles);

    @Test
    void testToString() {
        assertThat(printfulBody.toString()).hasToString("PrintfulBody{variant_ids=[4017, 4018, 4019], format='jpg', files=[PrintfulBodyFiles[placement=front, image_url=https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg, position=PrintfulBodyFilePosition[area_width=1800, area_height=2400, width=1800, height=1800, top=300, left=0]]]}");
    }

    @Test
    void testEquals() {
        Assertions.assertThat(printfulBody.equals(printfulBody2)).isTrue();
    }

    @Test
    void testSelfEquals() {
        PrintfulBody newPrintfulBody = printfulBody;
        Assertions.assertThat(printfulBody.equals(newPrintfulBody)).isTrue();
    }

    @Test
    void testNotEquals() {
        Assertions.assertThat(printfulBody.equals(printfulBody3)).isFalse();
    }

    @Test
    void testHashCode() {
        Assertions.assertThat(printfulBody.hashCode()).hasSameHashCodeAs(printfulBody2.hashCode());
    }

    @Test
    void testDifferentHashCode() {
        Assertions.assertThat(printfulBody.hashCode()).isNotSameAs(printfulBody3.hashCode());
    }
}
