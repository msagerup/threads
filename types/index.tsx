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
