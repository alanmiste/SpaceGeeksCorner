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
import java.util.UUID;

@Service
public class SgcService {
    private final SgcRepository sgcRepository;

    public SgcService(SgcRepository sgcRepository) {
        this.sgcRepository = sgcRepository;
    }

    @Value("${nasaApiUrl}")
    private String nasaApiUrl;
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

    public PrintfulResponse makeMockups(ImageObject photoUrl) {
        int[] variantIds = new int[]{4012, 4013, 4014, 4017, 4018, 4019};
        PrintfulBodyFilePosition position = new PrintfulBodyFilePosition(1800, 2400, 1800, 1800, 300, 0);
        PrintfulBodyFiles[] files = new PrintfulBodyFiles[]{
                new PrintfulBodyFiles("front", photoUrl.image_url(), position),
                new PrintfulBodyFiles("back", photoUrl.image_url(), position)
        };

        PrintfulBody printfulBody = new PrintfulBody(variantIds, "jpg", files);

        String printfulMockupGeneratorUrl = "https://api.printful.com/mockup-generator/create-task/71";
        ResponseEntity<PrintfulResponse> getOAuth = webClient.post()
                .uri(printfulMockupGeneratorUrl)
                .header("Authorization", "Bearer " + printfulAccessToken)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(BodyInserters.fromValue(printfulBody))
                .retrieve()
                .toEntity(PrintfulResponse.class)
                .block();
        if (getOAuth == null)
            return null;
        return getOAuth
                .getBody();
    }


}
