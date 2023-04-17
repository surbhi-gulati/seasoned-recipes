import PostType, {FoodGroup} from "../../modules/postType";
const posts : Array<PostType> = [
  {
    "_id": 10,
    "recipeId": "643b7f955da0d4402e90938e",
    "userId": "1",
    "groupId": "643b65cbc011ab1c347eadd4",
    "text": "10/10 would make again!",
    "date": "6/25/2022",
    "likes": 13,
    "liked": true,
    "groupName": FoodGroup.vegan
  },
  {
    "_id": 20,
    "recipeId": "643b7f955da0d4402e90938e",
    "userId": "2",
    "groupId": "643b65cbc011ab1c347eadd4",
    "text": "10/10 would make again!",
    "date": "3/1/2021",
    "likes": 13,
    "liked": true,
    "groupName": FoodGroup.pastaLovers
  },
  {
    "_id": 30,
    "recipeId": "643b86bd9141fbe58bb9bf4e",
    "userId": "3",
    "groupId": "643b65cbc011ab1c347eadd4",
    "text": "10/10 would make again!",
    "date": "2/6/2023",
    "likes": 13,
    "liked": true,
    "groupName": FoodGroup.subleAsianEats
  },
]

export default posts;
