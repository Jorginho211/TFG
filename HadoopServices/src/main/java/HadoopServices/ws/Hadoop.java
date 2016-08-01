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
        System.out.println(code);
        //Quitar partes innecesarias do codigo
        StringBuilder codeBuild = new StringBuilder(code);
        
        int start = codeBuild.indexOf("class");
        int finish = start;
        
        while( codeBuild.charAt(finish) != '{'){ finish++; };
        codeBuild.delete(start, finish + 1);
        codeBuild.deleteCharAt(codeBuild.length() - 1);
        
        code = codeBuild.toString();
        
        //Ruta do script eval-tool e arquivo codigo
        String path = "/home/xurxo/Documentos/TFG/probas/";
        String command = path + "eval-tool " + path + "code.scala --local";
        File codeFile = new File(path + "code.scala");
        
        //Escribese o codigo en arquivo
        FileWriter writer = new FileWriter(codeFile);
        writer.write(code);
        writer.close();
        
        //Executase
        Process p= Runtime.getRuntime().exec(command);

        System.out.println(code);
        return Response.ok().build();
    }
}
