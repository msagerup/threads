// Date: 07/04/21
// Desc: Typescript types for the app

import { ObjectId } from 'mongoose';

export type userData = {
  _id: ObjectId | string;
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  profile_photo: string;
  onboarded?: boolean;
};

export type userFormData = {
  name: string,
  username: string,
  bio: string,
  profile_photo: string,
}

export type Thread = {
  _id: ObjectId | string,
  text: string,
  author: Author,
  replies: ObjectId[] | string[],
  updatedAt: Date,
  createdAt: Date,
}

export type Threads = {
  threads: Thread[],
}

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