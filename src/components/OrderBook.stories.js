import { OrderBook } from './OrderBook'
import { mock } from './mock'

export default {
  title: 'View/OrderBook',
  component: OrderBook,
}

const Template = (args) => <OrderBook {...args} />

export const Primary = Template.bind({})
Primary.args = { data: mock.data }
