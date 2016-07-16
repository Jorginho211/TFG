package MongoDBServices.ws;

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
import java.util.logging.Level;
import java.util.logging.Logger;
import org.bson.BSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import sun.security.util.Password;

@Path("/usuarios/")
public class Usuarios {

    private MongoClient mongoClient;
    private MongoDatabase db;
    private String collection;
    private String dbName;

    public Usuarios() {
        dbName = "kpis";
        collection = "usuarios";

        this.mongoClient = new MongoClient();
        this.db = mongoClient.getDatabase(dbName);
    }

    @GET
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public String Login(@HeaderParam("user") String user, @HeaderParam("password") String password) {
        Document document = new Document();
        document.append("user", user);
        document.append("password", password);
        ArrayList<Document> users = db.getCollection(collection).find(document).into(new ArrayList<Document>());

        if (!users.isEmpty()) {
            String token = generateToken();
            db.getCollection(collection).updateOne(document, new Document("$set", new Document("token", token)));
            return token;
        }

        throw new WebApplicationException(Response.Status.UNAUTHORIZED);
    }
    
    @GET
    @Path("/logout")
    @Produces(MediaType.APPLICATION_JSON)
    public Response Logout(@HeaderParam("X-Auth-Token") String token){
        db.getCollection(collection).updateOne(new Document("token", token), new Document("$set", new Document("token", null)));
        
        return Response.ok().build();
    }

    public String generateToken() {

        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        StringBuilder tokenGenerate = new StringBuilder();

        for (int i = 0; i < 40; i++) {
            int random = (int) (Math.random() * characters.length());
            tokenGenerate.append(characters.charAt(random));
        }

        return tokenGenerate.toString();
    }
}
