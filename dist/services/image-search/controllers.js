"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummeyRoute = exports.postImage = void 0;
const models_1 = require("../../models");
const token_1 = require("../../resources/token");
const exceptions_1 = require("../../exceptions");
const types_1 = require("../../types");
const postImage = async (req, res) => {
    const meta = req.body;
    const imgMeta = await token_1.veriToken(meta.imgToken);
    meta.location.coordinate = [
        meta.location.coordinate[1],
        meta.location.coordinate[0],
    ];
    // imageMetaModel.updateOne({ _id: imgMeta. }, { location: meta.location });
    // try {
    //   const exhibition = (
    //     await exhibitionModel.aggregate([
    //       {
    //         $geoNear: {
    //           spherical: true,
    //           maxDistance: 3000,
    //           near: {
    //             type: "Point",
    //             coordinates: [
    //               meta.location.coordinate[0],
    //               meta.location.coordinate[1],
    //             ],
    //           },
    //           distanceField: "distance",
    //           key: "location",
    //         },
    //       },
    //       {
    //         $limit: 1,
    //       },
    //     ])
    //   )[0];
    // } catch (e) {
    //   throw new HttpException(HttpStatus.BadRequest, "전시를 찾지 못했습니다.");
    // }
    try {
        const items = await models_1.itemModel.aggregate([
            {
                $geoNear: {
                    spherical: true,
                    maxDistance: 3000,
                    near: {
                        type: "Point",
                        coordinates: [
                            meta.location.coordinate[0],
                            meta.location.coordinate[1],
                        ],
                    },
                    distanceField: "distance",
                    key: "location",
                },
            },
            {
                $limit: 3,
            },
        ]);
    }
    catch (e) {
        throw new exceptions_1.HttpException(types_1.HttpStatus.BadRequest, "아이템을 찾지 못했습니다.");
    }
};
exports.postImage = postImage;
const dummeyRoute = (req, res) => {
    res.sendStatus(404);
};
exports.dummeyRoute = dummeyRoute;
//# sourceMappingURL=controllers.js.map