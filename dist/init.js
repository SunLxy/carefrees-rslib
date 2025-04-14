import * as __WEBPACK_EXTERNAL_MODULE_node_path_c5b9b54f__ from "node:path";
const initProcessConfig = ()=>{
    const isConfig = process.argv.find((item)=>item.includes('--config') || item.includes('-c'));
    if (!isConfig) process.argv.push('--config', __WEBPACK_EXTERNAL_MODULE_node_path_c5b9b54f__["default"].resolve("rslib.config.ts"));
    console.log(process.argv);
};
export { initProcessConfig };
