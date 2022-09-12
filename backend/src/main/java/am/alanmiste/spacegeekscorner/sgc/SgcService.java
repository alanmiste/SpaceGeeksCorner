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

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class SgcService {
    private final SgcRepository sgcRepository;

    public SgcService(SgcRepository sgcRepository) {
        this.sgcRepository = sgcRepository;
    }

    @Value("${nasaApiUrl}")
    private String nasaApiUrl;

    @Value("${printfulTaskKeyGeneratorUri}")
    private String printfulTaskKeyGeneratorUri;
    //    https://api.printful.com/mockup-generator/create-task/71
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
//        String mockupGeneratorUri = "https://api.printful.com/mockup-generator/task?task_key=" + taskKey;

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
}
