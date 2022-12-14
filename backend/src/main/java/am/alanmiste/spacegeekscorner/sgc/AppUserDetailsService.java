package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.AppUser;
import am.alanmiste.spacegeekscorner.sgc.model.NewUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

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

    public List<String> listUsers() throws UsernameNotFoundException {
        List<AppUser> users = appUserRepository.findAll();
        return users.stream().map(AppUser::username).toList();
    }

    public AppUser register(NewUser newUser) {
        return appUserRepository.save(new AppUser(
                newUser.username(),
                new BCryptPasswordEncoder()
                        .encode(newUser.password())));
    }

    public boolean deleteUser(String id) {
        if (appUserRepository.existsById(id)) {
            appUserRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
