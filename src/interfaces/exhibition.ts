import { ObjectId } from 'mongodb';
import { coordinate, exhibitionGeoType } from '../types';

export interface Object {
    name: string,
    description: string,
    images: string,
}
export interface Item {
    name: string,
    description: string,
    images: string[],
    location: {
        type: exhibitionGeoType,
        coordinate: coordinate,
    }

    objects?: Object[]
}
export interface Exhibition {
    createdUser: ObjectId,
    name: string,
    images: string[],
    location: {
        type: exhibitionGeoType,
        coordinate: coordinate,
    }

    items?: Item[]
}