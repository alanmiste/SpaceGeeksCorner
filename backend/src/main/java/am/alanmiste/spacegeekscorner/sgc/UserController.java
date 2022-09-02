package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

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
    Object listUsername() {
        return appUserDetailsService.listUsers();
    }

    @PostMapping
    public String register(@RequestBody NewUser newUser) {
        appUserDetailsService.register(newUser);
        return "Done!";
    }
}
