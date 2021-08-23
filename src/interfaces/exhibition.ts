import { ObjectId } from 'mongodb';
import { coordinate, exhibitionGeoType } from '../types';

export interface ObjectIdentity {
    name: string,
    description: string,
    images: string,
}
export interface ItemIdentity {
    name: string,
    description: string,
    images: string[],
    location: {
        type: exhibitionGeoType,
        coordinate: coordinate,
    }

    objects?: ObjectIdentity[]
}
export interface ExhibitionIdentity {
    createdUser: ObjectId,
    name: string,
    images: string[],
    location: {
        type: exhibitionGeoType,
        coordinate: coordinate,
    }

    items?: ItemIdentity[]
}