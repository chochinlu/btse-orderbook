import {Menu} from './Menu'

export default {
  title: 'View/Menu',
  component: Menu
}

const Template = args => <Menu {...args} />
export const Primary = Template.bind({})