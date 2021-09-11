"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const checkPermissions = (service, route) => async (req, res, next) => {
    if (!route.needAuth)
        return next(); // 인증이 필요없는 라우트일 경우 프리패스
    const userToken = req.token;
    // 인증이 필요한 라우트에 접근하는데 토큰이 없는 경우
    if (!userToken) {
        throw new exceptions_1.HttpException(401, "액세스 토큰이 Authorization 헤더에 Bearer Token Type으로 전송되어야 합니다.");
    }
    // 관리자 권한이 필요한 라우트에 접근하는데 권한이 없는 경우
    if (req.user?.userType !== "Manager" && route.needPermission) {
        throw new exceptions_1.HttpException(403, "해당 라우트에 접근하기 위해 필요한 권한이 없습니다.");
    }
    // 모든 검사 통과
    return next();
};
exports.default = checkPermissions;
//# sourceMappingURL=check-permissions.js.map