import {InfoPopup} from "./InfoPopup";

export default {
    title: 'View/InfoPopup',
    component: InfoPopup
}

const Template = args => <InfoPopup {...args} />
export const Primary = Template.bind({})
Primary.args = { ave: 100, total: 2000, currency: 'BTC' }
