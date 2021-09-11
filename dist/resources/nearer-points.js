"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.default = async (model, coordinate, limit, maxDis) => {
    const documents = await models_1.itemModel.aggregate([
        {
            $geoNear: {
                spherical: true,
                maxDistance: 3000,
                near: {
                    type: "Point",
                    coordinates: [coordinate[1], coordinate[0]],
                },
                distanceField: "distance",
                key: "location",
            },
        },
        {
            $limit: 1,
        },
    ]);
    return documents;
};
//# sourceMappingURL=nearer-points.js.map