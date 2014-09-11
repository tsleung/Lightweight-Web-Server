import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.util.log.Logger;

/**
 * Created by terra_000 on 9/6/2014.
 */
public class EmbeddedServer {

  private static final Logger LOG = Log.getLogger(EmbeddedServer.class);

  public static void main(String[] args) throws Exception {
    Server server = new Server(9080);

    ResourceHandler resource_handler = new ResourceHandler();
    resource_handler.setDirectoriesListed(true);
    resource_handler.setWelcomeFiles(new String[]{ "index.html" });

    resource_handler.setResourceBase("src/main/webapp");
    LOG.info("serving " + resource_handler.getBaseResource());

    HandlerList handlers = new HandlerList();
    handlers.setHandlers(new Handler[] { resource_handler, new DefaultHandler() });
    server.setHandler(handlers);

    server.start();
    server.join();

  }

}
