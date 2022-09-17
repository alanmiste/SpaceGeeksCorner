package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.UserItem;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SgcServiceTest {

    SgcRepository sgcRepository = mock(SgcRepository.class);
    TshirtsRepository tshirtsRepository = mock(TshirtsRepository.class);
    SgcService sgcService = new SgcService(sgcRepository, tshirtsRepository);

    @Test
    void addItem() {
        UserItem userItem = new UserItem("123", "user1",
                "The planet Mercury resembles a moon.", "Southwest Mercury",
                "https://apod.nasa.gov/apod/image/0002/merc4_m10.jpg");

        when(sgcRepository.save(any(UserItem.class))).thenReturn(userItem);

        UserItem actual = sgcService.addItem(new UserItem("123", "user1",
                "The planet Mercury resembles a moon.", "Southwest Mercury",
                "https://apod.nasa.gov/apod/image/0002/merc4_m10.jpg"));

        assertThat(actual).isEqualTo(userItem);
    }

    @Test
    void listUserItems() {
        List<UserItem> userItems = List.of(
                new UserItem("111", "user1", "test explanation text 1",
                        "test title 1", "https://apod.nasa.gov/apod/image/testimage1.jpeg"),
                new UserItem("112", "user1", "test explanation text 2",
                        "test title 2", "https://apod.nasa.gov/apod/image/testimage2.jpeg"),

                new UserItem("113", "user2", "test explanation text 3",
                        "test title 3", "https://apod.nasa.gov/apod/image/testimage3.jpeg"),
                new UserItem("114", "user2", "test explanation text 4",
                        "test title 4", "https://apod.nasa.gov/apod/image/testimage4.jpeg")
        );

        when(sgcRepository.findAll()).thenReturn(userItems);

        List<UserItem> actual = sgcService.listUserItems();
        List<UserItem> expected = List.of(
                new UserItem("111", "user1", "test explanation text 1",
                        "test title 1", "https://apod.nasa.gov/apod/image/testimage1.jpeg"),
                new UserItem("112", "user1", "test explanation text 2",
                        "test title 2", "https://apod.nasa.gov/apod/image/testimage2.jpeg"),

                new UserItem("113", "user2", "test explanation text 3",
                        "test title 3", "https://apod.nasa.gov/apod/image/testimage3.jpeg"),
                new UserItem("114", "user2", "test explanation text 4",
                        "test title 4", "https://apod.nasa.gov/apod/image/testimage4.jpeg")
        );

        assertThat(actual).hasSameElementsAs(expected);
    }

    @Test
    void deleteItem() {
        UserItem userItem = new UserItem("123", "user1",
                "The planet Mercury resembles a moon.", "Southwest Mercury",
                "https://apod.nasa.gov/apod/image/0002/merc4_m10.jpg");

        when(sgcRepository.existsById(userItem.id())).thenReturn(true);
        doNothing().when(sgcRepository).deleteById(userItem.id());

        sgcService.deleteItem(userItem.id());
        verify(sgcRepository).deleteById(userItem.id());
    }

    @Test
    void deleteItemDoseNotExist() {
        UserItem userItem = new UserItem("123", "user1",
                "The planet Mercury resembles a moon.", "Southwest Mercury",
                "https://apod.nasa.gov/apod/image/0002/merc4_m10.jpg");

        when(sgcRepository.existsById(userItem.id())).thenReturn(false);
        doNothing().when(sgcRepository).deleteById(userItem.id());

        sgcService.deleteItem(userItem.id());
        verify(sgcRepository, times(0)).deleteById(userItem.id());
    }
}
