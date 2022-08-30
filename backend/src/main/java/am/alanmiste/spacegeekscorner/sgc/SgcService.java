package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
}
