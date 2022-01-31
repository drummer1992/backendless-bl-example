import {Type, Property} from 'backendless-coderunner/lib/server-code/model/decorators'
import PersistenceItem from "./base";

@Type
export default class ShoppingItem extends PersistenceItem {
  @Property('String')
  objectId: string
  @Property('String')
  product: string
  @Property('Number')
  price: number
  @Property('Number')
  quantity: number
}