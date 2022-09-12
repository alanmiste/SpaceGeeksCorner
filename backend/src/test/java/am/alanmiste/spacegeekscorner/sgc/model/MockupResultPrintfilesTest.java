package am.alanmiste.spacegeekscorner.sgc.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MockupResultPrintfilesTest {

    int[] variant_ids = {4017, 4018, 4019};
    MockupResultPrintfiles mockupResultPrintfiles = new MockupResultPrintfiles(variant_ids, "front",
            "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg");
    MockupResultPrintfiles mockupResultPrintfiles2 = new MockupResultPrintfiles(variant_ids, "front",
            "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg");
    MockupResultPrintfiles mockupResultPrintfiles3 = new MockupResultPrintfiles(variant_ids, "back",
            "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg");

    @Test
    void testToString() {
        assertThat(mockupResultPrintfiles.toString()).hasToString("MockupResultPrintfiles{variant_ids=[4017, 4018, 4019], placement='front', url='https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg'}");
    }

    @Test
    void testEquals() {
        assertThat(mockupResultPrintfiles.equals(mockupResultPrintfiles2)).isTrue();
    }

    @Test
    void testNotEquals() {
        assertThat(mockupResultPrintfiles2.equals(mockupResultPrintfiles3)).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(mockupResultPrintfiles.hashCode()).hasSameHashCodeAs(mockupResultPrintfiles2.hashCode());
    }

    @Test
    void testDifferentHashCode() {
        assertThat(mockupResultPrintfiles.hashCode()).isNotSameAs(mockupResultPrintfiles3.hashCode());
    }

}
