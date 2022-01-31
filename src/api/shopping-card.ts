import { Get, Post, Service, Param, Property, Type } from 'backendless-coderunner/lib/server-code/model/decorators'
import Order from "../models/order";
import ShoppingItem from "../models/item";

@Type
class CredentialsDto {
  @Property('String')
  email: string
  @Property('String')
  password: string
}

@Type
class HobbyDto {
  @Property('String')
  name: string
  @Property('Boolean')
  isFavorite: boolean
}

@Type
class UserDto {
  @Property('String')
  name: string
  @Property('Number')
  age: string
  @Property('CredentialsDto')
  credentials: CredentialsDto
  @Property('Array.<HobbyDto>')
  hobbies: HobbyDto[]
}

@Service
export default class OrderService {
  @Post('/orders')
  @Param('String', 'name')
  createOrder(name: string) {
    const order = new Order()

    order.name = name

    // @ts-ignore
    return order.save()
  }

  @Post('/orders/find')
  @Param('String', 'name')
  findOrderByName(name: string) {
    return Order.findByName(name)
  }

  @Get('/orders')
  getOrders() {
    // @ts-ignore
    return Order.find('1=1')
  }

  @Post('/orders/{orderId}/items')
  @Param('Array.<ShoppingItem>', 'items')
  async addItems(items: ShoppingItem[]) {
    // @ts-ignore
    const order = await Order.findById(this.request.pathParams.orderId, ['items'], ['objectId'])
    // @ts-ignore
    order.items = await Promise.all(items.map(item => item.save()))

    await order.saveWithRelations({ stale: ['items'] })

    return order
  }

  @Post('/orders/{orderId}')
  @Param('UserDto', 'user')
  @Param('Number', 'amount')
  async purchase(user: UserDto, amount: number) {
    // @ts-ignore
    const order = await Order.findById(this.request.pathParams.orderId) as Order

    if (amount > 0) {
      order.paid = true
    } else {
      throw new Error('invalid amount')
    }
    // @ts-ignore
    return order.save()
  }
}