import * as __WEBPACK_EXTERNAL_MODULE_node_path_c5b9b54f__ from "node:path";
import * as __WEBPACK_EXTERNAL_MODULE_node_url_e96de089__ from "node:url";
const init_filename = (0, __WEBPACK_EXTERNAL_MODULE_node_url_e96de089__.fileURLToPath)(import.meta.url);
const init_dirname = __WEBPACK_EXTERNAL_MODULE_node_path_c5b9b54f__["default"].dirname(init_filename);
const initProcessConfig = ()=>{
    const isConfig = process.argv.find((item)=>item.includes('--config') || item.includes('-c'));
    if (!isConfig) process.argv.push('--config', __WEBPACK_EXTERNAL_MODULE_node_path_c5b9b54f__["default"].resolve(init_dirname, "rslib.config.js"));
};
export { initProcessConfig };
