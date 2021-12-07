//#conditional

//#if DEVELOPMENT
import "./service-worker.debug";
//#else
import "./service-worker.production"
//#endif