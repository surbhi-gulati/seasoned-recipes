import PostType, {FoodGroup} from "../../modules/postType";

const posts : Array<PostType> = [
  {
    "_id": 10,
    "recipe_id": 715467,
    "user_id": 1,
    "caption": "10/10 would make again!",
    "date": "6/25/2022",
    "likes": 13,
    "liked": true,
    "postedIn": FoodGroup.vegan
  },
  {
    "_id": 20,
    "recipe_id": 664058,
    "user_id": 2,
    "caption": "10/10 would make again!",
    "date": "3/1/2021",
    "likes": 13,
    "liked": true,
    "postedIn": FoodGroup.pastaLovers
  },
  {
    "_id": 30,
    "recipe_id": 641901,
    "user_id": 3,
    "caption": "10/10 would make again!",
    "date": "2/6/2023",
    "likes": 13,
    "liked": true,
    "postedIn": FoodGroup.subleAsianEats
  },
]

export default posts;
