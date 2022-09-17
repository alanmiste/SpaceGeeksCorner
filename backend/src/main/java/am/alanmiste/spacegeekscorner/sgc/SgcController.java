package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.*;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/sgc")
public class SgcController {

    private final SgcService sgcService;

    public SgcController(SgcService sgcService) {
        this.sgcService = sgcService;
    }

    @GetMapping("/nasaapi")
    List<NasaResponse> getDataFromNasaApi() {
        return sgcService.getDataFromNasaApi();
    }

    @PostMapping
    public ResponseEntity<UserItem> addItem(
            @RequestBody UserItem userItem
    ) {
        UserItem savedItem = sgcService.addItem(userItem);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedItem);
    }

    @GetMapping
    public List<UserItem> listUserItems() {
        return sgcService.listUserItems();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable String id) {
        boolean deleteSuccess = sgcService.deleteItem(id);
        return new ResponseEntity<>(deleteSuccess ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }

    @PostMapping("/make-mockups")
    public MockupResponse makeMockups(
            @RequestBody ImageObject photoUrl
    ) throws InterruptedException {
        return sgcService.makeMockups(photoUrl);
    }

    @PostMapping("/save-mockup")
    public ResponseEntity<MockupToSave> saveMockup(
            @RequestBody TshirtWithUsername tshirtWithUsername
    ) throws ChangeSetPersister.NotFoundException {
        MockupToSave savedTshirt = sgcService.saveMockup(tshirtWithUsername);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedTshirt);
    }
}
