package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/sgc")
public class SgcController {

    private final SgcService service;

    public SgcController(SgcService service) {
        this.service = service;
    }

    @GetMapping("/nasaapi")
    List<NasaResponse> getDataFromNasaApi() {
        return service.getDataFromNasaApi();
    }
}
