package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

@Service
public class AppUserDetailsService implements UserDetailsService {
    private final AppUserRepository appUserRepository;

    public AppUserDetailsService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findById(username)
                .orElse(null);
        if (appUser == null)
            return null;
        return new User(appUser.username(), appUser.passwordHash(), Collections.emptyList());
    }

    public Stream<String> listUsers() throws UsernameNotFoundException {
        List<AppUser> users = appUserRepository.findAll();
        return users.stream().map(AppUser::username);
    }

    public void register(NewUser newUser) {
        appUserRepository.save(new AppUser(newUser.username(), new BCryptPasswordEncoder().encode(newUser.password())));
    }
}
