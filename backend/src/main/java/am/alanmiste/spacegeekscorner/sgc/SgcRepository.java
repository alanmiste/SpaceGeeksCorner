package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.UserItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SgcRepository extends MongoRepository<UserItem, String> {
}
