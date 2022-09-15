package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.AppUser;
import am.alanmiste.spacegeekscorner.sgc.model.NewUser;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AppUserDetailsServiceTest {

    AppUserRepository appUserRepository = mock(AppUserRepository.class);
    AppUserDetailsService appUserDetailsService = new AppUserDetailsService(appUserRepository);

    @Test
    void listUsers() {
        List<AppUser> usersList = List.of(
                new AppUser("testUser1",
                        "$2a$10$2LTyCwfHF2c4oXlrclEvu.O7BqlM77kYj62oLf/uT3iK5Nho45Zuw"),
                new AppUser("testUser2",
                        "$2a$10$2LTyCwfHF2c4oZhpclEvu.O7BqlM5kLw9Hpo0w/jF3kLoa4Gh5v4o")
        );

        when(appUserRepository.findAll()).thenReturn(usersList);

        List<String> actual = appUserDetailsService.listUsers();
        List<String> expected = Stream.of("testUser1", "testUser2").toList();

        assertThat(actual).hasSameElementsAs(expected);
    }

    @Test
    void register() {
        AppUser appUser = new AppUser("testUser", "$2a$10$ixrnlZtPwYEv4Ye/FZJdaueeFzvvCCXL8rgFLcVPirIhUHxRLWVDC");

        when(appUserRepository.save(any(AppUser.class))).thenReturn(appUser);

        AppUser actual = appUserDetailsService.register(new NewUser("testUser", "password"));

        assertThat(actual).isEqualTo(appUser);
    }
}