"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../resources/logger");
const recombineCoord = (req, res, next) => {
    if (!req.body.location) {
        //body.location이 없을 경우 Bypass
        return next();
    }
    if (!(req.body.location.type == "Point")) {
        //body.location의 type이 Poligon일 경우 좌표 swap 후 옮김
        const coordinates = req.body.location.coordinate;
        for (let i = 0; i < coordinates.length; i++) {
            coordinates[i] = [coordinates[i][1], coordinates[i][0]];
        }
        const geojson = {
            location: {
                type: "Polygon",
                coordinate: coordinates,
            },
        };
        req.geoJSON = geojson;
        return next();
    }
    //body.location의 type이 Point이면 좌표 swap
    const geojson = {
        location: {
            type: "Point",
            coordinate: [
                req.body.location?.coordinate[1],
                req.body.location?.coordinate[0],
            ],
        },
        maxDistance: req.body.location.maxDistance
            ? req.body.location.maxDistance
            : 500,
    };
    req.geoJSON = geojson;
    logger_1.logger.info(req.geoJSON);
    return next();
};
exports.default = recombineCoord;
//# sourceMappingURL=recombine-coord.js.map