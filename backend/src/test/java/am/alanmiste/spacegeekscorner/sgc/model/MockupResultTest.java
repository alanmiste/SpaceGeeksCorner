package am.alanmiste.spacegeekscorner.sgc.model;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MockupResultTest {
    int[] variant_ids = {4017, 4018, 4019};
    MockupResultMockupsExtra[] mockupResultMockupsExtra =
            {new MockupResultMockupsExtra("Front", "Front", "Flat",
                    "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg")};

    MockupResultMockups[] mockupResultMockups =
            {new MockupResultMockups("front", variant_ids,
                    "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg",
                    mockupResultMockupsExtra)};

    MockupResultPrintfiles[] mockupResultPrintfiles = {new MockupResultPrintfiles(variant_ids, "front",
            "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg"
    )};
    MockupResult mockupResult = new MockupResult("gt-404733720", "completed", mockupResultMockups, mockupResultPrintfiles);
    MockupResult mockupResult2 = new MockupResult("gt-404733720", "completed", mockupResultMockups, mockupResultPrintfiles);
    MockupResult mockupResult3 = new MockupResult("hu-515844831", "completed", mockupResultMockups, mockupResultPrintfiles);

    @Test
    void testToString() {
        assertThat(mockupResult.toString()).hasToString("MockupResult{task_key='gt-404733720', status='completed', mockups=[MockupResultMockups{placement='front', variant_ids=[4017, 4018, 4019], mockup_url='https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg', extra=[MockupResultMockupsExtra[title=Front, option=Front, option_group=Flat, url=https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg]]}], printfiles=[MockupResultPrintfiles{variant_ids=[4017, 4018, 4019], placement='front', url='https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg'}]}");
    }

    @Test
    void testEquals() {
        assertThat(mockupResult.equals(mockupResult2)).isTrue();
    }

    @Test
    void testSelfEquals() {
        MockupResult newMockupResult = mockupResult;
        Assertions.assertThat(mockupResult.equals(newMockupResult)).isTrue();
    }

    @Test
    void testNotEquals() {
        assertThat(mockupResult.equals(mockupResult3)).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(mockupResult.hashCode()).hasSameHashCodeAs(mockupResult2.hashCode());
    }

    @Test
    void testDifferentHashCode() {
        assertThat(mockupResult.hashCode()).isNotSameAs(mockupResult3.hashCode());
    }
}
