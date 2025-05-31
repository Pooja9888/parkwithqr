import DashBoard from "../screen/DashBoard"

const genericEnum = {
    login: 'Login',
    register: 'Register',
    dashboard: 'DashBoard',
    // dashboard: 'HomeScreen'

}
const genericMessage = {
    emailAddress: 'Please enter email address',
    validEmail: 'Please enter a valid email address',
    password: 'Please enter password',
    error: 'Something went wrong. Please try again.',
    lowBalance: 'Please recharge your wallet'
}
const statusCode = {
    success: 200,
    invalid: 400,
    tokenProvided: 501,
    accessDenied: 503
}
export { genericEnum, genericMessage, statusCode }