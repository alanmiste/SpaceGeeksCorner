package am.alanmiste.spacegeekscorner.sgc.model;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class PrintfulResponseTest {

    PrintfulResponse printfulResponse = new PrintfulResponse(200,
            new PrintfulResult("gt-404733720", "pending"), new String[]{});
    PrintfulResponse printfulResponse2 = new PrintfulResponse(200,
            new PrintfulResult("gt-404733720", "pending"), new String[]{});
    PrintfulResponse printfulResponse3 = new PrintfulResponse(200,
            new PrintfulResult("gt-404733720", "done"), new String[]{});

    @Test
    void testToString() {
        assertThat(printfulResponse.toString()).hasToString("PrintfulResponse{code=200, result=PrintfulResult[task_key=gt-404733720, status=pending], extra=[]}");
    }

    @Test
    void testEquals() {
        Assertions.assertThat(printfulResponse.equals(printfulResponse2)).isTrue();
    }

    @Test
    void testSelfEquals() {
        PrintfulResponse newPrintfulResponse = printfulResponse;
        Assertions.assertThat(printfulResponse.equals(newPrintfulResponse)).isTrue();
    }

    @Test
    void testNotEquals() {
        Assertions.assertThat(printfulResponse.equals(printfulResponse3)).isFalse();
    }

    @Test
    void testHashCode() {
        Assertions.assertThat(printfulResponse.hashCode()).hasSameHashCodeAs(printfulResponse2.hashCode());
    }

    @Test
    void testDifferentHashCode() {
        Assertions.assertThat(printfulResponse.hashCode()).isNotSameAs(printfulResponse3.hashCode());
    }

}
