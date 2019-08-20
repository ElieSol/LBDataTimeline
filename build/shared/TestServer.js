"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const core_1 = require("@overnightjs/core");
class TestServer extends core_1.Server {
    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setController(ctlr) {
        super.addControllers(ctlr);
    }
    getExpressInstance() {
        return this.app;
    }
}
exports.default = TestServer;
