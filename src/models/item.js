import { Type, Property } from 'backendless-coderunner/lib/server-code/model/decorators'
import PersistenceItem from "./base";

@Type
class ShoppingItem extends PersistenceItem {
  @Property('String')
  objectId
  @Property('String')
  product
  @Property('Number')
  price
  @Property('Number')
  quantity
}

module.exports = ShoppingItem