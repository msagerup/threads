// Date: 07/04/21
// Desc: Typescript types for the app

import { ObjectId } from 'mongoose';

export type userData = {
  _id?: ObjectId | string;
  id: string;
  objectId?: string;
  username?: string | null;
  name: string;
  bio: string;
  profile_photo: string;
  onboarded?: boolean;
  threads?: ObjectId[]
  image?: string;
};

export type userFormData = {
  name: string,
  username: string,
  bio: string,
  profile_photo: string,
}

export type Thread = {
  id : string,
  _id: ObjectId | string,
  community: ObjectId | string,
  text: string,
  author: Author,
  replies: Thread[],
  updatedAt: Date,
  createdAt: Date,
  parentId?: ObjectId | string,
}

export type Threads =  Thread[];

export type Author = {
  _id: ObjectId | string,
  id: string,
  bio: string,
  communities: ObjectId[] | string[],
  name: string,
  onboarded: boolean,
  profile_photo: string,
  username: string,
  threads: ObjectId[] | string[]
}