import {Type, Property as Prop} from 'backendless-coderunner/lib/server-code/model/decorators'
import PersistenceItem from "./base";

@Type
export default class ShoppingItem extends PersistenceItem {
  @Prop()
  objectId: string
  @Prop()
  product: string
  @Prop()
  price: number
  @Prop()
  quantity: number
}