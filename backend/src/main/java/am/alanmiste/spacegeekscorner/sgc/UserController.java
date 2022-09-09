package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.AppUser;
import am.alanmiste.spacegeekscorner.sgc.model.NewUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    private final AppUserDetailsService appUserDetailsService;

    public UserController(AppUserDetailsService appUserDetailsService) {
        this.appUserDetailsService = appUserDetailsService;
    }

    @GetMapping("login")
    String login() {
        return getUsername();
    }

    @GetMapping("me")
    String getUsername() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("logout")
    void logout(HttpSession session) {
        session.invalidate();
    }

    @GetMapping("listusers")
    List<String> listUsername() {
        return appUserDetailsService.listUsers();
    }

    @PostMapping
    public ResponseEntity<String> register(@RequestBody NewUser newUser) {
        AppUser savedUser = appUserDetailsService.register(newUser);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser.username());
    }
}
