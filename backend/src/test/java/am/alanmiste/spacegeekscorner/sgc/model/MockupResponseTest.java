package am.alanmiste.spacegeekscorner.sgc.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MockupResponseTest {

    String[] extra = {"test1", "test2"};
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
    MockupResponse mockupResponse = new MockupResponse(200, mockupResult, extra);
    MockupResponse mockupResponse2 = new MockupResponse(200, mockupResult, extra);
    MockupResponse mockupResponse3 = new MockupResponse(201, mockupResult, extra);

    @Test
    void testToString() {
        assertThat(mockupResponse.toString()).hasToString("MockupResponse{code=200, result=MockupResult{task_key='gt-404733720', status='completed', mockups=[MockupResultMockups{placement='front', variant_ids=[4017, 4018, 4019], mockup_url='https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg', extra=[MockupResultMockupsExtra[title=Front, option=Front, option_group=Flat, url=https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg]]}], printfiles=[MockupResultPrintfiles{variant_ids=[4017, 4018, 4019], placement='front', url='https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca7d9467be42df7cef5ef1b77c2b0e02/unisex-staple-t-shirt-black-front-631a233580e16.jpg'}]}, extra=[test1, test2]}");
    }

    @Test
    void testEquals() {
        assertThat(mockupResponse.equals(mockupResponse2)).isTrue();
    }

    @Test
    void testNotEquals() {
        assertThat(mockupResponse2.equals(mockupResponse3)).isFalse();
    }

    @Test
    void testHashCode() {
        assertThat(mockupResponse.hashCode()).hasSameHashCodeAs(mockupResponse2.hashCode());
    }
}
