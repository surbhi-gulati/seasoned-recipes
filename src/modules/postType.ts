import UserType from "./userType";

export default interface PostType {
  _id: number,
  recipe_id: number,
  user_id: number,
  caption: string,
  likes: number,
  liked: boolean
}