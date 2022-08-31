package am.alanmiste.spacegeekscorner.sgc;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class SgcServiceTest {
    @Test
    void addItem() {
        UserItem userItem = new UserItem("123", "user1",
                "The planet Mercury resembles a moon.", "Southwest Mercury",
                "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif");

        SgcRepository sgcRepository = mock(SgcRepository.class);
        when(sgcRepository.save(any(UserItem.class))).thenReturn(userItem);

        SgcService sgcService = new SgcService(sgcRepository);
        UserItem actual = sgcService.addItem(new UserItem("123", "user1",
                "The planet Mercury resembles a moon.", "Southwest Mercury",
                "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"));

        assertThat(actual).isEqualTo(userItem);
    }


}
