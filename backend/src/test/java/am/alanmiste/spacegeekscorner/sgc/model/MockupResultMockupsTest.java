package am.alanmiste.spacegeekscorner.sgc.model;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class MockupResultMockupsTest {

    int[] variant_ids = {4017, 4018, 4019};
    MockupResultMockupsExtra[] mockupResultMockupsExtra =
            {new MockupResultMockupsExtra("Front", "Front", "Flat",
                    "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg")};

    MockupResultMockups mockupResultMockups =
            new MockupResultMockups("front", variant_ids,
                    "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg",
                    mockupResultMockupsExtra);
    MockupResultMockups mockupResultMockups2 =
            new MockupResultMockups("front", variant_ids,
                    "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg",
                    mockupResultMockupsExtra);
    MockupResultMockups mockupResultMockups3 =
            new MockupResultMockups("back", variant_ids,
                    "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg",
                    mockupResultMockupsExtra);

    @Test
    void testToString() {
        assertThat(mockupResultMockups.toString()).hasToString("MockupResultMockups{placement='front', variant_ids=[4017, 4018, 4019], mockup_url='https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg', extra=[MockupResultMockupsExtra[title=Front, option=Front, option_group=Flat, url=https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg]]}");
    }

    @Test
    void testEquals() {
        Assertions.assertThat(mockupResultMockups.equals(mockupResultMockups2)).isTrue();
    }

    @Test
    void testNotEquals() {
        Assertions.assertThat(mockupResultMockups.equals(mockupResultMockups3)).isFalse();
    }

    @Test
    void testHashCode() {
        Assertions.assertThat(mockupResultMockups.hashCode()).hasSameHashCodeAs(mockupResultMockups2.hashCode());
    }

    @Test
    void testDifferentHashCode() {
        Assertions.assertThat(mockupResultMockups.hashCode()).isNotSameAs(mockupResultMockups3.hashCode());
    }
}
