import { Type, Property } from 'backendless-coderunner/lib/server-code/model/decorators'
import PersistenceItem from "./base";

@Type
export default class Order extends PersistenceItem {
  @Property('String')
  objectId
  @Property('String')
  name
  @Property('Boolean')
  paid
  @Property('ShoppingItem[]')
  items

  static async findByName(name) {
    // @ts-ignore
    const order = await this.find({ where: `name='${name}'`, relations: ['items'] }).then(res => res[0])

    if (!order) {
      throw new Error(`Order with name '${name}' does not exist`)
    }

    return order
  }
}