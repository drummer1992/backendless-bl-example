import { Get, Post, Service, Param, Property, Type } from 'backendless-coderunner/lib/server-code/model/decorators'
import Order from "../models/order";

@Type
class CredentialsDto {
  @Property('String')
  email
  @Property('String')
  password
}

@Type
class HobbyDto {
  @Property('String')
  name
  @Property('Boolean')
  isFavorite
}

@Type
class UserDto {
  @Property('String')
  name
  @Property('Number')
  age
  @Property('CredentialsDto')
  credentials
  @Property('Array.<HobbyDto>')
  hobbies
}

@Service
export default class OrderService {
  @Post('/orders')
  @Param('String', 'name')
  createOrder(name) {
    const order = new Order()

    order.name = name

    // @ts-ignore
    return order.save()
  }

  @Post('/orders/find')
  @Param('String', 'name')
  findOrderByName(name) {
    return Order.findByName(name)
  }

  @Get('/orders')
  getOrders() {
    // @ts-ignore
    return Order.find('1=1')
  }

  @Post('/orders/{orderId}/items')
  @Param('Array.<ShoppingItem>', 'items')
  async addItems(items) {
    // @ts-ignore
    const order = await Order.findById(this.request.pathParams.orderId, ['items'], ['objectId'])

    order.items = await Promise.all(items.map(item => item.save()))

    await order.saveWithRelations({ stale: ['items'] })

    return order
  }

  @Post('/orders/{orderId}')
  @Param('UserDto', 'user')
  @Param('Number', 'amount')
  async purchase(user, amount) {
    // @ts-ignore
    const order = await Order.findById(this.request.pathParams.orderId)

    if (amount > 0) {
      order.paid = true
    } else {
      throw new Error('invalid amount')
    }

    return order.save()
  }
}