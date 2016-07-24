package HadoopServices.ws;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("/sendjob")
public class Hadoop {

    public Hadoop() {
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response sendJob(String code) throws IOException {
        String path = "/home/xurxo/Documentos/TFG/probas/";
        String command = path + "eval-tool " + path + "code.scala --local";
        File codeFile = new File(path + "code.scala");
        
        FileWriter writer = new FileWriter(codeFile);
        writer.write(code);
        writer.close();
        
        Process p= Runtime.getRuntime().exec(command);

        return Response.ok().build();
    }
}
