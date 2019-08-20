"use strict";
var SimpleController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const http_status_codes_1 = require("http-status-codes");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
let SimpleController = SimpleController_1 = class SimpleController {
    sayHello(req, res) {
        try {
            const { name } = req.params;
            if (name === 'make_it_fail') {
                throw Error('User triggered failure');
            }
            logger_1.Logger.Info(SimpleController_1.SUCCESS_MSG + name);
            return res.status(http_status_codes_1.OK).json({
                message: SimpleController_1.SUCCESS_MSG + name,
            });
        }
        catch (err) {
            logger_1.Logger.Err(err, true);
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
};
SimpleController.SUCCESS_MSG = 'hello ';
tslib_1.__decorate([
    core_1.Get(':name'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SimpleController.prototype, "sayHello", null);
SimpleController = SimpleController_1 = tslib_1.__decorate([
    core_1.Controller('api/say-hello')
], SimpleController);
exports.default = SimpleController;
