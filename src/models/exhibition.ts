import {
    createSchema, ExtractDoc, Type, typedModel,
  } from 'ts-mongoose';
import { ObjectId } from 'mongodb';
import { userSchema } from './user';
import { coordinate, exhibitionGeoType, exhibitionGeoTypeValues } from '../types';
import { geoTest } from '../services/trainDataSet/controllers';

const objectSchema = createSchema({

}, { timestamps: true });

const itemSchema = createSchema({

}, { timestamps: true });

const exhibitionSchema = createSchema({
    createdUser: Type.ref(Type.objectId()).to('User', userSchema),
    description: Type.string({ required: true }),
    Items: Type.schema().of(itemSchema),
    location: {
        coordinates: Type.array({ required: true }).of(
            Type.number({
                index: { type: '2dsphere', sparse: false }
            })
        ),
        type: Type.string({ enum: exhibitionGeoTypeValues, required: true }),
    }
});
const exhibitionModel = typedModel('Exhibition', exhibitionSchema, undefined, undefined, {
    async findNearestExhibition(coordinates: coordinate) {
        return (await this.aggregate([{
            $geoNear: {
                spherical: true,
                maxDistance: 3000,
                mear: {
                    type: 'Point',
                    coordinates: coordinates
                },
                distanceField: 'distance',
                key: 'location'
            }
        }, {
            $limit: 1
        }]))[0];
    },
    async registerExhibition(user: ObjectId, description: string, geoType: exhibitionGeoType, location: coordinate) {
        new this({
            createdUser: user,
            description: description,
            location: {
                type: geoType,
                coordinate: location
            }
        })
    }
})

export { exhibitionSchema, exhibitionModel };