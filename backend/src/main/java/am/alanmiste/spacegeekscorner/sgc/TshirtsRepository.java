package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.MockupToSave;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TshirtsRepository extends MongoRepository<MockupToSave, String> {
}
