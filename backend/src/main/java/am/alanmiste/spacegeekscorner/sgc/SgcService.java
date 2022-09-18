package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class SgcService {
    private final SgcRepository sgcRepository;
    private final TshirtsRepository tshirtsRepository;

    public SgcService(SgcRepository sgcRepository, TshirtsRepository tshirtsRepository) {
        this.sgcRepository = sgcRepository;
        this.tshirtsRepository = tshirtsRepository;
    }

    @Value("${nasaApiUrl}")
    private String nasaApiUrl;

    @Value("${printfulTaskKeyGeneratorUri}")
    private String printfulTaskKeyGeneratorUri;
    @Value("${mockupGeneratorUri}")
    private String mockupGeneratorUri;
    private final WebClient webClient = WebClient.create();

    public List<NasaResponse> getDataFromNasaApi() {
        ResponseEntity<List<NasaResponse>> getDataFromApiResult = webClient.get().uri(nasaApiUrl)
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<NasaResponse>>() {
                })
                .block();
        if (getDataFromApiResult == null)
            return Collections.emptyList();
        return getDataFromApiResult
                .getBody();
    }

    public UserItem addItem(UserItem userItem) {
        return sgcRepository.save(new UserItem(
                UUID.randomUUID().toString(),
                userItem.username(),
                userItem.explanation(),
                userItem.title(),
                userItem.url()));
    }

    public List<UserItem> listUserItems() {
        return sgcRepository.findAll();
    }

    public boolean deleteItem(String id) {
        if (sgcRepository.existsById(id)) {
            sgcRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Value("${printfulAccessToken}")
    private String printfulAccessToken;

    public MockupResponse makeMockups(ImageObject photoUrl) throws InterruptedException {
        int[] variantIds = new int[]{4012, 4013, 4014, 4017, 4018, 4019};
        PrintfulBodyFilePosition position = new PrintfulBodyFilePosition(1800, 2400, 1800, 1800, 300, 0);
        PrintfulBodyFiles[] files = new PrintfulBodyFiles[]{
                new PrintfulBodyFiles("front", photoUrl.image_url(), position),
                new PrintfulBodyFiles("back", photoUrl.image_url(), position)
        };

        PrintfulBody printfulBody = new PrintfulBody(variantIds, "jpg", files);

        ResponseEntity<PrintfulResponse> getOAuth = webClient.post()
                .uri(printfulTaskKeyGeneratorUri)
                .header("Authorization", "Bearer " + printfulAccessToken)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(BodyInserters.fromValue(printfulBody))
                .retrieve()
                .toEntity(PrintfulResponse.class)
                .block();
        TimeUnit.SECONDS.sleep(10);

        if (getOAuth == null)
            return null;
        return getTshirts(Objects.requireNonNull(getOAuth.getBody()).result().task_key());
    }

    public MockupResponse getTshirts(String taskKey) {

        ResponseEntity<MockupResponse> mockupGenerator = webClient.get()
                .uri(mockupGeneratorUri + taskKey)
                .header("Authorization", "Bearer " + printfulAccessToken)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .toEntity(new ParameterizedTypeReference<MockupResponse>() {
                })
                .block();

        if (mockupGenerator == null)
            return null;
        return mockupGenerator.getBody();
    }

    public MockupToSave saveMockup(TshirtWithUsername tshirtWithUsername) {
        TshirtToSave newTshirtToSave = new TshirtToSave(
                tshirtWithUsername.tshirtToSave().color(),
                tshirtWithUsername.tshirtToSave().size(),
                tshirtWithUsername.tshirtToSave().mockupUrl(),
                tshirtWithUsername.tshirtToSave().placement()
        );

        List<TshirtToSave> toSaveList = List.of(
                newTshirtToSave
        );

        MockupToSave mockupToSave = new MockupToSave(
                tshirtWithUsername.username(), toSaveList
        );


        if (tshirtsRepository.existsById(tshirtWithUsername.username())) {
            Optional<MockupToSave> existedUser = tshirtsRepository.findById(tshirtWithUsername.username());
            if (existedUser.isPresent()) {
                MockupToSave userMockup = existedUser.get();
                userMockup.tshirtList().add(userMockup.tshirtList().size(), tshirtWithUsername.tshirtToSave());
                return tshirtsRepository.save(userMockup);
            } else return tshirtsRepository.save(existedUser.orElse(mockupToSave));
        } else {
            return tshirtsRepository.save(mockupToSave);

        }
    }

    public Optional<MockupToSave> listMockup(String username) {
        return tshirtsRepository.findById(username);
    }

    public boolean deleteOneSavedMockup(String username, int index) {
        if (tshirtsRepository.existsById(username)) {
            Optional<MockupToSave> existedUser = tshirtsRepository.findById(username);
            if (existedUser.isPresent()) {
                existedUser.get().tshirtList().remove(index);
                MockupToSave use1 = new MockupToSave(existedUser.get().username(), existedUser.get().tshirtList());
                tshirtsRepository.save(use1);
                return true;
            }
            return true;
        }
        return false;
    }
}
