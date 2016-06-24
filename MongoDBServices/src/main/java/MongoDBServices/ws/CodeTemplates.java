package MongoDBServices.ws;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;
import org.bson.Document;
import org.bson.types.ObjectId;

@Path("/codetemplates")
public class CodeTemplates {
    
    private MongoClient mongoClient;
    private MongoDatabase db;
    private String collection;
    private String dbName;

    public CodeTemplates() {
        dbName = "kpis";
        collection = "codeTemplates";
        
        this.mongoClient = new MongoClient();
        this.db = mongoClient.getDatabase(dbName);
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Document> codeTemplates() {
        ArrayList<Document> codeTemplates = db.getCollection(collection).find().into(new ArrayList<Document>());
        
        for(Document document : codeTemplates){
            document.remove("_id");
        }
        
        return codeTemplates;
    }
}
