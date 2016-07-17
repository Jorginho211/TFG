package MongoDBServices.ws;

import com.google.gson.Gson;
import com.mongodb.Block;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.bson.BSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.codehaus.jettison.json.JSONArray;
import sun.security.util.Password;

@Path("/dashboards/")
public class Dashboard {

    private MongoClient mongoClient;
    private MongoDatabase db;
    private String cUsuarios;
    private String cDashboards;
    private String dbName;

    public Dashboard() {
        dbName = "kpis";
        cUsuarios = "usuarios";
        cDashboards = "dashboards";
        

        this.mongoClient = new MongoClient();
        this.db = mongoClient.getDatabase(dbName);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Document> Dashboard(@HeaderParam("X-Auth-Token") String token) {
        ArrayList<Document> users = db.getCollection(cUsuarios).find(new Document("token", token)).into(new ArrayList<Document>());
        if(users.isEmpty()){
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        
        ObjectId idUser = users.get(0).getObjectId("_id");
        ArrayList<Document> dashboards = db.getCollection(cDashboards).find(new Document("idUser", idUser)).into(new ArrayList<Document>());
        
        return (ArrayList<Document>) dashboards.get(0).get("dashboard");        
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response Dashboard(@HeaderParam("X-Auth-Token") String token, String dashboardJson){
        ArrayList<Document> users = db.getCollection(cUsuarios).find(new Document("token", token)).into(new ArrayList<Document>());
        if(users.isEmpty()){
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        
        
        ObjectId idUser = users.get(0).getObjectId("_id");
        Document dashboard = Document.parse(dashboardJson);
        
        db.getCollection(cDashboards).updateOne(new Document("idUser", idUser), new Document("$set", dashboard));        
        
        return Response.ok().build();
    }
}
