"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (joiScheme) => async (req, res, next) => {
    try {
        await joiScheme.validateAsync(req.body);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
        return;
    }
    next();
};
//# sourceMappingURL=validator.js.map