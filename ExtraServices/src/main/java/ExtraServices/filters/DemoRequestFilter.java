package ExtraServices.filters;

import java.io.IOException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

@Provider
public class DemoRequestFilter implements ContainerRequestFilter, ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext crc) throws IOException {
       if (crc.getUriInfo().getRequestUri().toString().toLowerCase().contains("/40")) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
       }       
    }

    @Override
    public void filter(ContainerRequestContext crc, ContainerResponseContext crc1) throws IOException {
         
        MultivaluedMap<String,Object> headers = crc1.getHeaders();
        
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
    }
}
