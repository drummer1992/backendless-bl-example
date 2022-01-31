import { Type, Property } from 'backendless-coderunner/lib/server-code/model/decorators'
import PersistenceItem from "./base";
import ShoppingItem from "./item";

@Type
export default class Order extends PersistenceItem {
  @Property('String')
  objectId: string
  @Property('String')
  name: string
  @Property('Boolean')
  paid: boolean
  @Property('ShoppingItem[]')
  items: ShoppingItem[]

  static async findByName(name: string) {
    // @ts-ignore
    const order = await this.find({ where: `name='${name}'`, relations: ['items'] }).then(res => res[0])

    if (!order) {
      throw new Error(`Order with name '${name}' does not exist`)
    }

    return order
  }
}