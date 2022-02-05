import 'reflect-metadata'
import {
  Get,
  Post,
  Service,
  Type,
  Param as Param,
  Property as Prop,
} from 'backendless-coderunner/lib/server-code/model/decorators'
import Order from "../models/order";
import ShoppingItem from "../models/item";

@Type
class Pet {
  @Prop()
  name: string
}

@Type
class CredentialsDto {
  @Prop()
  email: string
  @Prop()
  password: string
  @Prop([Pet])
  pets: Pet[]
}

@Type
class HobbyDto {
  @Prop()
  name: string
  @Prop()
  isFavorite: boolean
}

@Type
class UserDto {
  @Prop()
  name: string
  @Prop()
  age: number
  @Prop()
  credentials: CredentialsDto
  @Prop([HobbyDto])
  hobbies: HobbyDto[]
}

@Service
export default class OrderService {
  @Post('/orders')
  @Param(String, 'name')
  createOrder(name: string) {
    const order = new Order()

    order.name = name

    // @ts-ignore
    return order.save()
  }

  @Post('/orders/find')
  @Param(String, 'name')
  findOrderByName(name: string) {
    return Order.findByName(name)
  }

  @Get('/orders')
  getOrders() {
    // @ts-ignore
    return Order.find('1=1')
  }

  @Post('/orders/{orderId}/items')
  @Param([ShoppingItem], 'items')
  async addItems(items: ShoppingItem[]) {
    // @ts-ignore
    const order = await Order.findById(this.request.pathParams.orderId, ['items'], ['objectId'])
    // @ts-ignore
    order.items = await Promise.all(items.map(item => item.save()))

    await order.saveWithRelations({stale: ['items']})

    return order
  }

  @Post('/orders/{orderId}')
  @Param(UserDto, 'user')
  @Param(Number, 'amount')
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